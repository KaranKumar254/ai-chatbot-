import { useState } from 'react'
import { useChat } from '../hooks/useChat'
import MessageList from './MessageList'
import InputBar from './InputBar'
import SystemPromptBar from './SystemPromptBar'
import { MODELS } from '../constants/models'

export default function ChatWindow() {

  const { messages, isLoading, error, systemPrompt, setSystemPrompt, selectedModel, setSelectedModel, send, clear } = useChat()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isMobile = window.innerWidth < 768

  return (
    <div style={{
      display:'flex',
      height:'100vh',
      width:'100%',
      background:'var(--bg)',
      overflow:'hidden'
    }}>

      {/* Sidebar */}
      <aside style={{
        width:'260px',
        flexShrink:0,
        background:'var(--surface)',
        borderRight:'1px solid var(--border)',
        display: isMobile ? (sidebarOpen ? 'flex':'none') : 'flex',
        flexDirection:'column',
        padding:'24px 16px',
        gap:'8px',
        position:isMobile ? 'absolute':'relative',
        zIndex:10,
        height:'100vh'
      }}>

        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'24px', paddingLeft:'4px' }}>
          <div style={{
            width:'32px',
            height:'32px',
            borderRadius:'10px',
            background:'linear-gradient(135deg, #7c6af7, #a78bfa)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            fontSize:'16px'
          }}>✦</div>
          <span style={{ fontWeight:600, fontSize:'16px' }}>AI Chat</span>
        </div>

        <button onClick={clear} style={{
          display:'flex',
          alignItems:'center',
          gap:'10px',
          padding:'10px 12px',
          borderRadius:'10px',
          background:'linear-gradient(135deg, rgba(124,106,247,0.2), rgba(167,139,250,0.15))',
          border:'1px solid rgba(124,106,247,0.3)',
          color:'var(--accent2)',
          fontSize:'14px',
          fontWeight:500
        }}>
          <span style={{ fontSize:'16px' }}>＋</span> New Chat
        </button>

        {/* Model selector */}
        <div style={{ marginTop:'16px' }}>
          <p style={{ fontSize:'11px', color:'var(--muted)', marginBottom:'8px' }}>Model</p>

          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            style={{
              width:'100%',
              padding:'9px 12px',
              borderRadius:'10px',
              background:'var(--surface2)',
              border:'1px solid var(--border)',
              color:'var(--text)',
              fontSize:'12px'
            }}
          >
            {MODELS.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

      </aside>

      {/* Main */}
      <main style={{
        flex:1,
        display:'flex',
        flexDirection:'column',
        minWidth:0
      }}>

        {/* Header */}
        <header style={{
          padding:'16px',
          borderBottom:'1px solid var(--border)',
          display:'flex',
          alignItems:'center',
          gap:'12px',
          background:'var(--surface)'
        }}>

          {/* Mobile menu button */}
          {isMobile && (
            <button
              onClick={()=>setSidebarOpen(!sidebarOpen)}
              style={{
                fontSize:'18px',
                background:'none',
                border:'none',
                cursor:'pointer'
              }}
            >
              ☰
            </button>
          )}

          <div style={{
            width:'8px',
            height:'8px',
            borderRadius:'50%',
            background:'#22c55e'
          }} />

          <span style={{ fontSize:'15px', fontWeight:600 }}>
            General Assistant
          </span>

          <span style={{
            marginLeft:'auto',
            fontSize:'11px',
            color:'var(--muted)',
            background:'var(--surface2)',
            padding:'3px 10px',
            borderRadius:'20px',
            border:'1px solid var(--border)'
          }}>
            {MODELS.find(m => m.value === selectedModel)?.label ?? selectedModel}
          </span>

        </header>

        <SystemPromptBar value={systemPrompt} onChange={setSystemPrompt} />

        <MessageList
          messages={messages}
          isLoading={isLoading}
        />

        {error && (
          <div style={{
            margin:'10px',
            padding:'10px',
            background:'rgba(248,113,113,0.1)',
            border:'1px solid rgba(248,113,113,0.3)',
            borderRadius:'10px'
          }}>
            ⚠ {error}
          </div>
        )}

        <InputBar
          onSend={send}
          disabled={isLoading}
        />

      </main>

    </div>
  )
}
