import { useEffect, useState } from 'react'

declare const puter: any

interface Props {
  children: React.ReactNode
}

export default function PuterAuth({ children }: Props) {
  const [status, setStatus] = useState<'loading' | 'signed-in' | 'signed-out'>('loading')

  useEffect(() => {
    const check = async () => {
      try {
        let retries = 0
        while (typeof puter === 'undefined' && retries < 20) {
          await new Promise(r => setTimeout(r, 200))
          retries++
        }
        if (typeof puter === 'undefined') { setStatus('signed-out'); return }
        const signedIn = await puter.auth.isSignedIn()
        setStatus(signedIn ? 'signed-in' : 'signed-out')
      } catch {
        setStatus('signed-out')
      }
    }
    check()
  }, [])

  const handleSignIn = async () => {
    try {
      await puter.auth.signIn()
      setStatus('signed-in')
    } catch (err) {
      console.error('Sign in failed:', err)
    }
  }

  if (status === 'loading') return (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', flexDirection:'column', gap:'16px' }}>
      <div style={{ fontSize:'28px' }}>✦</div>
      <p style={{ color:'var(--muted)', fontSize:'14px' }}>Loading AI engine...</p>
    </div>
  )

  if (status === 'signed-out') return (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', flexDirection:'column', gap:'24px', padding:'24px' }}>
      <div style={{ width:'64px', height:'64px', borderRadius:'20px', background:'linear-gradient(135deg, #7c6af7, #a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>✦</div>
      <div style={{ textAlign:'center' }}>
        <h1 style={{ fontSize:'24px', fontWeight:700, marginBottom:'8px' }}>AI Chatbot</h1>
        <p style={{ color:'var(--muted)', fontSize:'14px', maxWidth:'320px', lineHeight:1.6 }}>
          Sign in with a free Puter account to access AI models — no credit card needed.
        </p>
      </div>
      <button onClick={handleSignIn} style={{ padding:'14px 36px', borderRadius:'12px', border:'none', background:'linear-gradient(135deg, #7c6af7, #a78bfa)', color:'#fff', fontSize:'15px', fontWeight:600, cursor:'pointer', boxShadow:'0 4px 20px rgba(124,106,247,0.4)' }}>
        Sign in with Puter (Free)
      </button>
      <p style={{ color:'var(--muted)', fontSize:'12px', textAlign:'center', maxWidth:'280px' }}>
        Sign up at <a href="https://puter.com" target="_blank" style={{ color:'var(--accent2)' }}>puter.com</a> — takes 30 seconds, no credit card.
      </p>
    </div>
  )

  return <>{children}</>
}