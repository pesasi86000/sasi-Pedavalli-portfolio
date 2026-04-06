import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function SignalWave() {
  return (
    <svg viewBox="0 0 200 60" style={{ width: '200px', height: '60px', opacity: 0.2 }}>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M0,30 Q25,${10 + i * 5} 50,30 Q75,${50 - i * 5} 100,30 Q125,${10 + i * 5} 150,30 Q175,${50 - i * 5} 200,30`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity={0.6 - i * 0.15}
        >
          <animate
            attributeName="d"
            values={`M0,30 Q25,${10 + i * 5} 50,30 Q75,${50 - i * 5} 100,30 Q125,${10 + i * 5} 150,30 Q175,${50 - i * 5} 200,30;M0,30 Q25,${50 - i * 5} 50,30 Q75,${10 + i * 5} 100,30 Q125,${50 - i * 5} 150,30 Q175,${10 + i * 5} 200,30;M0,30 Q25,${10 + i * 5} 50,30 Q75,${50 - i * 5} 100,30 Q125,${10 + i * 5} 150,30 Q175,${50 - i * 5} 200,30`}
            dur={`${3 + i}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </svg>
  );
}

function TerminalPrompt({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <span style={{ color: 'var(--accent)' }}>$</span>
      {children}
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-label">CONTACT</div>
        <h2 className="section-title">
          Let's build something<br />
          <span style={{ color: 'var(--text-muted)' }}>that moves the needle</span>
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        maxWidth: '900px',
      }}>
        {/* Left: message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            marginBottom: '32px',
          }}>
            I'm always interested in roles where I can architect data platforms,
            optimize pipelines at scale, or help teams build a strong data foundation.
            If you're building something ambitious with data, let's talk.
          </p>

          <SignalWave />

          <div style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            {/* Education badge */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '20px 24px',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '2px',
                marginBottom: '12px',
              }}>
                EDUCATION
              </div>
              <div style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}>
                Master's in Information Quality
              </div>
              <div style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
              }}>
                University of Arkansas &middot; 2023 — 2024
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: terminal-style contact card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {/* Terminal header */}
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e74c3c' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f39c12' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2ecc71' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginLeft: '8px',
              }}>
                contact.sh
              </span>
            </div>

            {/* Terminal body */}
            <div style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <div>
                <TerminalPrompt>cat role_status.txt</TerminalPrompt>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--node-green)',
                  marginTop: '8px',
                  paddingLeft: '20px',
                }}>
                  Open to full-time Data Engineer roles
                </div>
              </div>

              <div>
                <TerminalPrompt>cat location.txt</TerminalPrompt>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  marginTop: '8px',
                  paddingLeft: '20px',
                }}>
                  United States (Open to Remote)
                </div>
              </div>

              <div>
                <TerminalPrompt>cat preferred_stack.txt</TerminalPrompt>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  marginTop: '8px',
                  paddingLeft: '20px',
                  lineHeight: 1.7,
                }}>
                  Azure / AWS / GCP<br />
                  Spark, Kafka, Airflow, dbt<br />
                  Snowflake, Databricks, Delta Lake
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '20px',
              }}>
                <TerminalPrompt>echo $CONTACT</TerminalPrompt>
                <div style={{
                  marginTop: '12px',
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  <a
                    href="mailto:sasipriyapedavalli@gmail.com"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-bright)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--accent)'}
                  >
                    sasipriyapedavalli@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/sasi-pedavalli"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-bright)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--accent)'}
                  >
                    linkedin.com/in/sasi-pedavalli
                  </a>
                </div>
              </div>

              {/* Blinking cursor */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ color: 'var(--accent)' }}>$</span>
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '16px',
                  background: 'var(--accent)',
                  animation: 'blink 1s step-end infinite',
                }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
