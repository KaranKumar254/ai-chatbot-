import { useEffect, useRef } from 'react'
import { Message } from '../types/chat'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

interface Props { messages: Message[]; isLoading: boolean }

export default function MessageList({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isLoading])

  return (
    <div style={{
      flex: 1, overflowY: 'auto',
      padding: '32px 28px',
      display: 'flex', flexDirection: 'column', gap: '20px',
    }}>
      {messages.length === 0 && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '16px', paddingTop: '80px',
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(124,106,247,0.2), rgba(167,139,250,0.15))',
            border: '1px solid rgba(124,106,247,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px',
          }}>✦</div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>How can I help you?</p>
            <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Start typing below to begin a conversation</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
            {['Explain a concept', 'Write some code', 'Brainstorm ideas', 'Summarize text'].map(s => (
              <div key={s} style={{
                padding: '8px 16px', borderRadius: '20px',
                background: 'var(--surface2)', border: '1px solid var(--border)',
                fontSize: '13px', color: 'var(--muted)',
              }}>{s}</div>
            ))}
          </div>
        </div>
      )}
      {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
