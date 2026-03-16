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
    <div style={{ display:'flex', height:'100vh', width:'100vw', background:'#0f0f13', overflow:'hidden', fontFamily:'system-ui', position:'relative' }}>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:40 }} />
      )}

      {/* Sidebar */}
      <aside style={{
        width:'260px', flexShrink:0, background:'#16161e',
        borderRight:'1px solid rgba(255,255,255,0.07)',
        display:'flex', flexDirection:'column', padding:'24px 16px', gap:'8px',
        position: isMobile ? 'fixed' : 'relative',
        top:0, left: isMobile ? (sidebarOpen ? 0 : '-280px') : 0,
        height:'100vh', zIndex:50,
        transition:'left 0.28s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'24px', paddingLeft:'4px' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'linear-gradient(135deg,#7c6af7,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>✦</div>
          <span style={{ fontWeight:600, fontSize:'16px', color:'#e8e8f0', flex:1 }}>AI Chat</span>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)}
              style={{ background:'none', border:'none', color:'#6b6b80', fontSize:'20px', cursor:'pointer', padding:'0 4px' }}>✕</button>
          )}
        </div>

        {/* New Chat */}
        <button onClick={() => { clear(); setSidebarOpen(false) }}
          style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'10px', background:'linear-gradient(135deg,rgba(124,106,247,0.2),rgba(167,139,250,0.15))', border:'1px solid rgba(124,106,247,0.3)', color:'#a78bfa', fontSize:'14px', fontWeight:500, cursor:'pointer' }}>
          <span style={{ fontSize:'18px', lineHeight:1 }}>＋</span> New Chat
        </button>

        {/* Model Selector */}
        <div style={{ marginTop:'20px' }}>
          <p style={{ fontSize:'11px', color:'#6b6b80', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px', paddingLeft:'4px' }}>Model</p>
          <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}
            style={{ width:'100%', padding:'9px 12px', borderRadius:'10px', background:'#1e1e2a', border:'1px solid rgba(255,255,255,0.07)', color:'#e8e8f0', fontSize:'12px', outline:'none', cursor:'pointer' }}>
            {MODELS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          <div style={{ marginTop:'8px', padding:'8px 10px', borderRadius:'8px', background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)' }}>
            <p style={{ fontSize:'11px', color:'#4ade80', lineHeight:1.5 }}></p>
          </div>
        </div>

        {/* Recent */}
        <div style={{ marginTop:'16px', borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:'16px' }}>
          <p style={{ fontSize:'11px', color:'#6b6b80', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px', paddingLeft:'4px' }}>Recent</p>
          {messages.length > 0 ? (
            <div style={{ padding:'10px 12px', borderRadius:'10px', background:'#1e1e2a', border:'1px solid rgba(255,255,255,0.07)', fontSize:'13px', color:'#e8e8f0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {messages.find(m => m.role === 'user')?.content?.slice(0, 28) + '…'}
            </div>
          ) : (
            <p style={{ fontSize:'13px', color:'#6b6b80', paddingLeft:'4px' }}>No chats yet</p>
          )}
        </div>

        {/* User */}
        <div style={{ marginTop:'auto', borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 4px' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'linear-gradient(135deg,#7c6af7,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:600, color:'#fff' }}>U</div>
            <div>
              <p style={{ fontSize:'13px', fontWeight:500, color:'#e8e8f0' }}>You</p>
              <p style={{ fontSize:'11px', color:'#6b6b80' }}>Free via Puter</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, width:'100%' }}>

        {/* Header */}
        <header style={{ padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', gap:'10px', background:'#16161e', flexShrink:0 }}>
          {isMobile && (
            <button onClick={() => setSidebarOpen(true)}
              style={{ background:'none', border:'none', color:'#e8e8f0', fontSize:'20px', cursor:'pointer', padding:'4px', marginRight:'2px' }}>☰</button>
          )}
          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 6px #22c55e', flexShrink:0 }} />
          <span style={{ fontSize:'14px', fontWeight:600, color:'#e8e8f0', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>General Assistant</span>
          <span style={{ fontSize:'11px', color:'#6b6b80', background:'#1e1e2a', padding:'3px 10px', borderRadius:'20px', border:'1px solid rgba(255,255,255,0.07)', whiteSpace:'nowrap', flexShrink:0 }}>
            {MODELS.find(m => m.value === selectedModel)?.label?.split(' ')[0] ?? 'GPT'}
          </span>
        </header>

        <SystemPromptBar value={systemPrompt} onChange={setSystemPrompt} />
        <MessageList messages={messages} isLoading={isLoading} />

        {error && (
          <div style={{ margin:'0 12px 8px', padding:'10px 14px', background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', borderRadius:'10px', color:'#f87171', fontSize:'13px', flexShrink:0 }}>
            ⚠ {error}
          </div>
        )}

        <InputBar onSend={send} disabled={isLoading} />
      </main>
    </div>
  )
              }
