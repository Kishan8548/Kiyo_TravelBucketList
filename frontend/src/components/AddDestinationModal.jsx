import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { addDestination } from '../redux/slices/bucketListSlice';
import toast from 'react-hot-toast';

const REGIONS    = ['Africa','Americas','Asia','Europe','Oceania','Antarctic'];
const PRIORITIES = [
  { value: 'high',   label: 'High',   dot: '#ef4444' },
  { value: 'medium', label: 'Medium', dot: '#f59e0b' },
  { value: 'low',    label: 'Low',    dot: '#94a3b8' },
];

export default function AddDestinationModal({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm]       = useState({ country: '', city: '', region: '', priority: 'medium', notes: '', flagUrl: '' });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  /* ── Lock body scroll ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ── Escape to close ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const fetchCountry = async () => {
    if (!form.country.trim()) return;
    setLoading(true);
    try {
      const res  = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(form.country)}?fields=name,flags,capital,region,latlng`);
      const data = await res.json();
      if (data?.[0]) {
        const c = data[0];
        setForm(f => ({ ...f, flagUrl: c.flags?.png || '', region: c.region || f.region, city: f.city || c.capital?.[0] || '', latlng: c.latlng }));
        toast.success(`Found ${c.name.common}`);
      } else toast.error('Country not found');
    } catch { toast.error('Failed to fetch'); }
    finally { setLoading(false); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.country.trim()) return toast.error('Country is required');
    dispatch(addDestination(form));
    toast.success(`${form.city || form.country} added ✓`);
    onClose();
  };

  return (
    /* ── Backdrop — fades in ── */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }}
    >
      {/* ── Modal panel — scales + fades in ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1,    y: 0 }}
        exit={{    opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          width: '100%', maxWidth: '460px',
          background: '#fff',
          borderRadius: '14px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.03), 0 24px 64px rgba(0,0,0,0.14)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 22px 16px', borderBottom: '1px solid #f3f4f6' }}>
          <div>
            <h2 id="modal-title" style={{ fontSize: 16, fontWeight: 600, color: '#111', letterSpacing: '-0.2px', margin: 0 }}>
              Add destination
            </h2>
            <p style={{ fontSize: 13, color: '#888', marginTop: 3, marginBottom: 0 }}>
              Type a country then hit <strong style={{ color: '#555', fontWeight: 600 }}>Auto-fill</strong> to pull flag &amp; data
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={onClose}
            aria-label="Close"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: '2px', borderRadius: 6, lineHeight: 1 }}
          >
            <X size={18} />
          </motion.button>
        </div>

        {/* Body */}
        <form id="add-dest-form" onSubmit={handleSubmit}>
          <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Country + auto-fill */}
            <div>
              <label style={LBL}>Country *</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  className="input" style={{ flex: 1, fontSize: 14 }}
                  placeholder="e.g. Japan"
                  value={form.country}
                  onChange={e => set('country', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), fetchCountry())}
                  autoFocus
                />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={fetchCountry}
                  disabled={loading}
                  style={{
                    flexShrink: 0, padding: '0 14px', height: 38, borderRadius: 7,
                    border: '1px solid #e5e7eb',
                    background: loading ? '#f9fafb' : '#fff',
                    fontSize: 13, fontWeight: 600, color: '#333',
                    cursor: loading ? 'wait' : 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {loading ? '…' : 'Auto-fill'}
                </motion.button>
              </div>
            </div>

            {/* Flag preview — AnimatePresence so it slides in */}
            <AnimatePresence>
              {form.flagUrl && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                  exit={{    opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, background: '#f0fdf7', border: '1px solid #bbf7d0' }}>
                    <img src={form.flagUrl} alt="flag" style={{ height: 18, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{form.country}</span>
                    {form.region && <span style={{ marginLeft: 'auto', fontSize: 12, color: '#15803d', fontWeight: 500 }}>{form.region}</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* City + Region — 2 col */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={LBL}>City / Place</label>
                <input className="input" style={{ fontSize: 14 }} placeholder="e.g. Tokyo"
                  value={form.city} onChange={e => set('city', e.target.value)} />
              </div>
              <div>
                <label style={LBL}>Region</label>
                <select className="input" style={{ fontSize: 14 }}
                  value={form.region} onChange={e => set('region', e.target.value)}>
                  <option value="">Select…</option>
                  {REGIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label style={LBL}>Priority</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {PRIORITIES.map(p => (
                  <motion.button
                    key={p.value}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => set('priority', p.value)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      height: 36, borderRadius: 7, border: '1px solid',
                      borderColor: form.priority === p.value ? `${p.dot}60` : '#e5e7eb',
                      background: form.priority === p.value ? `${p.dot}10` : '#fff',
                      fontSize: 13, fontWeight: 500, color: '#333',
                      cursor: 'pointer', transition: 'border-color 0.12s, background 0.12s',
                    }}
                  >
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: p.dot, display: 'inline-block', flexShrink: 0 }} />
                    {p.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={LBL}>Notes <span style={{ fontWeight: 400, color: '#bbb' }}>— optional</span></label>
              <textarea
                className="input" rows={3}
                style={{ resize: 'vertical', fontFamily: 'inherit', fontSize: 14, lineHeight: 1.55 }}
                placeholder="Why do you want to visit? Best time of year, things to see..."
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', gap: 8, padding: '14px 22px', borderTop: '1px solid #f3f4f6', background: '#fafafa', borderRadius: '0 0 14px 14px' }}>
            <motion.button
              type="button" whileTap={{ scale: 0.97 }} onClick={onClose}
              style={{ flex: 1, height: 38, borderRadius: 7, border: '1px solid #e5e7eb', background: '#fff', fontSize: 14, fontWeight: 500, color: '#555', cursor: 'pointer' }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit" whileTap={{ scale: 0.97 }}
              style={{ flex: 2, height: 38, borderRadius: 7, border: 'none', background: '#3ecf8e', fontSize: 14, fontWeight: 600, color: '#111', cursor: 'pointer' }}
              whileHover={{ background: '#24b47e' }}
            >
              Add destination
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

const LBL = { display: 'block', fontSize: 13, fontWeight: 500, color: '#444', marginBottom: 5 };
