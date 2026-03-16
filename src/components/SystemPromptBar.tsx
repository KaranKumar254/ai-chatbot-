import { useState } from 'react'
import { PRESET_PROMPTS } from '../constants/prompts'

interface Props { value: string; onChange: (v: string) => void }

export default function SystemPromptBar({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      padding: '8px 28px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      display: 'flex', alignItems: 'center', gap: '10px',
    }}>
      <span style={{
        fontSize: '11px', color: 'var(--muted)',
        textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap',
      }}>Persona:</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Set a system prompt..."
        style={{
          flex: 1, background: 'transparent', border: 'none',
          color: 'var(--text)', fontSize: '13px', outline: 'none',
          minWidth: 0,
        }}
      />
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            padding: '4px 10px', borderRadius: '8px',
            background: 'var(--surface2)', border: '1px solid var(--border)',
            color: 'var(--muted)', fontSize: '12px',
          }}
        >Presets ▾</button>
        {open && (
          <div style={{
            position: 'absolute', right: 0, top: '110%', zIndex: 10,
            background: '#1a1a26', border: '1px solid var(--border)',
            borderRadius: '12px', overflow: 'hidden', minWidth: '200px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            {PRESET_PROMPTS.map(p => (
              <button
                key={p.label}
                onClick={() => { onChange(p.value); setOpen(false) }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '10px 16px', background: 'none', border: 'none',
                  color: 'var(--text)', fontSize: '13px', cursor: 'pointer',
                  borderBottom: '1px solid var(--border)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >{p.label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
