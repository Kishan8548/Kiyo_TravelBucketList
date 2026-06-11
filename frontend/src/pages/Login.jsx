import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { demoLogin, loginStart, loginFailure } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(s => s.auth);
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    dispatch(loginFailure('Backend not connected yet. Use "Continue as guest" below.'));
  };

  const handleDemo = () => {
    dispatch(demoLogin());
    toast.success('Signed in as demo user');
    navigate('/');
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--canvas-night)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: 'white' }}>✈</div>
            <span style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.3px' }}>
              Next<span style={{ color: 'var(--green-deep)' }}>Stop</span>
            </span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 500, letterSpacing: '-0.3px', color: 'var(--ink)', marginBottom: '8px' }}>
            Sign in to your account
          </h1>
          <p className="caption">Track your dream destinations and travel journal.</p>
        </div>

        {/* Card */}
        <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', overflow: 'hidden', background: 'var(--canvas)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--ink)', marginBottom: '6px' }}>Email</label>
                <input id="login-email" className="input" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => set('email', e.target.value)} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--ink)', marginBottom: '6px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input id="login-password" className="input" style={{ paddingRight: '40px' }}
                    type={showPass ? 'text' : 'password'} placeholder="Your password"
                    value={form.password} onChange={e => set('password', e.target.value)} />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-faint)' }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{ padding: '10px 12px', borderRadius: 'var(--r-sm)', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', fontSize: '13px' }}>
                  {error}
                </div>
              )}

              <button id="login-submit" type="submit" className="btn-green" style={{ width: '100%', justifyContent: 'center', padding: '10px' }} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--line-cool)' }} />
                <span style={{ fontSize: '12px', color: 'var(--ink-mute)' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--line-cool)' }} />
              </div>
              <button id="demo-login" type="button" className="btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '10px' }} onClick={handleDemo}>
                Continue as guest
              </button>
            </div>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--ink-mute)' }}>
          Don&apos;t have an account?{' '}
          <Link to="/register" style={{ color: 'var(--ink)', fontWeight: 500, textDecoration: 'underline' }}>Sign up</Link>
        </p>

        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: 'var(--ink-faint)' }}>
          🔒 JWT auth — backend integration ready
        </p>
      </div>
    </div>
  );
}
