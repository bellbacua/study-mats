import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';
import './features.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  handleReset = async () => {
    try {
      localStorage.clear();
      await fetch('/api/progress/reset', { method: 'POST' }).catch(() => {});
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0e14',
          color: '#f8fafc',
          padding: '2rem',
          fontFamily: 'sans-serif',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.75rem' }}>
            Application Error Encountered
          </h1>
          <p style={{ maxWidth: '600px', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {this.state.error?.message || 'An unexpected error occurred during rendering.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#0284c7',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Reload Page
            </button>
            <button
              onClick={this.handleReset}
              style={{
                backgroundColor: '#334155',
                color: '#f8fafc',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Reset Saved Progress & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const render = () =>
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );

// In the desktop app, answer /api calls inside the app and save to its own
// SQLite file. (?desktop-test runs the same code in a browser, saving to
// localStorage, so it can be checked without the app.)
const desktopTest = import.meta.env.DEV && new URLSearchParams(location.search).has('desktop-test');
if ((typeof window !== 'undefined' && window.__TAURI_INTERNALS__) || desktopTest) {
  import('./desktop/desktopApi.js')
    .then(({ installDesktopApi, tauriStore }) => {
      const store = desktopTest
        ? {
            load: async () => {
              const b = localStorage.getItem('desktop-test-db');
              return b ? Uint8Array.from(atob(b), (c) => c.charCodeAt(0)) : null;
            },
            // &slow makes each write take 400 ms, like writing the file to disk.
            save: async (u8) => {
              const data = btoa(String.fromCharCode(...u8));
              if (new URLSearchParams(location.search).has('slow')) await new Promise((r) => setTimeout(r, 400));
              localStorage.setItem('desktop-test-db', data);
            },
            where: async () => 'localStorage (test)',
          }
        : tauriStore();
      return installDesktopApi(store);
    })
    .catch((e) => console.error('Desktop storage failed to start', e))
    .finally(render);
} else {
  render();
}
