import React from 'react';

const DETECTORS = [
  {
    name: 'GPTZero',
    domain: 'gptzero.me',
    desc: 'Advanced AI Detection',
    icon: '🔍',
    color: '#6366f1',
  },
  {
    name: 'Turnitin',
    domain: 'turnitin.com',
    desc: 'Academic Integrity',
    icon: '🎓',
    color: '#f59e0b',
  },
  {
    name: 'Originality.ai',
    domain: 'originality.ai',
    desc: 'Content Verification',
    icon: '📋',
    color: '#3b82f6',
  },
  {
    name: 'Copyleaks',
    domain: 'copyleaks.com',
    desc: 'Plagiarism Detection',
    icon: '🛡️',
    color: '#10b981',
  },
  {
    name: 'ZeroGPT',
    domain: 'zerogpt.com',
    desc: 'AI Content Detector',
    icon: '⚡',
    color: '#8b5cf6',
  },
  {
    name: 'Monica.im',
    domain: 'monica.im',
    desc: 'All-in-One AI Detector',
    icon: '🤖',
    color: '#ec4899',
  },
  {
    name: 'Sapling AI',
    domain: 'sapling.ai',
    desc: 'AI Writing Detection',
    icon: '🌿',
    color: '#22c55e',
  },
  {
    name: 'Writer.com',
    domain: 'writer.com',
    desc: 'AI Content Detection',
    icon: '✍️',
    color: '#f97316',
  },
  {
    name: 'CrossPlag',
    domain: 'crossplag.com',
    desc: 'Advanced AI Scanner',
    icon: '🔎',
    color: '#06b6d4',
  },
  {
    name: 'Winston AI',
    domain: 'gowinston.ai',
    desc: 'AI Text Detector',
    icon: '🏆',
    color: '#a78bfa',
  },
  {
    name: 'Content at Scale',
    domain: 'contentatscale.ai',
    desc: 'AI Probability Scorer',
    icon: '📊',
    color: '#34d399',
  },
  {
    name: 'Grammarly',
    domain: 'grammarly.com',
    desc: 'Writing & AI Detection',
    icon: '📝',
    color: '#60a5fa',
  },
];

function DetectorCard({ detector }) {
  const { name, domain, desc, icon, color } = detector;
  return (
    <div style={{
      background: '#1e293b',
      border: `1px solid ${color}30`,
      borderRadius: '14px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = `0 8px 24px ${color}25`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* Subtle glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '80px', height: '80px',
        background: `radial-gradient(circle, ${color}15, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Icon + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{
          fontSize: '1.4rem',
          background: `${color}18`,
          border: `1px solid ${color}40`,
          borderRadius: '10px',
          width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>{icon}</span>
        <div>
          <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.95rem' }}>{name}</div>
          <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{domain}</div>
        </div>
      </div>

      {/* Desc */}
      <div style={{ color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.4 }}>{desc}</div>

      {/* Bypassed badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        background: 'rgba(16,185,129,0.1)',
        border: '1px solid rgba(16,185,129,0.35)',
        borderRadius: '999px',
        padding: '0.25rem 0.75rem',
        alignSelf: 'flex-start',
        marginTop: 'auto',
      }}>
        <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.05em' }}>✓ BYPASSED</span>
      </div>
    </div>
  );
}

export default function DetectorGrid() {
  return (
    <section style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2.5rem 1.5rem',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: '999px',
          padding: '0.3rem 1rem',
          marginBottom: '1rem',
          fontSize: '0.78rem',
          color: '#10b981',
          fontWeight: 600,
          letterSpacing: '0.08em',
        }}>
          🛡️ 100% BYPASS RATE
        </div>
        <h2 style={{
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          fontWeight: 800,
          color: '#f1f5f9',
          marginBottom: '0.5rem',
        }}>
          Bypasses All Major AI Detectors
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '540px', margin: '0 auto' }}>
          Your humanized text passes every major AI detection platform — undetectable, every single time.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        {DETECTORS.map(d => (
          <DetectorCard key={d.domain} detector={d} />
        ))}
      </div>

      {/* Bottom note */}
      <p style={{
        textAlign: 'center',
        color: '#334155',
        fontSize: '0.75rem',
        marginTop: '2rem',
      }}>
        Results may vary. For best results, use Aggressive mode on academic or professional content.
      </p>
    </section>
  );
}
