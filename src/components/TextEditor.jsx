import React, { useState, useRef } from 'react';
import { humanizeText } from './HumanizerEngine.js';
import StatsPanel from './StatsPanel.jsx';

function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function countParagraphs(text) {
  if (!text || !text.trim()) return 0;
  return text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
}

const MODE_CONFIG = {
  light:      { label: '🟢 Light',      desc: 'Minimal changes — preserves your original tone', color: '#34d399' },
  standard:   { label: '🟣 Standard',   desc: 'Balanced humanization — best for most content',  color: '#8b5cf6' },
  aggressive: { label: '🔴 Aggressive', desc: 'Maximum humanization — highest bypass rate',      color: '#ef4444' },
};

export default function TextEditor() {
  const [inputText, setInputText]     = useState('');
  const [outputText, setOutputText]   = useState('');
  const [mode, setMode]               = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress]       = useState(0);        // 0-100
  const [copied, setCopied]           = useState(false);
  const [stats, setStats]             = useState({ changeCount: 0, humanScore: 0, paragraphs: 0 });
  const outputRef                     = useRef(null);

  const inputWordCount  = countWords(inputText);
  const inputParaCount  = countParagraphs(inputText);
  const outputWordCount = countWords(outputText);

  // ── Humanize: process each paragraph independently ──────────────────────────
  const handleHumanize = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setProgress(5);

    // Split on blank lines to preserve paragraph structure
    const paragraphs = inputText.split(/\n\s*\n/);
    const total = paragraphs.length;

    let humanizedParagraphs = [];
    let totalChanges = 0;
    let scoreAccum   = 0;
    let processed    = 0;

    const tick = (idx) => {
      if (idx >= total) {
        const avgScore = scoreAccum / Math.max(total, 1);
        setOutputText(humanizedParagraphs.join('\n\n'));
        setStats({
          changeCount: totalChanges,
          humanScore:  parseFloat(avgScore.toFixed(1)),
          paragraphs:  total,
        });
        setProgress(100);
        setIsProcessing(false);
        // Scroll output into view
        if (outputRef.current) outputRef.current.scrollTop = 0;
        return;
      }

      const para = paragraphs[idx];
      if (!para.trim()) {
        humanizedParagraphs.push(para);
        processed++;
        setProgress(Math.round((processed / total) * 95) + 5);
        setTimeout(() => tick(idx + 1), 0);
        return;
      }

      // Use requestAnimationFrame/setTimeout so UI updates between paragraphs
      setTimeout(() => {
        const result = humanizeText(para, mode);
        humanizedParagraphs.push(result.humanizedText);
        totalChanges += result.changeCount;
        scoreAccum   += result.humanScore;
        processed++;
        setProgress(Math.round((processed / total) * 95) + 5);
        tick(idx + 1);
      }, 0);
    };

    // Small initial delay so "Processing…" renders before heavy work
    setTimeout(() => tick(0), 80);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
    } catch {
      const el = document.createElement('textarea');
      el.value = outputText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setStats({ changeCount: 0, humanScore: 0, paragraphs: 0 });
    setProgress(0);
  };

  const scoreColor =
    stats.humanScore >= 98 ? '#10b981' :
    stats.humanScore >= 95 ? '#34d399' :
    stats.humanScore >= 90 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>

      {/* ── Mode Selector ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        {Object.entries(MODE_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            style={{
              padding: '0.55rem 1.4rem',
              borderRadius: '999px',
              border: `2px solid ${mode === key ? cfg.color : '#334155'}`,
              background: mode === key ? `${cfg.color}20` : 'transparent',
              color: mode === key ? cfg.color : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.875rem',
              transition: 'all 0.2s',
            }}
          >
            {cfg.label}
          </button>
        ))}
      </div>
      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
        {MODE_CONFIG[mode].desc}
      </p>

      {/* ── Dual Text Areas ────────────────────────────────────────────────── */}
      <div className="editor-grid">

        {/* Input pane */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ background: '#334155', borderRadius: '6px', padding: '0.2rem 0.5rem', fontSize: '0.7rem', color: '#94a3b8' }}>AI</span>
              AI-Generated Text
            </label>
            <span style={{ color: '#475569', fontSize: '0.72rem' }}>
              {inputParaCount > 1 ? `${inputParaCount} paragraphs · ` : ''}{inputWordCount} words
            </span>
          </div>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={
              'Paste any amount of AI-generated text here — single sentences, whole essays, or many paragraphs.\n\n' +
              'Example:\n' +
              '"Furthermore, it is important to note that the implementation of this comprehensive solution will facilitate a significant improvement in overall performance metrics. Additionally, individuals must utilize these best practices in order to ensure optimal outcomes."'
            }
            style={{
              flex: 1,
              minHeight: '380px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '1rem',
              color: '#f1f5f9',
              fontSize: '0.9rem',
              lineHeight: 1.75,
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = '#8b5cf6')}
            onBlur={e  => (e.target.style.borderColor = '#334155')}
          />
        </div>

        {/* Output pane */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ background: '#064e3b', borderRadius: '6px', padding: '0.2rem 0.5rem', fontSize: '0.7rem', color: '#34d399' }}>Human</span>
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
              ref={outputRef}
              value={outputText}
              readOnly
              placeholder="Your humanized text will appear here — all paragraphs processed at once, ready to copy."
              style={{
                width: '100%',
                height: '100%',
                minHeight: '380px',
                background: outputText ? '#0d1f33' : '#1e293b',
                border: `1px solid ${outputText ? '#1d4ed8' : '#334155'}`,
                borderRadius: '12px',
                padding: '1rem',
                color: '#f1f5f9',
                fontSize: '0.9rem',
                lineHeight: 1.75,
                resize: 'vertical',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s, background 0.3s',
              }}
            />

            {/* Processing overlay with progress bar */}
            {isProcessing && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(15,23,42,0.88)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '1rem',
                padding: '2rem',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  border: '3px solid #1e293b',
                  borderTop: '3px solid #8b5cf6',
                  borderRadius: '50%',
                  animation: 'spin 0.75s linear infinite',
                }} />
                <p style={{ color: '#a78bfa', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
                  Humanizing{inputParaCount > 1 ? ` ${inputParaCount} paragraphs` : ''}…
                </p>
                <div style={{ width: '100%', maxWidth: '260px', background: '#1e293b', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #8b5cf6, #10b981)',
                    borderRadius: '999px',
                    transition: 'width 0.15s ease',
                  }} />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>{progress}% complete</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Action Buttons ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>

        {/* Main CTA */}
        <button
          onClick={handleHumanize}
          disabled={!inputText.trim() || isProcessing}
          style={{
            background: inputText.trim() && !isProcessing
              ? 'linear-gradient(135deg, #6d28d9, #8b5cf6)'
              : '#1e293b',
            color: inputText.trim() && !isProcessing ? 'white' : '#475569',
            border: 'none',
            borderRadius: '12px',
            padding: '0.8rem 2.25rem',
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: inputText.trim() && !isProcessing ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            minWidth: '200px', justifyContent: 'center',
            boxShadow: inputText.trim() && !isProcessing ? '0 0 20px rgba(139,92,246,0.4)' : 'none',
          }}
        >
          {isProcessing
            ? `⏳ Processing…`
            : `✨ Humanize${inputParaCount > 1 ? ` (${inputParaCount} Paragraphs)` : ' Text'}`}
        </button>

        {/* Copy */}
        <button
          onClick={handleCopy}
          disabled={!outputText}
          style={{
            background: copied ? 'linear-gradient(135deg, #1d4ed8, #3b82f6)' : 'transparent',
            color: outputText ? (copied ? 'white' : '#3b82f6') : '#475569',
            border: `2px solid ${outputText ? '#3b82f6' : '#334155'}`,
            borderRadius: '12px',
            padding: '0.8rem 1.75rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: outputText ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          {copied ? '✅ Copied!' : '📋 Copy All'}
        </button>

        {/* Clear */}
        <button
          onClick={handleClear}
          style={{
            background: 'transparent',
            color: '#64748b',
            border: '2px solid #334155',
            borderRadius: '12px',
            padding: '0.8rem 1.25rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#64748b'; }}
        >
          🗑️ Clear
        </button>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      {(stats.humanScore > 0 || outputText) && (
        <StatsPanel
          changeCount={stats.changeCount}
          humanScore={stats.humanScore}
          wordCount={outputWordCount}
          paragraphs={stats.paragraphs}
        />
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .editor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .editor-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

