import { useChat } from '../hooks/useChat'
import MessageList from './MessageList'
import InputBar from './InputBar'
import SystemPromptBar from './SystemPromptBar'
import { MODELS } from '../constants/models'

export default function ChatWindow() {
  const { messages, isLoading, error, systemPrompt, setSystemPrompt, selectedModel, setSelectedModel, send, clear } = useChat()

  return (
    <div style={{ display:'flex', height:'100vh', width:'100vw', background:'var(--bg)', overflow:'hidden' }}>

      {/* Sidebar */}
      <aside style={{
        width:'260px', flexShrink:0,
        background:'var(--surface)', borderRight:'1px solid var(--border)',
        display:'flex', flexDirection:'column', padding:'24px 16px', gap:'8px',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'24px', paddingLeft:'4px' }}>
          <div style={{
            width:'32px', height:'32px', borderRadius:'10px',
            background:'linear-gradient(135deg, #7c6af7, #a78bfa)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px',
          }}>✦</div>
          <span style={{ fontWeight:600, fontSize:'16px' }}>AI Chat</span>
        </div>

        <button onClick={clear} style={{
          display:'flex', alignItems:'center', gap:'10px',
          padding:'10px 12px', borderRadius:'10px',
          background:'linear-gradient(135deg, rgba(124,106,247,0.2), rgba(167,139,250,0.15))',
          border:'1px solid rgba(124,106,247,0.3)',
          color:'var(--accent2)', fontSize:'14px', fontWeight:500,
        }}>
          <span style={{ fontSize:'16px' }}>＋</span> New Chat
        </button>

        {/* Model selector */}
        <div style={{ marginTop:'16px' }}>
          <p style={{ fontSize:'11px', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px', paddingLeft:'4px' }}>Model</p>
          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            style={{
              width:'100%', padding:'9px 12px', borderRadius:'10px',
              background:'var(--surface2)', border:'1px solid var(--border)',
              color:'var(--text)', fontSize:'12px', outline:'none', cursor:'pointer',
            }}
          >
            {MODELS.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <p style={{ fontSize:'11px', color:'var(--muted)', marginTop:'6px', paddingLeft:'2px', lineHeight:1.5 }}>
            ✅ All free via Puter.js — no API key needed
          </p>
        </div>

        <div style={{ marginTop:'16px', borderTop:'1px solid var(--border)', paddingTop:'16px' }}>
          <p style={{ fontSize:'11px', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px', paddingLeft:'4px' }}>Recent</p>
          {messages.length > 0 ? (
            <div style={{
              padding:'10px 12px', borderRadius:'10px',
              background:'var(--surface2)', border:'1px solid var(--border)',
              fontSize:'13px', color:'var(--text)',
              overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
            }}>
              {messages[0]?.content?.slice(0, 32) + '…'}
            </div>
          ) : (
            <p style={{ fontSize:'13px', color:'var(--muted)', paddingLeft:'4px' }}>No chats yet</p>
          )}
        </div>

        <div style={{ marginTop:'auto', borderTop:'1px solid var(--border)', paddingTop:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 4px' }}>
            <div style={{
              width:'28px', height:'28px', borderRadius:'50%',
              background:'linear-gradient(135deg, #7c6af7, #a78bfa)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'12px', fontWeight:600,
            }}>U</div>
            <div>
              <p style={{ fontSize:'13px', fontWeight:500 }}>You</p>
              <p style={{ fontSize:'11px', color:'var(--muted)' }}>Free via Puter</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        <header style={{
          padding:'16px 28px', borderBottom:'1px solid var(--border)',
          display:'flex', alignItems:'center', gap:'12px',
          background:'var(--surface)',
        }}>
          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 6px #22c55e' }} />
          <span style={{ fontSize:'15px', fontWeight:600 }}>General Assistant</span>
          <span style={{
            marginLeft:'auto', fontSize:'11px', color:'var(--muted)',
            background:'var(--surface2)', padding:'3px 10px',
            borderRadius:'20px', border:'1px solid var(--border)',
          }}>
            {MODELS.find(m => m.value === selectedModel)?.label ?? selectedModel}
          </span>
        </header>

        <SystemPromptBar value={systemPrompt} onChange={setSystemPrompt} />
        <MessageList messages={messages} isLoading={isLoading} />

        {error && (
          <div style={{
            margin:'0 28px 8px', padding:'10px 16px',
            background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)',
            borderRadius:'10px', color:'var(--danger)', fontSize:'13px',
          }}>⚠ {error}</div>
        )}

        <InputBar onSend={send} disabled={isLoading} />
      </main>
    </div>
  )
}
