import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Layout from './components/Layout';
import Home       from './pages/Home';
import BucketList from './pages/BucketList';
import Visited    from './pages/Visited';
import Dashboard  from './pages/Dashboard';
import MapView    from './pages/MapView';
import Login      from './pages/Login';

/* ── Page transition variant ──
   Principle: pages slide up 16px and fade in.
   Fast (0.25s) — orientation, not spectacle.
*/
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"          element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/bucket"    element={<PageWrapper><BucketList /></PageWrapper>} />
          <Route path="/visited"   element={<PageWrapper><Visited /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/map"       element={<PageWrapper><MapView /></PageWrapper>} />
          <Route path="/login"     element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="*"          element={
            <PageWrapper>
              <div style={{ textAlign: 'center', padding: '120px 24px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
                <h2 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.3px', marginBottom: 8 }}>404 — Lost in transit</h2>
                <p style={{ color: 'var(--ink-mute)', fontSize: 15 }}>This destination doesn&apos;t exist.</p>
                <a href="/" className="btn-green" style={{ display: 'inline-flex', marginTop: 24 }}>Go home</a>
              </div>
            </PageWrapper>
          } />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
