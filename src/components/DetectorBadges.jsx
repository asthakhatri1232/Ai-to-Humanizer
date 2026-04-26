import React from 'react';

const DETECTORS = [
  { name: 'GPTZero',        domain: 'gptzero.me',       icon: '🔍' },
  { name: 'Turnitin',       domain: 'turnitin.com',     icon: '🎓' },
  { name: 'Originality.ai', domain: 'originality.ai',   icon: '📋' },
  { name: 'Copyleaks',      domain: 'copyleaks.com',    icon: '🛡️' },
  { name: 'ZeroGPT',        domain: 'zerogpt.com',      icon: '⚡' },
  { name: 'Monica.im',      domain: 'monica.im',        icon: '🤖' },
  { name: 'Sapling AI',     domain: 'sapling.ai',       icon: '🌿' },
  { name: 'Writer.com',     domain: 'writer.com',       icon: '✍️' },
  { name: 'CrossPlag',      domain: 'crossplag.com',    icon: '🔎' },
  { name: 'Winston AI',     domain: 'gowinston.ai',     icon: '🏆' },
  { name: 'Content at Scale', domain: 'contentatscale.ai', icon: '📊' },
  { name: 'Grammarly',      domain: 'grammarly.com',    icon: '📝' },
];

// Duplicate for seamless looping
const TRACK = [...DETECTORS, ...DETECTORS];

export default function DetectorBadges() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,27,75,0.95))',
      borderTop: '1px solid rgba(139,92,246,0.2)',
      borderBottom: '1px solid rgba(139,92,246,0.2)',
      padding: '0.85rem 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* fade left */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
        background: 'linear-gradient(to right, #0f172a, transparent)',
        pointerEvents: 'none',
      }} />
      {/* fade right */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
        background: 'linear-gradient(to left, #0f172a, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', gap: '1.25rem', animation: 'marquee 30s linear infinite', width: 'max-content' }}>
        {TRACK.map((d, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '999px',
            padding: '0.3rem 0.85rem',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '0.95rem' }}>{d.icon}</span>
            <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.78rem' }}>{d.name}</span>
            <span style={{
              background: '#10b981',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: 700,
              borderRadius: '999px',
              padding: '0.1rem 0.45rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>✓ Bypassed</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
