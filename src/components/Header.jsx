import React from 'react';

export default function Header() {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
      borderBottom: '1px solid #4c1d95',
      padding: '1.5rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>✨</span>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Karls Humanizer
          </h1>
          <span style={{ fontSize: '2rem' }}>🧠</span>
        </div>
        <p style={{
          color: '#c4b5fd',
          fontSize: 'clamp(0.875rem, 2vw, 1.1rem)',
          fontWeight: 400,
          letterSpacing: '0.02em',
        }}>
          Transform AI Text Into Undetectable Human Writing
        </p>
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.75rem', flexWrap: 'wrap',
        }}>
          {['99.9% Human Score', 'Beats AI Detectors', 'Instant Results'].map(badge => (
            <span key={badge} style={{
              background: 'rgba(139,92,246,0.2)',
              border: '1px solid rgba(139,92,246,0.4)',
              borderRadius: '999px',
              padding: '0.2rem 0.75rem',
              fontSize: '0.75rem',
              color: '#c4b5fd',
              fontWeight: 500,
            }}>{badge}</span>
          ))}
        </div>
      </div>
    </header>
  );
}
