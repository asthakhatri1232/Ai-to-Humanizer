import React from 'react';
import Header from './components/Header.jsx';
import DetectorBadges from './components/DetectorBadges.jsx';
import TextEditor from './components/TextEditor.jsx';
import DetectorGrid from './components/DetectorGrid.jsx';
import './App.css';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <DetectorBadges />
      <main style={{ flex: 1, padding: '1rem 0' }}>
        <TextEditor />
        <DetectorGrid />
      </main>
      <footer style={{
        borderTop: '1px solid #1e293b',
        padding: '1rem',
        textAlign: 'center',
        color: '#334155',
        fontSize: '0.8rem',
      }}>
        Karls Humanizer &copy; {new Date().getFullYear()} &middot; AI to Human Text Converter &middot; Beats Every AI Detector
      </footer>
    </div>
  );
}

