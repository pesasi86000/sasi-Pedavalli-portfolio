import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const numTarget = parseInt(target);
    const increment = numTarget / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numTarget) {
        setCount(numTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '36px',
      fontWeight: 700,
      color: 'var(--accent)',
    }}>
      {prefix}{count}{suffix}
    </span>
  );
}

function DataFlowSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', opacity: 0.6 }}>
      {/* Data Sources */}
      <g>
        {/* Source nodes */}
        {[50, 120, 190].map((y, i) => (
          <g key={i}>
            <rect x="10" y={y - 15} width="60" height="30" rx="4"
              fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4" />
            <text x="40" y={y + 4} textAnchor="middle"
              fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">
              {['S3', 'KAFKA', 'API'][i]}
            </text>
            {/* Flow lines */}
            <line x1="70" y1={y} x2="140" y2="150"
              stroke="var(--accent)" strokeWidth="0.5" opacity="0.3"
              strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
          </g>
        ))}

        {/* Central processor */}
        <g transform="translate(140, 130)">
          <rect width="80" height="40" rx="4"
            fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="40" y="24" textAnchor="middle"
            fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)">
            TRANSFORM
          </text>
          {/* Pulse effect */}
          <rect width="80" height="40" rx="4"
            fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* Output nodes */}
        {[80, 150, 220].map((y, i) => (
          <g key={i}>
            <line x1="220" y1="150" x2="300" y2={y}
              stroke="var(--node-green)" strokeWidth="0.5" opacity="0.3"
              strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
            <rect x="300" y={y - 15} width="70" height="30" rx="4"
              fill="none" stroke="var(--node-green)" strokeWidth="0.5" opacity="0.4" />
            <text x="335" y={y + 4} textAnchor="middle"
              fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-mono)">
              {['BIGQUERY', 'REDSHIFT', 'POWER BI'][i]}
            </text>
          </g>
        ))}

        {/* Floating data particles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} r="2" fill="var(--accent)" opacity="0.6">
            <animateMotion
              path={`M70,${50 + i * 50} L140,150 L300,${80 + i * 40}`}
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
    </svg>
  );
}

const impactMetrics = [
  {
    value: '30',
    suffix: '%',
    label: 'Faster Spark Runtime',
    description: 'Optimized Databricks jobs processing TB-scale datasets',
  },
  {
    value: '40',
    suffix: '%',
    label: 'Less Manual Data Handling',
    description: 'Automated ETL with AWS Glue, SQL, and Python pipelines',
  },
  {
    value: '10',
    prefix: '<',
    suffix: 's',
    label: 'Data Delivery Latency',
    description: 'Real-time ingestion via Kafka + Spark Structured Streaming',
  },
  {
    value: '90',
    suffix: '%',
    label: 'Infra Time Reduction',
    description: 'Terraform automation for cloud infrastructure management',
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-label">ABOUT</div>
        <h2 className="section-title">
          Engineering data systems<br />
          <span style={{ color: 'var(--text-muted)' }}>that scale with the business</span>
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'start',
      }}>
        {/* Left: narrative + pipeline viz */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            marginBottom: '32px',
          }}>
            I am a Data Engineer with a Master's in Information Quality from the University of Arkansas
            and 6+ years building production data infrastructure. My work spans the full pipeline lifecycle
            — from real-time ingestion and streaming to warehouse optimization and BI delivery.
          </p>
          <p style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            marginBottom: '40px',
          }}>
            I have worked across multi-cloud environments, building systems that ingest millions of events,
            transform complex datasets, and deliver reliable analytics. I care about clean architecture,
            data quality, and making complex systems observable.
          </p>

          {/* Pipeline visualization */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '24px',
            height: '220px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              marginBottom: '8px',
              letterSpacing: '2px',
            }}>
              DATA PIPELINE FLOW
            </div>
            <DataFlowSVG />
          </div>
        </motion.div>

        {/* Right: impact metrics */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
          }}
        >
          {impactMetrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-accent)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(201, 162, 39, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top glow line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)',
                opacity: 0.5,
              }} />

              <AnimatedCounter
                target={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix || ''}
              />
              <div style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginTop: '8px',
                marginBottom: '8px',
              }}>
                {metric.label}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
              }}>
                {metric.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
