import React, { useState } from 'react';
import { humanizeText } from './HumanizerEngine.js';
import StatsPanel from './StatsPanel.jsx';

function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

const MODE_CONFIG = {
  light: { label: 'Light', desc: 'Minimal changes, preserves original tone', color: '#34d399' },
  standard: { label: 'Standard', desc: 'Balanced humanization', color: '#8b5cf6' },
  aggressive: { label: 'Aggressive', desc: 'Maximum humanization for highest score', color: '#ef4444' },
};

export default function TextEditor() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ changeCount: 0, humanScore: 0 });

  const inputWordCount = countWords(inputText);
  const outputWordCount = countWords(outputText);

  const handleHumanize = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const result = humanizeText(inputText, mode);
      setOutputText(result.humanizedText);
      setStats({ changeCount: result.changeCount, humanScore: result.humanScore });
      setIsProcessing(false);
    }, 600);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = outputText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setStats({ changeCount: 0, humanScore: 0 });
  };

  const scoreColor = stats.humanScore >= 98 ? '#10b981' : stats.humanScore >= 95 ? '#34d399' : stats.humanScore >= 90 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Mode Selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {Object.entries(MODE_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
              border: `2px solid ${mode === key ? cfg.color : '#334155'}`,
              background: mode === key ? `${cfg.color}20` : 'transparent',
              color: mode === key ? cfg.color : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 0.2s',
            }}
          >
            {cfg.label}
          </button>
        ))}
      </div>
      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', marginBottom: '1.5rem', marginTop: '-1rem' }}>
        {MODE_CONFIG[mode].desc}
      </p>

      {/* Text Areas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Input */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '0.5rem',
          }}>
            <label style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ background: '#334155', borderRadius: '6px', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>AI</span>
              AI-Generated Text
            </label>
            <span style={{ color: '#475569', fontSize: '0.75rem' }}>
              {inputWordCount} words · {inputText.length} chars
            </span>
          </div>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Paste your AI-generated text here...&#10;&#10;Example: 'Furthermore, it is important to note that the implementation of this comprehensive solution will facilitate a significant improvement in overall performance metrics.'"
            style={{
              flex: 1,
              minHeight: '320px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '1rem',
              color: '#f1f5f9',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#8b5cf6'}
            onBlur={e => e.target.style.borderColor = '#334155'}
          />
        </div>

        {/* Output */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '0.5rem',
          }}>
            <label style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ background: '#064e3b', borderRadius: '6px', padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: '#34d399' }}>Human</span>
              Humanized Text
            </label>
            {stats.humanScore > 0 && (
              <span style={{ color: scoreColor, fontSize: '0.875rem', fontWeight: 700 }}>
                🎯 {stats.humanScore}% Human
              </span>
            )}
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            <textarea
              value={outputText}
              readOnly
              placeholder="Your humanized text will appear here..."
              style={{
                width: '100%',
                height: '100%',
                minHeight: '320px',
                background: outputText ? '#162032' : '#1e293b',
                border: `1px solid ${outputText ? '#1d4ed8' : '#334155'}`,
                borderRadius: '12px',
                padding: '1rem',
                color: '#f1f5f9',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                resize: 'vertical',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s, background 0.3s',
              }}
            />
            {isProcessing && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(15,23,42,0.8)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '0.75rem',
              }}>
                <div style={{
                  width: '40px', height: '40px',
                  border: '3px solid #334155',
                  borderTop: '3px solid #8b5cf6',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <p style={{ color: '#a78bfa', fontSize: '0.875rem', fontWeight: 500 }}>Humanizing...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleHumanize}
          disabled={!inputText.trim() || isProcessing}
          style={{
            background: inputText.trim() && !isProcessing
              ? 'linear-gradient(135deg, #059669, #10b981)'
              : '#1e293b',
            color: inputText.trim() && !isProcessing ? 'white' : '#475569',
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: inputText.trim() && !isProcessing ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            minWidth: '180px', justifyContent: 'center',
          }}
        >
          {isProcessing ? '⏳ Processing...' : '✨ Humanize Text'}
        </button>

        <button
          onClick={handleCopy}
          disabled={!outputText}
          style={{
            background: copied ? 'linear-gradient(135deg, #1d4ed8, #3b82f6)' : 'transparent',
            color: outputText ? (copied ? 'white' : '#3b82f6') : '#475569',
            border: `2px solid ${outputText ? '#3b82f6' : '#334155'}`,
            borderRadius: '12px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: outputText ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>

        <button
          onClick={handleClear}
          style={{
            background: 'transparent',
            color: '#64748b',
            border: '2px solid #334155',
            borderRadius: '12px',
            padding: '0.75rem 1.25rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = '#ef4444'; e.target.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.target.style.borderColor = '#334155'; e.target.style.color = '#64748b'; }}
        >
          🗑️ Clear
        </button>
      </div>

      {/* Stats */}
      {(stats.humanScore > 0 || outputText) && (
        <StatsPanel
          changeCount={stats.changeCount}
          humanScore={stats.humanScore}
          wordCount={outputWordCount}
        />
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
