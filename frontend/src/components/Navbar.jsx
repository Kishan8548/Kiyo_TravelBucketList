import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Plane } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

const NAV_LINKS = [
  { to: '/bucket',    label: 'Bucket List' },
  { to: '/visited',   label: 'Visited' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/map',       label: 'Map' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => { dispatch(logout()); navigate('/login'); setOpen(false); };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--line-cool)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: '60px', gap: '32px' }}>

        {/* ── Logo ── */}
        <NavLink to="/" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Plane size={14} color="#fff" strokeWidth={2} />
          </div>
          <span style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.3px', color: 'var(--ink)' }}>
            Next<span style={{ color: '#24b47e' }}>Stop</span>
          </span>
        </NavLink>

        {/* ── Desktop nav ── */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to}
              style={({ isActive }) => ({
                fontSize: '14px', fontWeight: 500, padding: '6px 10px',
                borderRadius: 'var(--r-sm)',
                color: isActive ? 'var(--ink)' : 'var(--ink-mute)',
                background: isActive ? 'var(--canvas-soft)' : 'transparent',
                transition: 'all 0.15s',
                border: isActive ? '1px solid var(--line-cool)' : '1px solid transparent',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── Desktop auth buttons ── */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          {isAuthenticated ? (
            <>
              <span style={{ fontSize: 13, color: 'var(--ink-mute)' }}>{user?.name?.split(' ')[0]}</span>
              <button className="btn-outline" style={{ fontSize: 13, padding: '6px 12px' }} onClick={handleLogout}>Sign out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn-link" style={{ fontSize: 14 }}>Sign in</NavLink>
              <NavLink to="/login" className="btn-green">Start for free</NavLink>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(o => !o)}
          className="nav-mobile-toggle"
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', display: 'none', padding: 8, borderRadius: 6 }}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* ── Mobile menu — AnimatePresence slide down ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden', borderTop: '1px solid var(--line-cool)', background: 'var(--canvas)' }}
          >
            <div style={{ padding: '12px 16px 20px' }}>
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.18 }}
                >
                  <NavLink to={to} onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      display: 'flex', alignItems: 'center', padding: '12px 4px',
                      fontSize: 15, fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--ink)' : 'var(--ink-mute)',
                      borderBottom: '1px solid var(--line-cool)',
                    })}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <div style={{ paddingTop: 16, display: 'flex', gap: 8 }}>
                {isAuthenticated
                  ? <button className="btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={handleLogout}>Sign out</button>
                  : <NavLink to="/login" className="btn-green" onClick={() => setOpen(false)} style={{ flex: 1, justifyContent: 'center' }}>Start for free</NavLink>
                }
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
