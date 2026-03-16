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
    if (ref.current) ref.current.style.height = 'auto'
  }

  return (
    <div style={{ padding:'12px 12px 16px', flexShrink:0 }}>
      <div style={{ display:'flex', gap:'10px', alignItems:'flex-end', background:'#1e1e2a', borderRadius:'16px', padding:'10px 14px', border: focused ? '1px solid rgba(124,106,247,0.5)' : '1px solid rgba(255,255,255,0.07)', boxShadow: focused ? '0 0 0 3px rgba(124,106,247,0.1)' : 'none', transition:'border 0.2s, box-shadow 0.2s' }}>
        <textarea
          ref={ref}
          value={value}
          onChange={e => { setValue(e.target.value); e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,120)+'px' }}
          onKeyDown={(e: KeyboardEvent) => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Message… (Enter to send)"
          rows={1}
          disabled={disabled}
          style={{ flex:1, background:'transparent', border:'none', color:'#e8e8f0', fontSize:'14px', resize:'none', outline:'none', minHeight:'24px', maxHeight:'120px', lineHeight:'1.6', padding:'2px 0', fontFamily:'system-ui' }}
        />
        <button onClick={handleSend} disabled={disabled || !value.trim()}
          style={{ width:'36px', height:'36px', borderRadius:'10px', border:'none', background: disabled || !value.trim() ? 'rgba(124,106,247,0.2)' : 'linear-gradient(135deg,#7c6af7,#a78bfa)', color: disabled || !value.trim() ? '#6b6b80' : '#fff', fontSize:'15px', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', boxShadow: disabled || !value.trim() ? 'none' : '0 4px 12px rgba(124,106,247,0.4)', cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer' }}>➤</button>
      </div>
      <p style={{ textAlign:'center', fontSize:'11px', color:'#6b6b80', marginTop:'8px' }}>
        AI can make mistakes. Verify important info.
      </p>
    </div>
  )
}
