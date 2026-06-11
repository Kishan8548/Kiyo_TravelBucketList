import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'motion/react';
import { Trash2, CheckCircle, RotateCcw, Calendar } from 'lucide-react';
import { removeDestination } from '../redux/slices/bucketListSlice';
import { markVisited, unmarkVisited } from '../redux/slices/visitedSlice';
import toast from 'react-hot-toast';

const PRIORITY_DOT = { high: '#ef4444', medium: '#f59e0b', low: '#94a3b8' };

export default function DestinationCard({ destination, isVisited = false, index = 0 }) {
  const dispatch = useDispatch();
  const { id, country, city, region, priority, notes, flagUrl, createdAt, visitedAt } = destination;

  const handleRemove = () => {
    if (isVisited) dispatch(unmarkVisited(id));
    else dispatch(removeDestination(id));
    toast.success(`Removed ${city || country}`);
  };

  const handleMarkVisited = () => {
    dispatch(markVisited(destination));
    dispatch(removeDestination(id));
    toast.success(`Marked ${city || country} as visited ✓`);
  };

  const handleUnvisit = () => {
    dispatch(unmarkVisited(id));
    toast(`${city || country} moved back to bucket list`);
  };

  const dateLabel = isVisited ? visitedAt : createdAt;

  return (
    <motion.div
      /* ── Staggered entrance ── */
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      /* ── Hover lift ── */
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', borderColor: '#c7c7c7' }}
      /* ── Layout animate for reorder ── */
      layout
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        willChange: 'transform',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '14px 16px 12px',
        borderBottom: '1px solid var(--line-cool)',
        background: 'var(--canvas-soft)',
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        {flagUrl
          ? <img src={flagUrl} alt="flag" style={{ height: 20, borderRadius: 3, flexShrink: 0, border: '1px solid var(--line)', marginTop: 1 }} />
          : <div style={{ width: 28, height: 20, borderRadius: 3, background: 'var(--line-cool)', flexShrink: 0 }} />
        }
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
            {city || country}
          </div>
          {city && <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>{country}</div>}
        </div>
        {isVisited && (
          <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 7px', borderRadius: 99, background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', flexShrink: 0 }}>
            ✓ visited
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '12px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {priority && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--ink-mute)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: PRIORITY_DOT[priority], display: 'inline-block' }} />
              {priority}
            </span>
          )}
          {region && (
            <span style={{ fontSize: 11, padding: '1px 7px', borderRadius: 99, background: 'var(--canvas-soft)', color: 'var(--ink-mute)', border: '1px solid var(--line-cool)' }}>
              {region}
            </span>
          )}
        </div>

        {notes && (
          <p style={{ fontSize: 13, color: 'var(--ink-mute)', lineHeight: 1.5, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {notes}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 'auto', fontSize: 12, color: 'var(--ink-faint)' }}>
          <Calendar size={11} />
          {isVisited ? 'Visited' : 'Added'}{' '}
          {dateLabel ? new Date(dateLabel).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
        </div>
      </div>

      {/* Footer actions */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--line-cool)', display: 'flex', gap: 8 }}>
        {isVisited ? (
          <motion.button whileTap={{ scale: 0.96 }} onClick={handleUnvisit}
            style={BTN_OUTLINE_STYLE}>
            <RotateCcw size={12} /> Unmark
          </motion.button>
        ) : (
          <motion.button whileTap={{ scale: 0.96 }} onClick={handleMarkVisited}
            style={{ ...BTN_STYLE, flex: 1, justifyContent: 'center', fontSize: 12, padding: '6px 10px', background: '#3ecf8e', color: '#111', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}
            whileHover={{ background: '#24b47e' }}>
            <CheckCircle size={12} /> Mark visited
          </motion.button>
        )}
        <motion.button whileTap={{ scale: 0.93 }} onClick={handleRemove}
          style={{ padding: '6px 10px', fontSize: 12, color: '#ef4444', borderColor: '#fecaca', background: '#fff', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
          <Trash2 size={12} />
        </motion.button>
      </div>
    </motion.div>
  );
}

const BTN_STYLE = { flex: 1, justifyContent: 'center', fontSize: 12, padding: '6px 10px', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 };
const BTN_OUTLINE_STYLE = { ...BTN_STYLE, background: '#fff', color: '#555', border: '1px solid #e5e7eb', flex: 1 };
