import React from 'react';

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: '#1e293b',
      border: `1px solid ${color}40`,
      borderRadius: '12px',
      padding: '1rem 1.25rem',
      flex: 1,
      minWidth: '120px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icon}</div>
      <div style={{
        fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
        fontWeight: 700,
        color: color,
        lineHeight: 1,
        marginBottom: '0.25rem',
      }}>{value}</div>
      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function getRiskLevel(humanScore) {
  if (humanScore >= 98) return { label: 'Very Low ✓', color: '#10b981' };
  if (humanScore >= 95) return { label: 'Low ✓',      color: '#34d399' };
  if (humanScore >= 90) return { label: 'Medium',     color: '#f59e0b' };
  return { label: 'High', color: '#ef4444' };
}

export default function StatsPanel({ changeCount, humanScore, wordCount, paragraphs }) {
  const risk = getRiskLevel(humanScore);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(16,185,129,0.06))',
      border: '1px solid #334155',
      borderRadius: '16px',
      padding: '1.25rem',
      marginTop: '1.5rem',
    }}>
      <h3 style={{
        color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem',
      }}>
        Analysis Results
      </h3>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <StatCard label="Human Score"         value={humanScore  > 0 ? `${humanScore}%`   : '—'} color="#10b981" icon="🎯" />
        <StatCard label="AI Detection Risk"   value={humanScore  > 0 ? risk.label          : '—'} color={humanScore > 0 ? risk.color : '#94a3b8'} icon="🛡️" />
        <StatCard label="Words Changed"       value={changeCount > 0 ? changeCount          : '—'} color="#8b5cf6" icon="✏️" />
        <StatCard label="Words Processed"     value={wordCount   > 0 ? wordCount            : '—'} color="#3b82f6" icon="📝" />
        {paragraphs > 1 && (
          <StatCard label="Paragraphs"        value={paragraphs}                                   color="#f59e0b" icon="📄" />
        )}
      </div>
    </div>
  );
}

