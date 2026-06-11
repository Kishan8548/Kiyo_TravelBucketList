import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';

export default function Visited() {
  const places = useSelector(s => s.visited.places);

  const grouped = places.reduce((acc, p) => {
    const year = p.visitedAt ? new Date(p.visitedAt).getFullYear() : 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(p);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => b - a);

  const regions = [...new Set(places.map(p => p.region).filter(Boolean))];

  return (
    <div>
      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--line-cool)', background: 'var(--canvas-soft)' }}>
        <div className="container" style={{ padding: '32px 24px' }}>
          <h1 className="display-md" style={{ marginBottom: '6px' }}>Visited places</h1>
          <p className="caption">Your personal travel journal</p>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Stats row */}
        {places.length > 0 && (
          <div style={{ display: 'flex', gap: '32px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--line-cool)', flexWrap: 'wrap' }}>
            {[
              { val: places.length,  label: 'Places visited' },
              { val: regions.length, label: 'Regions explored' },
              { val: years.length,   label: 'Years of travel' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '-0.72px', color: 'var(--ink)', lineHeight: 1 }}>{val}</div>
                <div className="caption" style={{ marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {places.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', border: '1px solid var(--line-cool)', borderRadius: 'var(--r-lg)', background: 'var(--canvas-soft)' }}>
            <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>No visited places yet</p>
            <p className="caption">Add destinations to your bucket list and mark them as visited when you go.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {years.map(year => (
              <div key={year}>
                {/* Year label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '13px', fontWeight: 600, color: 'var(--ink)',
                    paddingRight: '12px', borderRight: '1px solid var(--line)',
                  }}>
                    <Calendar size={13} style={{ color: 'var(--ink-mute)' }} />
                    {year}
                  </div>
                  <span className="caption">{grouped[year].length} place{grouped[year].length !== 1 ? 's' : ''}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                  {grouped[year].map(p => <DestinationCard key={p.id} destination={p} isVisited />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
