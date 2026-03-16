import { useEffect, useRef } from 'react'
import { Message } from '../types/chat'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

interface Props { messages: Message[]; isLoading: boolean }

export default function MessageList({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isLoading])

  return (
    <div style={{ flex:1, overflowY:'auto', padding:'20px 16px', display:'flex', flexDirection:'column', gap:'16px' }}>
      {messages.length === 0 && (
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px', paddingTop:'40px', textAlign:'center' }}>
          <div style={{ width:'56px', height:'56px', borderRadius:'18px', background:'linear-gradient(135deg,rgba(124,106,247,0.2),rgba(167,139,250,0.15))', border:'1px solid rgba(124,106,247,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px' }}>✦</div>
          <div>
            <p style={{ fontSize:'18px', fontWeight:600, marginBottom:'6px', color:'#e8e8f0' }}>How can I help you?</p>
            <p style={{ fontSize:'13px', color:'#6b6b80' }}>Start typing below to begin</p>
          </div>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center', marginTop:'4px', padding:'0 16px' }}>
            {['What time is it?', 'Write some code', 'Explain a concept', 'Brainstorm ideas'].map(s => (
              <div key={s} style={{ padding:'7px 14px', borderRadius:'20px', background:'#1e1e2a', border:'1px solid rgba(255,255,255,0.07)', fontSize:'12px', color:'#6b6b80' }}>{s}</div>
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
