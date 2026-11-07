import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
