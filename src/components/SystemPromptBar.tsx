import { useState } from 'react'
import { PRESET_PROMPTS } from '../constants/prompts'

interface Props { value: string; onChange: (v: string) => void }

export default function SystemPromptBar({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ padding:'8px 16px', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'#16161e', display:'flex', alignItems:'center', gap:'8px', position:'relative', flexShrink:0 }}>
      <span style={{ fontSize:'11px', color:'#6b6b80', textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap' }}>Persona:</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="Set a system prompt..."
        style={{ flex:1, background:'transparent', border:'none', color:'#e8e8f0', fontSize:'13px', outline:'none', minWidth:0, fontFamily:'system-ui' }} />
      <div style={{ position:'relative', flexShrink:0 }}>
        <button onClick={() => setOpen(o => !o)}
          style={{ padding:'4px 10px', borderRadius:'8px', background:'#1e1e2a', border:'1px solid rgba(255,255,255,0.07)', color:'#6b6b80', fontSize:'12px', cursor:'pointer', whiteSpace:'nowrap' }}>
          Presets ▾
        </button>
        {open && (
          <div style={{ position:'absolute', right:0, top:'110%', zIndex:100, background:'#1a1a26', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', overflow:'hidden', minWidth:'180px', boxShadow:'0 8px 32px rgba(0,0,0,0.7)' }}>
            {PRESET_PROMPTS.map(p => (
              <button key={p.label} onClick={() => { onChange(p.value); setOpen(false) }}
                style={{ display:'block', width:'100%', textAlign:'left', padding:'10px 14px', background:'none', border:'none', borderBottom:'1px solid rgba(255,255,255,0.05)', color:'#e8e8f0', fontSize:'13px', cursor:'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background='#1e1e2a')}
                onMouseLeave={e => (e.currentTarget.style.background='none')}
              >{p.label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
