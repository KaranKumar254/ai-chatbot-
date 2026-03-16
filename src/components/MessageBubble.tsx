import { Message } from '../types/chat'
import { formatTime } from '../utils/formatTime'
import { simpleMarkdown } from '../utils/markdown'

interface Props { message: Message }

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
    }}>
      {/* Avatar */}
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
        background: isUser
          ? 'linear-gradient(135deg, #7c6af7, #a78bfa)'
          : 'linear-gradient(135deg, #2a2a3e, #1e1e2a)',
        border: isUser ? 'none' : '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '14px', fontWeight: 600, color: '#fff',
      }}>
        {isUser ? 'U' : '✦'}
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '70%', gap: '4px',
      }}>
        <div style={{
          padding: '12px 18px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          fontSize: '14px', lineHeight: 1.7, wordBreak: 'break-word',
          background: isUser ? 'var(--user-bubble)' : 'var(--ai-bubble)',
          border: isUser ? 'none' : '1px solid var(--border)',
          color: '#fff',
          boxShadow: isUser ? '0 4px 20px rgba(124,106,247,0.25)' : 'none',
        }}
          dangerouslySetInnerHTML={{ __html: simpleMarkdown(message.content) }}
        />
        <span style={{ fontSize: '11px', color: 'var(--muted)', paddingInline: '4px' }}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
