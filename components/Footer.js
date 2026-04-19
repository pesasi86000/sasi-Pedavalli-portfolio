import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 24px',
      background: 'var(--bg-secondary)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-muted)',
          }}>
            Sasi Pedavalli
          </span>
          <span style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.4,
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
          }}>
            Data Engineer
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '24px',
        }}>
          <a
            href="mailto:pesasi86000@gmail.com"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            EMAIL
          </a>
          <a
            href="https://www.linkedin.com/in/p-sasi/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            LINKEDIN
          </a>
          <a
            href="https://github.com/pesasi86000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            GITHUB
          </a>
        </div>
      </div>
    </footer>
  );
}
