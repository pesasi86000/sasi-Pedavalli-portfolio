import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const NeuralNetwork = dynamic(() => import('./NeuralNetwork'), {
  ssr: false,
  loading: () => null,
});

const roles = [
  'Data Engineer',
  'Pipeline Architect',
  'Cloud Data Specialist',
  'Analytics Engineer',
];

function useTypingEffect(words, typingSpeed = 80, deleteSpeed = 40, pauseTime = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? deleteSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deleteSpeed, pauseTime]);

  return text;
}

function StatusIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        color: 'var(--node-green)',
        marginBottom: '24px',
      }}
    >
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'var(--node-green)',
        boxShadow: '0 0 8px var(--node-green)',
        animation: 'node-pulse 2s ease-in-out infinite',
        display: 'inline-block',
      }} />
      OPEN TO OPPORTUNITIES
    </motion.div>
  );
}

export default function Hero() {
  const typedRole = useTypingEffect(roles);

  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <NeuralNetwork />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(201, 162, 39, 0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(to top, var(--bg-primary), transparent)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
      }}>
        <StatusIndicator />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: '8px',
            letterSpacing: '-2px',
          }}>
            Sasi Pedavalli
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: 'clamp(20px, 3vw, 32px)',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            minHeight: '44px',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>{typedRole}</span>
          <span style={{
            borderRight: '2px solid var(--accent)',
            marginLeft: '2px',
            animation: 'blink 1s step-end infinite',
          }}>&nbsp;</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            marginBottom: '48px',
          }}
        >
          I build the data systems that power decisions. Six years turning
          raw chaos into clean, reliable pipelines across Azure, AWS, and GCP.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <a href="#experience" style={{
            padding: '14px 32px',
            background: 'var(--accent)',
            color: '#050505',
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--accent-bright)';
            e.target.style.boxShadow = '0 0 30px var(--accent-glow)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--accent)';
            e.target.style.boxShadow = 'none';
          }}
          >
            View My Work
          </a>
          <a href="#contact" style={{
            padding: '14px 32px',
            background: 'transparent',
            color: 'var(--accent)',
            fontWeight: 500,
            fontSize: '14px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
            border: '1px solid var(--border-accent)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'var(--accent)';
            e.target.style.background = 'var(--accent-dim)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'var(--border-accent)';
            e.target.style.background = 'transparent';
          }}
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '80px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '7+', label: 'Years Experience' },
            { value: '3', label: 'Cloud Platforms' },
            { value: 'MS', label: 'Information Quality' },
          ].map((stat, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--accent)',
              }}>{stat.value}</span>
              <span style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '2px',
        }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            width: '1px',
            height: '24px',
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
