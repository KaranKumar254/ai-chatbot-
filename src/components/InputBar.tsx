import { useState, useRef, KeyboardEvent } from 'react'

interface Props { onSend: (text: string) => void; disabled: boolean }

export default function InputBar({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!value.trim() || disabled) return
    onSend(value)
    setValue('')
    if (ref.current) { ref.current.style.height = 'auto' }
  }

  return (
    <div style={{ padding: '16px 28px 24px' }}>
      <div style={{
        display: 'flex', gap: '12px', alignItems: 'flex-end',
        background: 'var(--surface2)',
        borderRadius: '16px',
        padding: '12px 16px',
        border: focused ? '1px solid rgba(124,106,247,0.5)' : '1px solid var(--border)',
        boxShadow: focused ? '0 0 0 3px rgba(124,106,247,0.1)' : 'none',
        transition: 'border 0.2s, box-shadow 0.2s',
      }}>
        <textarea
          ref={ref}
          value={value}
          onChange={e => {
            setValue(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px'
          }}
          onKeyDown={(e: KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Message AI Assistant… (Enter to send, Shift+Enter for newline)"
          rows={1}
          disabled={disabled}
          style={{
            flex: 1, background: 'transparent', border: 'none',
            color: 'var(--text)', fontSize: '14px',
            resize: 'none', outline: 'none',
            minHeight: '24px', maxHeight: '140px',
            lineHeight: '1.6', padding: '2px 0',
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          style={{
            width: '36px', height: '36px', borderRadius: '10px', border: 'none',
            background: disabled || !value.trim()
              ? 'rgba(124,106,247,0.2)'
              : 'linear-gradient(135deg, #7c6af7, #a78bfa)',
            color: disabled || !value.trim() ? 'var(--muted)' : '#fff',
            fontSize: '16px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
            boxShadow: disabled || !value.trim() ? 'none' : '0 4px 12px rgba(124,106,247,0.4)',
          }}
        >➤</button>
      </div>
      <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', marginTop: '10px' }}>
        AI can make mistakes. Verify important information.
      </p>
    </div>
  )
}
