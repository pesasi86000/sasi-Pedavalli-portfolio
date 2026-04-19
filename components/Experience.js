import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    period: '2024 — Present',
    role: 'Azure Data Engineer',
    type: 'Enterprise Security & IoT',
    location: 'Boca Raton, FL',
    cloud: 'Azure',
    color: '#c9a227',
    highlights: [
      'Designed ETL/ELT pipelines with Azure Data Factory & Synapse Analytics for large-scale data ingestion and transformation',
      'Built real-time ingestion flows using Kafka and Spark Structured Streaming with sub-10s data delivery latency',
      'Implemented Medallion Architecture (Bronze/Silver/Gold) with Databricks DLT and Delta Lake',
      'Integrated Microsoft Fabric pipelines across OneLake & Lakehouse, centralizing data governance',
      'Built self-service transformation UI wrappers for non-technical users, reducing engineering dependency',
      'Led analytics team onboarding to Lakehouse architecture with unified batch/streaming pipelines',
    ],
    technologies: ['Azure Data Factory', 'Synapse', 'Databricks', 'Kafka', 'Spark', 'Delta Lake', 'Power BI', 'Microsoft Fabric', 'PostgreSQL'],
  },
  {
    period: '2023 — 2024',
    role: 'AWS Data Engineer',
    type: 'Defense & Aerospace',
    location: 'Melbourne, FL',
    cloud: 'AWS',
    color: '#f39c12',
    highlights: [
      'Architected centralized Data Lake on S3 with lifecycle policies and intelligent tiering',
      'Designed ETL processes integrating multi-source datasets, reducing manual handling by 40%',
      'Built event-driven workflows using Step Functions, Lambda, and Glue for fault-tolerant orchestration',
      'Deployed real-time streaming pipelines using Apache Flink for clinical and operational analytics',
      'Automated transformation layers with dbt and Apache Airflow for SLA compliance',
      'Built predictive analytics pipelines with SageMaker for customer behavior insights',
    ],
    technologies: ['AWS Glue', 'Lambda', 'S3', 'Redshift', 'Step Functions', 'Flink', 'Airflow', 'dbt', 'Terraform', 'SageMaker'],
  },
  {
    period: '2020 — 2022',
    role: 'GCP Data Engineer',
    type: 'Global Communications & Advertising',
    location: 'Chennai, India',
    cloud: 'GCP',
    color: '#2ecc71',
    highlights: [
      'Built real-time and batch pipelines using Pub/Sub, Dataflow (Apache Beam), and BigQuery',
      'Implemented dynamic Dataproc cluster provisioning with autoscaling, optimizing GCP costs',
      'Built reusable PySpark pipeline wrappers, accelerating new dataset delivery by 40%',
      'Used dbt with BigQuery for scalable, version-controlled analytics layer with CI/CD',
      'Automated multi-step data operations using Cloud Workflows with serverless orchestration',
      'Supported CI/CD pipeline lifecycle with GitHub Actions and CloudWatch monitoring',
    ],
    technologies: ['BigQuery', 'Dataflow', 'Pub/Sub', 'Dataproc', 'Cloud Composer', 'PySpark', 'dbt', 'Beam', 'Cloud Functions'],
  },
  {
    period: '2018 — 2020',
    role: 'Data Engineer',
    type: 'Banking & Financial Services',
    location: 'Chennai, India',
    cloud: 'Multi-Cloud',
    color: '#00d4aa',
    highlights: [
      'Developed ETL pipelines with Python and Snowflake for data warehouse operations',
      'Built real-time processing with Kafka and Spark for streaming event data',
      'Automated AWS infrastructure with Terraform, reducing management time by 90%',
      'Optimized Elasticsearch clusters through shard tuning and query profiling',
      'Created streaming ingestion pipelines with Pub/Sub and Dataflow for real-time BI',
      'Managed data migration projects ensuring integrity across MongoDB and cloud databases',
    ],
    technologies: ['Snowflake', 'Kafka', 'Spark', 'Python', 'Terraform', 'Elasticsearch', 'Docker', 'Airflow', 'Kubernetes'],
  },
];

