export default function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #2a2a3e, #1e1e2a)',
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '14px',
      }}>✦</div>
      <div style={{
        padding: '14px 18px',
        borderRadius: '18px 18px 18px 4px',
        background: 'var(--ai-bubble)',
        border: '1px solid var(--border)',
      }}>
        <style>{`
          @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-6px); opacity: 1; }
          }
          .tdot {
            display: inline-block;
            width: 7px; height: 7px;
            border-radius: 50%;
            background: var(--accent2);
            margin: 0 2px;
            animation: typingBounce 1.3s infinite;
          }
          .tdot:nth-child(2) { animation-delay: 0.18s; }
          .tdot:nth-child(3) { animation-delay: 0.36s; }
        `}</style>
        <span className="tdot"/><span className="tdot"/><span className="tdot"/>
      </div>
    </div>
  )
}
