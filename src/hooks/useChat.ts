import { useState, useCallback } from 'react'
import { Message } from '../types/chat'
import { sendMessage } from '../api/anthropic'
import { DEFAULT_SYSTEM_PROMPT } from '../constants/prompts'
import { DEFAULT_MODEL } from '../constants/models'
import { saveConversation, loadConversation } from '../utils/storage'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(loadConversation())
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT)
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return
    setError(null)

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    const updated = [...messages, userMsg]
    setMessages(updated)
    setIsLoading(true)

    try {
      const reply = await sendMessage(updated, systemPrompt, selectedModel)
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      }
      const final = [...updated, assistantMsg]
      setMessages(final)
      saveConversation(final)
    } catch (err: any) {
      // Show real error — not just "Something went wrong"
      const msg = err?.message || err?.toString() || 'Unknown error'
      console.error('Chat error:', err)
      setError(msg)
      setMessages(updated) // keep user message visible
    } finally {
      setIsLoading(false)
    }
  }, [messages, systemPrompt, selectedModel, isLoading])

  const clear = useCallback(() => {
    setMessages([])
    saveConversation([])
    setError(null)
  }, [])

  return { messages, isLoading, error, systemPrompt, setSystemPrompt, selectedModel, setSelectedModel, send, clear }
}
