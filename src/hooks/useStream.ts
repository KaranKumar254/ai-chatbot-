import { useState, useCallback } from 'react'
import { Message } from '../types/chat'
import { DEFAULT_MODEL, MAX_TOKENS } from '../constants/models'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

export function useStream() {
  const [streamedText, setStreamedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const stream = useCallback(async (
    messages: Message[],
    systemPrompt: string,
    onDone: (text: string) => void
  ) => {
    setIsStreaming(true)
    setStreamedText('')
    let full = ''

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          max_tokens: MAX_TOKENS,
          stream: true,
          system: systemPrompt,
          messages: messages.map(({ role, content }) => ({ role, content })),
        }),
      })

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
        for (const line of lines) {
          try {
            const json = JSON.parse(line.slice(6))
            if (json.type === 'content_block_delta') {
              full += json.delta.text ?? ''
              setStreamedText(full)
            }
          } catch {}
        }
      }
      onDone(full)
    } finally {
      setIsStreaming(false)
    }
  }, [])

  return { streamedText, isStreaming, stream }
}
