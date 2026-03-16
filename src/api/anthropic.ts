import { Message } from '../types/chat'

declare const puter: any

async function ensurePuterAuth(): Promise<void> {
  try {
    const isSignedIn = await puter.auth.isSignedIn()
    if (!isSignedIn) {
      await puter.auth.signIn()
    }
  } catch (err) {
    console.warn('Puter auth check failed:', err)
  }
}

export async function sendMessage(
  messages: Message[],
  systemPrompt: string,
  model: string = 'gpt-4o-mini'
): Promise<string> {

  if (typeof puter === 'undefined') {
    throw new Error('Puter.js not loaded. Please refresh the page.')
  }

  await ensurePuterAuth()

  const formatted = [
    { role: 'system', content: systemPrompt },
    ...messages.map(({ role, content }) => ({ role, content }))
  ]

  let response: any
  try {
    response = await puter.ai.chat(formatted, { model })
  } catch (err: any) {
    console.error('Puter raw error:', err)
    if (err?.code === 'EPERM' || err?.message?.includes('auth') || err?.message?.includes('permission')) {
      await puter.auth.signIn()
      response = await puter.ai.chat(formatted, { model })
    } else {
      throw new Error(err?.message || JSON.stringify(err) || 'Puter.js call failed')
    }
  }

  if (typeof response === 'string') return response
  if (response?.choices?.[0]?.message?.content) return response.choices[0].message.content
  if (response?.message?.content?.[0]?.text) return response.message.content[0].text
  if (typeof response?.message?.content === 'string') return response.message.content
  if (response?.text) return response.text
  if (response?.content) return response.content

  throw new Error('Could not parse response: ' + JSON.stringify(response))
}