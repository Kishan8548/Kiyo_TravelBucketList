import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import AddDestinationModal from '../components/AddDestinationModal';
import { setFilter, setSearchQuery } from '../redux/slices/bucketListSlice';

const FILTER_OPTIONS = [
  { value: 'all',    label: 'All' },
  { value: 'high',   label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low',    label: 'Low' },
];
const REGIONS = ['All regions','Africa','Americas','Asia','Europe','Oceania'];

export default function BucketList() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [region, setRegion]       = useState('All regions');
  const { destinations, filter, searchQuery } = useSelector(s => s.bucketList);

  const filtered = destinations.filter(d => {
    const q = searchQuery.toLowerCase();
    const matchQ = !q || d.country.toLowerCase().includes(q) || (d.city || '').toLowerCase().includes(q);
    const matchP = filter === 'all' || d.priority === filter;
    const matchR = region === 'All regions' || d.region === region;
    return matchQ && matchP && matchR;
  });

  return (
    <div>
      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--line-cool)', background: 'var(--canvas-soft)' }}>
        <div className="container" style={{ padding: '32px 24px' }}>
          <div className="page-header-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.42px', color: 'var(--ink)', marginBottom: 6 }}>Bucket list</h1>
              <p style={{ fontSize: 13, color: 'var(--ink-mute)' }}>
                {destinations.length} destination{destinations.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            <motion.button
              className="btn-green"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowModal(true)}
            >
              <Plus size={14} /> Add destination
            </motion.button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Filter bar */}
        <div className="filter-bar" style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: 200 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-faint)', pointerEvents: 'none' }} />
            <input className="input" style={{ paddingLeft: 32, fontSize: 14 }}
              placeholder="Search destinations…"
              value={searchQuery} onChange={e => dispatch(setSearchQuery(e.target.value))} />
          </div>

          {/* Segmented control */}
          <div style={{ display: 'flex', background: 'var(--canvas-soft)', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', padding: 3 }}>
            {FILTER_OPTIONS.map(opt => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.94 }}
                onClick={() => dispatch(setFilter(opt.value))}
                style={{
                  padding: '5px 12px', border: 'none', borderRadius: 4, cursor: 'pointer',
                  fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
                  background: filter === opt.value ? '#fff' : 'transparent',
                  color: filter === opt.value ? 'var(--ink)' : 'var(--ink-mute)',
                  boxShadow: filter === opt.value ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>

          <select className="input" style={{ width: 'auto', fontSize: 13, padding: '7px 10px' }}
            value={region} onChange={e => setRegion(e.target.value)}>
            {REGIONS.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>

        {/* Count */}
        {destinations.length > 0 && (
          <p style={{ fontSize: 13, color: 'var(--ink-mute)', marginBottom: 20 }}>
            Showing {filtered.length} of {destinations.length}
          </p>
        )}

        {/* Grid — AnimatePresence for smooth add/remove */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '80px 24px', border: '1px solid var(--line-cool)', borderRadius: 'var(--r-lg)', background: 'var(--canvas-soft)' }}
          >
            <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>
              {destinations.length === 0 ? 'No destinations yet' : 'No results'}
            </p>
            <p style={{ fontSize: 13, color: 'var(--ink-mute)', marginBottom: 20 }}>
              {destinations.length === 0 ? 'Add places you dream of visiting to get started.' : 'Try adjusting your search or filters.'}
            </p>
            {destinations.length === 0 && (
              <motion.button whileTap={{ scale: 0.97 }} className="btn-green" onClick={() => setShowModal(true)}>
                <Plus size={14} /> Add your first destination
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((d, i) => (
                <DestinationCard key={d.id} destination={d} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {showModal && <AddDestinationModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