function TimelineNode({ color, isActive }) {
  return (
    <div style={{
      position: 'relative',
      width: '16px',
      height: '16px',
      flexShrink: 0,
    }}>
      <div style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: isActive ? color : 'var(--bg-surface)',
        border: `2px solid ${color}`,
        transition: 'all 0.4s ease',
        position: 'relative',
        zIndex: 2,
      }} />
      {isActive && (
        <div style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '50%',
          border: `1px solid ${color}`,
          opacity: 0.3,
          animation: 'pulse-ring 2s ease-out infinite',
        }} />
      )}
    </div>
  );
}

function CloudBadge({ cloud, color }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      letterSpacing: '1.5px',
      color: color,
      background: `${color}15`,
      padding: '4px 10px',
      borderRadius: '3px',
      border: `1px solid ${color}30`,
    }}>
      {cloud}
    </span>
  );
}

function ExperienceCard({ exp, index, isActive, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        display: 'flex',
        gap: '32px',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={onClick}
    >
      {/* Timeline track */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '4px',
      }}>
        <TimelineNode color={exp.color} isActive={isActive} />
        {index < experiences.length - 1 && (
          <div style={{
            width: '1px',
            flex: 1,
            background: `linear-gradient(to bottom, ${exp.color}40, var(--border))`,
            marginTop: '4px',
          }} />
        )}
      </div>

      {/* Card */}
      <div style={{
        flex: 1,
        paddingBottom: '48px',
      }}>
        <div style={{
          background: isActive ? 'var(--bg-card)' : 'transparent',
          border: `1px solid ${isActive ? exp.color + '25' : 'transparent'}`,
          borderRadius: '8px',
          padding: isActive ? '28px' : '28px 0',
          transition: 'all 0.4s ease',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                {exp.period}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 600,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'color 0.3s',
                marginBottom: '4px',
              }}>
                {exp.role}
              </h3>
              <div style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
              }}>
                {exp.type} &middot; {exp.location}
              </div>
            </div>
            <CloudBadge cloud={exp.cloud} color={exp.color} />
          </div>

          {/* Expandable content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ marginTop: '20px' }}>
                  {/* Highlights */}
                  <div style={{
                    display: 'grid',
                    gap: '12px',
                    marginBottom: '24px',
                  }}>
                    {exp.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: exp.color,
                          marginTop: '7px',
                          flexShrink: 0,
                          opacity: 0.7,
                        }} />
                        <span style={{
                          fontSize: '13px',
                          lineHeight: 1.6,
                          color: 'var(--text-secondary)',
                        }}>
                          {h}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}>
                    {exp.technologies.map((tech, i) => (
                      <span key={i} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        padding: '4px 8px',
                        background: 'var(--bg-elevated)',
                        borderRadius: '3px',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-label">EXPERIENCE</div>
        <h2 className="section-title">
          Building at scale,<br />
          <span style={{ color: 'var(--text-muted)' }}>across every major cloud</span>
        </h2>
      </motion.div>

      {/* Cloud journey bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          display: 'flex',
          gap: '2px',
          marginBottom: '56px',
          borderRadius: '4px',
          overflow: 'hidden',
          height: '4px',
          background: 'var(--bg-elevated)',
        }}
      >
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            style={{
              flex: i === 0 ? 2 : i === 3 ? 2.5 : 1.5,
              background: exp.color,
              opacity: activeIndex === i ? 1 : 0.25,
              transition: 'opacity 0.4s',
              cursor: 'pointer',
            }}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </motion.div>

      {/* Timeline */}
      <div style={{ maxWidth: '800px' }}>
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={i}
            exp={exp}
            index={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
