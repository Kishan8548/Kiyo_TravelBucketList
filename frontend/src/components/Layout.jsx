import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas)' }}>
      <Navbar />
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--line-cool)',
        padding: '48px 0 32px',
        marginTop: '64px',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: 'var(--canvas-night)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white' }}>✈</div>
              <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.3px' }}>Next<span style={{ color: 'var(--green-deep)' }}>Stop</span></span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--ink-mute)' }}>
              © {new Date().getFullYear()} NextStop. Your personal travel bucket list.
            </p>
          </div>
        </div>
      </footer>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--canvas-night)',
            color: 'var(--on-dark)',
            borderRadius: 'var(--r-md)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          },
          success: { iconTheme: { primary: 'var(--green)', secondary: 'var(--canvas-night)' } },
        }}
      />
    </div>
  );
}
