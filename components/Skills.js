import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    id: 'languages',
    label: 'LANGUAGES & CORE',
    icon: '{ }',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 95 },
      { name: 'Spark / PySpark', level: 90 },
      { name: 'Scala', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'Bash', level: 80 },
      { name: 'R', level: 65 },
    ],
  },
  {
    id: 'bigdata',
    label: 'BIG DATA & STREAMING',
    icon: '>>>',
    skills: [
      { name: 'Apache Spark', level: 95 },
      { name: 'Kafka', level: 90 },
      { name: 'Apache Flink', level: 80 },
      { name: 'Hive / HiveQL', level: 85 },
      { name: 'Delta Lake', level: 88 },
      { name: 'Hadoop / HDFS', level: 80 },
      { name: 'Apache Beam', level: 78 },
    ],
  },
  {
    id: 'cloud',
    label: 'CLOUD PLATFORMS',
    icon: '~~~',
    skills: [
      { name: 'Azure (ADF, Synapse, Fabric)', level: 92 },
      { name: 'AWS (Glue, Lambda, S3, Redshift)', level: 88 },
      { name: 'GCP (BigQuery, Dataflow, Pub/Sub)', level: 85 },
      { name: 'Snowflake', level: 90 },
      { name: 'Databricks', level: 90 },
    ],
  },
  {
    id: 'orchestration',
    label: 'ORCHESTRATION & DEVOPS',
    icon: '[-]',
    skills: [
      { name: 'Apache Airflow', level: 88 },
      { name: 'dbt', level: 85 },
      { name: 'Docker / Kubernetes', level: 82 },
      { name: 'Terraform', level: 80 },
      { name: 'CI/CD (Jenkins, GitHub Actions)', level: 85 },
    ],
  },
  {
    id: 'databases',
    label: 'DATABASES & STORAGE',
    icon: '[=]',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 78 },
      { name: 'Elasticsearch', level: 80 },
      { name: 'Redshift / Synapse', level: 85 },
      { name: 'DynamoDB / HBase', level: 72 },
    ],
  },
  {
    id: 'visualization',
    label: 'VISUALIZATION & BI',
    icon: '|#|',
    skills: [
      { name: 'Power BI / DAX', level: 88 },
      { name: 'Tableau', level: 82 },
      { name: 'Grafana / Prometheus', level: 78 },
      { name: 'D3.js', level: 65 },
    ],
  },
];

function SkillBar({ name, level, delay, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} style={{ marginBottom: '14px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '6px',
      }}>
        <span style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
        }}>
          {name}
        </span>
        <span style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}>
          {level}%
        </span>
      </div>
      <div style={{
        height: '3px',
        background: 'var(--bg-elevated)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: '2px',
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}

function NeuralGridSVG() {
  return (
    <svg
      viewBox="0 0 600 400"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.06,
        pointerEvents: 'none',
      }}
    >
      {/* Grid of interconnected nodes */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => {
          const x = 30 + col * 48;
          const y = 30 + row * 48;
          return (
            <g key={`${row}-${col}`}>
              <circle cx={x} cy={y} r="1.5" fill="var(--accent)" />
              {col < 11 && (
                <line x1={x} y1={y} x2={x + 48} y2={y}
                  stroke="var(--accent)" strokeWidth="0.3" />
              )}
              {row < 7 && (
                <line x1={x} y1={y} x2={x} y2={y + 48}
                  stroke="var(--accent)" strokeWidth="0.3" />
              )}
            </g>
          );
        })
      )}
      {/* Animated pulse traveling through grid */}
      {[0, 1, 2].map((i) => (
        <circle key={i} r="4" fill="var(--accent)" opacity="0.5">
          <animateMotion
            path={`M30,${30 + i * 144} L558,${30 + i * 144}`}
            dur={`${4 + i}s`}
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0;0.5;0" dur={`${4 + i}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('cloud');
  const colors = {
    languages: '#c9a227',
    bigdata: '#f39c12',
    cloud: '#2ecc71',
    orchestration: '#00d4aa',
    databases: '#c9a227',
    visualization: '#f39c12',
  };

  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
      <NeuralGridSVG />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-label">SKILLS</div>
        <h2 className="section-title">
          Full-stack data toolkit<br />
          <span style={{ color: 'var(--text-muted)' }}>built through production experience</span>
        </h2>
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '48px',
        }}
      >
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '1px',
              padding: '10px 16px',
              border: `1px solid ${activeCategory === cat.id ? colors[cat.id] + '50' : 'var(--border)'}`,
              background: activeCategory === cat.id ? colors[cat.id] + '10' : 'transparent',
              color: activeCategory === cat.id ? colors[cat.id] : 'var(--text-muted)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ opacity: 0.6 }}>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Active skills display */}
      {skillCategories.map((cat) => (
        cat.id === activeCategory && (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '32px',
              maxWidth: '900px',
            }}
          >
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '28px',
            }}>
              {cat.skills.slice(0, Math.ceil(cat.skills.length / 2)).map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={i * 0.08}
                  color={colors[cat.id]}
                />
              ))}
            </div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '28px',
            }}>
              {cat.skills.slice(Math.ceil(cat.skills.length / 2)).map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={i * 0.08 + 0.3}
                  color={colors[cat.id]}
                />
              ))}
            </div>
          </motion.div>
        )
      ))}

      {/* Bottom: Architecture keywords */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '56px',
          padding: '24px 28px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '2px',
          marginBottom: '16px',
        }}>
          ARCHITECTURE & PATTERNS
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          {[
            'Medallion Architecture', 'Kimball Dimensional Modeling', 'Star/Snowflake Schema',
            'Data Vault', 'Streaming Pipelines', 'Batch Processing', 'Event-Driven Architecture',
            'Lakehouse', 'Data Mesh', 'Schema Evolution', 'CDC', 'OpenLineage',
            'Data Governance', 'DataOps', 'Healthcare Analytics (HEDIS/CMS)',
          ].map((tag) => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              padding: '5px 10px',
              background: 'var(--accent-dim)',
              borderRadius: '3px',
              color: 'var(--accent)',
              border: '1px solid var(--border-accent)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
