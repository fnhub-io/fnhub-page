import React from 'react';
import { Server, Code2, Zap, Cloud, ArrowRight, Github } from 'lucide-react';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}>
      {/* Hero Section */}
      <nav style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server style={{ height: '2rem', width: '2rem', color: '#f97316' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>RustServe</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#features" style={{ color: '#d1d5db', transition: 'colors 0.3s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#d1d5db'}>Features</a>
            <a href="#try-it" style={{ color: '#d1d5db', transition: 'colors 0.3s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#d1d5db'}>Try It</a>
            <a href="https://github.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f97316', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ea580c'} onMouseOut={(e) => e.target.style.backgroundColor = '#f97316'}>
              <Github style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto', padding: '0 1.5rem' }}>
        <div style={{ padding: '5rem 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>
            Serverless Rust Made Simple
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '3rem', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>
            Deploy your Rust applications instantly with our powerful serverless platform.
            Write, compile, and run Rust code directly in your browser.
          </p>
          <a
            href="#try-it"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f97316', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontSize: '1.125rem', fontWeight: '600', transition: 'background-color 0.3s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ea580c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f97316'}
          >
            <span>Try It Now</span>
            <ArrowRight style={{ height: '1.25rem', width: '1.25rem' }} />
          </a>
        </div>

        {/* Features Section */}
        <div id="features" style={{ padding: '5rem 0' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '3rem' }}>Why Choose RustServe?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '1.5rem', borderRadius: '0.75rem' }}>
              <Code2 style={{ height: '3rem', width: '3rem', color: '#f97316', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>Browser-Based Compilation</h3>
              <p style={{ color: '#9ca3af' }}>
                Compile and run your Rust code directly in the browser. No local setup required.
              </p>
            </div>
            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '1.5rem', borderRadius: '0.75rem' }}>
              <Zap style={{ height: '3rem', width: '3rem', color: '#f97316', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>Lightning Fast</h3>
              <p style={{ color: '#9ca3af' }}>
                Experience blazing-fast compilation times with our optimized serverless infrastructure.
              </p>
            </div>
            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '1.5rem', borderRadius: '0.75rem' }}>
              <Cloud style={{ height: '3rem', width: '3rem', color: '#f97316', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>Serverless Architecture</h3>
              <p style={{ color: '#9ca3af' }}>
                Scale automatically with serverless deployment. Pay only for what you use.
              </p>
            </div>
          </div>
        </div>

        {/* Try It Section */}
        <div id="try-it" style={{ padding: '5rem 0' }}>
          <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.75rem', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>Ready to Get Started?</h2>
            <p style={{ color: '#d1d5db', marginBottom: '2rem' }}>
              Jump right in and try our Rust compiler. Write your code, hit compile, and see the magic happen.
            </p>
            <a
              href="/compiler"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f97316', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.3s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#ea580c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f97316'}
            >
              <span>Go to Compiler</span>
              <ArrowRight style={{ height: '1.25rem', width: '1.25rem' }} />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #334155' }}>
        <div style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto', padding: '2rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Server style={{ height: '1.5rem', width: '1.5rem', color: '#f97316' }} />
              <span style={{ color: 'white', fontWeight: '600' }}>RustServe</span>
            </div>
            <p style={{ color: '#9ca3af' }}>© 2025 RustServe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;