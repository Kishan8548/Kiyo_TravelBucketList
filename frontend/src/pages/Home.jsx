import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { ArrowRight, Check, Globe, MapPin, BarChart2, Star } from 'lucide-react';

const MOCK_ROWS = [
  { flag: '🇯🇵', name: 'Tokyo',        country: 'Japan',       priority: 'high',   status: 'dreaming' },
  { flag: '🇫🇷', name: 'Paris',        country: 'France',      priority: 'high',   status: 'visited'  },
  { flag: '🇮🇩', name: 'Bali',         country: 'Indonesia',   priority: 'medium', status: 'visited'  },
  { flag: '🇬🇷', name: 'Santorini',    country: 'Greece',      priority: 'high',   status: 'dreaming' },
  { flag: '🇳🇿', name: 'Queenstown',   country: 'New Zealand', priority: 'medium', status: 'dreaming' },
  { flag: '🇵🇪', name: 'Machu Picchu', country: 'Peru',        priority: 'high',   status: 'dreaming' },
];

const PRIORITY_DOT = { high: '#ef4444', medium: '#f59e0b', low: '#94a3b8' };

function ProductMockup() {
  return (
    <div style={{
      width: '100%', maxWidth: '660px', flexShrink: 0,
      background: '#fff', border: '1px solid #e5e7eb',
      borderRadius: '14px', overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(0,0,0,0.03), 0 20px 60px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)',
    }}>
      {/* Browser chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 16px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, padding: '3px 12px', fontSize: 11, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ opacity: 0.5 }}>●</span> nextstop.app/bucket
          </div>
        </div>
        <div style={{ width: 52 }} />
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderBottom: '1px solid #f3f4f6', background: '#fff' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>bucket_list</span>
          <span style={{ fontSize: 11, color: '#888', background: '#f5f5f5', padding: '1px 7px', borderRadius: 99, border: '1px solid #e5e7eb' }}>6 rows</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ height: 26, width: 64, background: '#f5f5f5', borderRadius: 5, border: '1px solid #e5e7eb' }} />
          <div style={{ height: 26, width: 26, background: '#3ecf8e', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#111' }}>+</div>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
            {['#','city','country','priority','status'].map(h => (
              <th key={h} style={{ padding: '7px 14px', textAlign: 'left', fontWeight: 500, color: '#999', fontSize: 11, borderRight: '1px solid #f3f4f6', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MOCK_ROWS.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f9fafb', cursor: 'default', transition: 'background 0.1s' }}
              onMouseOver={e => e.currentTarget.style.background = '#f0fdf7'}
              onMouseOut={e => e.currentTarget.style.background = ''}>
              <td style={{ padding: '8px 14px', color: '#ccc', fontFamily: 'monospace', fontSize: 10, borderRight: '1px solid #f3f4f6', width: 32 }}>{i+1}</td>
              <td style={{ padding: '8px 14px', borderRight: '1px solid #f3f4f6', fontWeight: 600, color: '#111', whiteSpace: 'nowrap' }}>
                <span style={{ marginRight: 7 }}>{row.flag}</span>{row.name}
              </td>
              <td style={{ padding: '8px 14px', borderRight: '1px solid #f3f4f6', color: '#666' }}>{row.country}</td>
              <td style={{ padding: '8px 14px', borderRight: '1px solid #f3f4f6' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: PRIORITY_DOT[row.priority], display: 'inline-block' }} />
                  <span style={{ color: '#555' }}>{row.priority}</span>
                </span>
              </td>
              <td style={{ padding: '8px 14px' }}>
                {row.status === 'visited'
                  ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>✓ visited</span>
                  : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 500, background: '#fafafa', color: '#888', border: '1px solid #e5e7eb' }}>✈ dreaming</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination bar */}
      <div style={{ padding: '8px 14px', background: '#fafafa', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#aaa' }}>6 of 14 destinations</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {[1,2,3].map(n => <div key={n} style={{ width: 22, height: 22, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, background: n===1 ? '#111':'#f5f5f5', color: n===1?'#fff':'#999', border: '1px solid #e5e7eb' }}>{n}</div>)}
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Globe,     title: 'Bucket list management',  desc: 'Add destinations with live country data, flags, and coordinates from the REST Countries API — no manual entry.' },
  { icon: Check,     title: 'Personal travel journal',  desc: 'Mark places as visited and build a timeline of everywhere you\'ve been, grouped by year.' },
  { icon: BarChart2, title: 'Stats that motivate',      desc: 'See your progress visually — regions explored, priority breakdown, and % toward your travel goals.' },
  { icon: MapPin,    title: 'Live world map',           desc: 'Every destination pinned on a Leaflet map. Dreaming in violet, visited in green.' },
];

const USED_BY = ['Frequent Flyers', 'Gap Year Planners', 'Travel Bloggers', 'Remote Workers', 'Backpackers'];

export default function Home() {
  const bucketCount  = useSelector(s => s.bucketList.destinations.length);
  const visitedCount = useSelector(s => s.visited.places.length);
  const totalPlaces  = bucketCount + visitedCount;

  return (
    <div>
      {/* Announcement bar */}
      <div style={{ background: '#f9fafb', borderBottom: '1px solid var(--line-cool)', padding: '9px 0', textAlign: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--ink-mute)' }}>
          ✦ REST Countries API · Leaflet Maps · JWT-ready auth ·{' '}
          <Link to="/bucket" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2 }}>
            Start tracking →
          </Link>
        </span>
      </div>

      {/* Hero */}
      <section style={{ padding: '72px 0 80px', borderBottom: '1px solid var(--line-cool)' }}>
        <div className="container">
          <div className="hero-layout" style={{ display: 'flex', alignItems: 'flex-start', gap: '80px', flexWrap: 'wrap' }}>

            {/* Copy */}
            <div className="hero-copy" style={{ flex: '1 1 320px', maxWidth: 500, paddingTop: 8 }}>

              <div style={{ marginBottom: 20 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--ink-mute)', background: '#f5f5f5', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: 99 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3ecf8e', display: 'inline-block' }} />
                  Travel bucket list app
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(42px, 5vw, 62px)', fontWeight: 500, lineHeight: 1.08, letterSpacing: '-2px', color: 'var(--ink)', marginBottom: 22 }}>
                Your next stop<br />
                <span style={{ color: '#3ecf8e' }}>starts here.</span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-mute)', marginBottom: 36, maxWidth: 420 }}>
                One place to save dream destinations, log visited places,
                and track your travel progress on a live world map.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/bucket" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#3ecf8e', color: '#171717', fontSize: 14, fontWeight: 600, padding: '10px 22px', borderRadius: 7, textDecoration: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}
                    onMouseOver={e => e.currentTarget.style.background = '#24b47e'}
                    onMouseOut={e => e.currentTarget.style.background = '#3ecf8e'}
                  >
                    Start for free <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: 'var(--ink-mute)', fontSize: 14, fontWeight: 500, padding: '10px 16px', borderRadius: 7, textDecoration: 'none', border: '1px solid var(--line)', transition: 'border-color 0.15s, color 0.15s' }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = '#aaa'; e.currentTarget.style.color = 'var(--ink)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--ink-mute)'; }}
                  >
                    View dashboard
                  </Link>
                </motion.div>
              </motion.div>

              {/* Social proof */}
              <div className="social-proof-strip" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex' }}>
                  {['#c7d2fe','#fde68a','#a7f3d0','#fca5a5'].map((c, i) => (
                    <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i === 0 ? 0 : -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#555' }}>
                      {['K','P','L','R'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                    {[1,2,3,4,5].map(n => <Star key={n} size={11} fill="#f59e0b" stroke="none" />)}
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>
                    Used by <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>travel enthusiasts</strong> worldwide
                  </span>
                </div>
              </div>

              {/* Live stats */}
              {totalPlaces > 0 && (
                <div style={{ display: 'flex', gap: 28, marginTop: 32, paddingTop: 28, borderTop: '1px solid var(--line-cool)' }}>
                  {[
                    { val: bucketCount,  label: 'Dreaming of' },
                    { val: visitedCount, label: 'Visited' },
                    { val: `${bucketCount > 0 ? Math.round((visitedCount/(bucketCount+visitedCount))*100) : 0}%`, label: 'Progress' },
                  ].map(({ val, label }) => (
                    <div key={label}>
                      <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.5px', color: 'var(--ink)', lineHeight: 1 }}>{val}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 4 }}>{label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product mockup */}
            <div className="hero-mockup" style={{ flex: '1 1 340px', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
              <ProductMockup />
            </div>

          </div>
        </div>
      </section>

      {/* Used-by strip */}
      <section style={{ padding: '28px 0', borderBottom: '1px solid var(--line-cool)', background: '#fafafa' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>Used by</span>
            {USED_BY.map(name => (
              <span key={name} style={{ fontSize: 14, fontWeight: 600, color: '#c0c0c0', letterSpacing: '-0.2px' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '96px 0', borderBottom: '1px solid var(--line-cool)' }}>
        <div className="container">
          <div style={{ maxWidth: 520, marginBottom: 64 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Features</p>
            <h2 style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.72px', lineHeight: 1.15, marginBottom: 16, color: 'var(--ink)' }}>
              Everything you need.<br />Nothing you don't.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--ink-mute)', lineHeight: 1.6 }}>
              Built lean for travelers who want one organised, beautiful place — not another bloated app.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px 48px' }}>
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f5f5f5', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} style={{ color: 'var(--ink-mute)' }} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.1px' }}>{title}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-mute)', lineHeight: 1.65 }}>{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API section */}
      <section style={{ padding: '96px 0', borderBottom: '1px solid var(--line-cool)', background: '#fafafa' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '72px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 280px', maxWidth: 440 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>REST Countries API</p>
              <h2 style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 16, color: 'var(--ink)' }}>
                Auto-fill destination data.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--ink-mute)', lineHeight: 1.7, marginBottom: 28 }}>
                Type a country name. We pull the flag, capital, region, and map coordinates automatically.
                No copy-pasting. No manual entry. Just search and add.
              </p>
              <Link to="/bucket" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#3ecf8e', color: '#171717', fontSize: 14, fontWeight: 600, padding: '9px 20px', borderRadius: 7, textDecoration: 'none' }}
                onMouseOver={e => e.currentTarget.style.background = '#24b47e'}
                onMouseOut={e => e.currentTarget.style.background = '#3ecf8e'}
              >
                Try it now →
              </Link>
            </div>

            {/* Code block */}
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ background: '#1c1c1c', borderRadius: 10, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
                  <span style={{ marginLeft: 8, fontSize: 11, color: '#555', fontFamily: 'monospace' }}>fetchCountry.js</span>
                </div>
                <div style={{ padding: '18px 20px', fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace", fontSize: 13, lineHeight: 1.7 }}>
                  <div style={{ color: '#6b7280' }}>{'// One click → full destination data'}</div>
                  <br />
                  <div>
                    <span style={{ color: '#3ecf8e' }}>const</span>
                    <span style={{ color: '#a5b4fc' }}> res </span>
                    <span style={{ color: '#e2e8f0' }}>= </span>
                    <span style={{ color: '#3ecf8e' }}>await </span>
                    <span style={{ color: '#e2e8f0' }}>fetch(</span>
                  </div>
                  <div style={{ paddingLeft: 16, color: '#fbbf24' }}>{`\`restcountries.com/v3.1/`}</div>
                  <div style={{ paddingLeft: 16, color: '#fbbf24' }}>{'  name/${query}\`'}</div>
                  <div style={{ color: '#e2e8f0' }}>{')'}</div>
                  <br />
                  <div style={{ color: '#94a3b8' }}>{'// Returns: flag, capital, region, latlng'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ padding: '96px 0', background: '#111' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="cta-band-text" style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-1.2px', color: '#fff', marginBottom: 20, lineHeight: 1.1 }}>
            Start building your<br />bucket list today.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', marginBottom: 40, maxWidth: 420, margin: '0 auto 40px' }}>
            Free forever. No account needed to start.
          </p>
          <Link to="/bucket" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#3ecf8e', color: '#111', fontSize: 15, fontWeight: 700, padding: '13px 28px', borderRadius: 8, textDecoration: 'none', boxShadow: '0 0 0 1px rgba(62,207,142,0.4), 0 4px 20px rgba(62,207,142,0.25)' }}
            onMouseOver={e => e.currentTarget.style.background = '#24b47e'}
            onMouseOut={e => e.currentTarget.style.background = '#3ecf8e'}
          >
            Get started — it's free <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
          <p style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>No credit card. No sign-up required.</p>
        </div>
      </section>

    </div>
  );
}
