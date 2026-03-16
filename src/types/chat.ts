export type Role = 'user' | 'assistant'

export interface Message {
  id: string
  role: Role
  content: string
  timestamp: Date
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  systemPrompt: string
  createdAt: Date
}
