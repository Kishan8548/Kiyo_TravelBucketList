import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

/* ── Animated progress bar ── */
function AnimatedBar({ pct, color = 'var(--green)' }) {
  return (
    <div style={{ height: 5, borderRadius: 99, background: 'var(--line-cool)', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        style={{ height: '100%', borderRadius: 99, background: color }}
      />
    </div>
  );
}

/* ── Animated stat number ── */
function StatCard({ value, label, sub, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', background: '#fff' }}
    >
      <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.72px', color: 'var(--ink)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginTop: 8 }}>{label}</div>
      {sub && <div style={{ fontSize: 13, color: 'var(--ink-mute)', marginTop: 2 }}>{sub}</div>}
    </motion.div>
  );
}

export default function Dashboard() {
  const bucketList = useSelector(s => s.bucketList.destinations);
  const visited    = useSelector(s => s.visited.places);

  const total = bucketList.length + visited.length;
  const pct   = total > 0 ? Math.round((visited.length / total) * 100) : 0;

  const allPlaces    = [...bucketList, ...visited];
  const regionCounts = allPlaces.reduce((acc, p) => { if (p.region) acc[p.region] = (acc[p.region] || 0) + 1; return acc; }, {});
  const topRegions   = Object.entries(regionCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const priorityCounts = bucketList.reduce((acc, p) => {
    acc[p.priority || 'medium'] = (acc[p.priority || 'medium'] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--line-cool)', background: 'var(--canvas-soft)' }}>
        <div className="container" style={{ padding: '32px 24px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.42px', color: 'var(--ink)', marginBottom: 6 }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Your travel stats at a glance</p>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>

        {/* Stat cards — staggered */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <StatCard value={bucketList.length} label="Dreaming of"   sub="destinations" delay={0} />
          <StatCard value={visited.length}    label="Visited"        sub="confirmed"    delay={0.06} />
          <StatCard value={`${pct}%`}         label="Progress"       sub="of all tracked" delay={0.12} />
          <StatCard value={Object.keys(regionCounts).length} label="Regions" sub="worldwide" delay={0.18} />
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.22 }}
          style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', background: '#fff', marginBottom: 16 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Overall travel progress</span>
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ fontSize: 14, fontWeight: 600, color: '#24b47e' }}
            >
              {pct}%
            </motion.span>
          </div>
          <AnimatedBar pct={pct} color="#3ecf8e" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{visited.length} visited</span>
            <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{bucketList.length} remaining</span>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {/* Regions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.26 }}
            style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', background: '#fff' }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>By region</h3>
            {topRegions.length === 0
              ? <p style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Add destinations to see breakdown.</p>
              : <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {topRegions.map(([region, count], i) => {
                    const w = Math.round((count / topRegions[0][1]) * 100);
                    return (
                      <div key={region}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{region}</span>
                          <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{count}</span>
                        </div>
                        <AnimatedBar pct={w} color="#3ecf8e" />
                      </div>
                    );
                  })}
                </div>
            }
          </motion.div>

          {/* Priority */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', background: '#fff' }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Bucket list by priority</h3>
            {bucketList.length === 0
              ? <p style={{ fontSize: 13, color: 'var(--ink-mute)' }}>No bucket list items yet.</p>
              : <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { key: 'high',   label: 'High',   color: '#ef4444' },
                    { key: 'medium', label: 'Medium', color: '#f59e0b' },
                    { key: 'low',    label: 'Low',    color: '#94a3b8' },
                  ].map(p => {
                    const c = priorityCounts[p.key] || 0;
                    const w = bucketList.length ? Math.round((c / bucketList.length) * 100) : 0;
                    return (
                      <div key={p.key}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500 }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
                            {p.label}
                          </span>
                          <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{c}</span>
                        </div>
                        <AnimatedBar pct={w} color={p.color} />
                      </div>
                    );
                  })}
                </div>
            }
          </motion.div>
        </div>

        {/* Recent visited */}
        {visited.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.34 }}
            style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', background: '#fff', marginBottom: 16 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600 }}>Recently visited</h3>
              <Link to="/visited" style={{ fontSize: 13, color: '#24b47e', fontWeight: 500 }}>View all →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {visited.slice(0, 5).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.38 + i * 0.05 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < Math.min(visited.length, 5) - 1 ? '1px solid var(--line-cool)' : 'none' }}
                >
                  {p.flagUrl
                    ? <img src={p.flagUrl} alt="flag" style={{ height: 18, borderRadius: 2, border: '1px solid var(--line)', flexShrink: 0 }} />
                    : <div style={{ width: 26, height: 18, borderRadius: 2, background: 'var(--line-cool)', flexShrink: 0 }} />
                  }
                  <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{p.city || p.country}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-mute)' }}>{p.country}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-faint)', flexShrink: 0 }}>
                    {p.visitedAt ? new Date(p.visitedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty */}
        {total === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', padding: '80px 24px', border: '1px solid var(--line-cool)', borderRadius: 'var(--r-lg)', background: 'var(--canvas-soft)' }}
          >
            <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>No data yet</p>
            <p style={{ fontSize: 13, color: 'var(--ink-mute)', marginBottom: 20 }}>Add destinations to see your travel stats here.</p>
            <Link to="/bucket" className="btn-green"><Plus size={14} /> Add destinations</Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
