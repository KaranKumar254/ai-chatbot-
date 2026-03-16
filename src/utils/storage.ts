import { Message } from '../types/chat'

const KEY = 'ai_chatbot_messages'

export function saveConversation(messages: Message[]): void {
  try { localStorage.setItem(KEY, JSON.stringify(messages)) } catch {}
}

export function loadConversation(): Message[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw).map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) }))
  } catch { return [] }
}

export function clearConversation(): void {
  localStorage.removeItem(KEY)
}
