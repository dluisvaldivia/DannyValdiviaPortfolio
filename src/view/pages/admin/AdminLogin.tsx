import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login, isAuthenticated } from '../../../controllers/authController';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#e8e8f0',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const focusStyle: React.CSSProperties = {
  borderColor: '#00674F',
  boxShadow: '0 0 0 3px rgba(0,103,79,0.15)',
};

function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '0.8rem', color: 'rgba(232,232,240,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, ...(focused ? focusStyle : {}) }}
        autoComplete={type === 'password' ? 'current-password' : 'username'}
      />
    </div>
  );
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isAuthenticated()) navigate('/admin/dashboard', { replace: true });
  }, [navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(user.trim(), pass)) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Incorrect username or password.');
      setPass('');
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent-color)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Admin
          </p>
          <h1 style={{ fontSize: '1.6rem', color: 'var(--text-color)', margin: 0, fontWeight: 700 }}>
            Blog Dashboard
          </h1>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <Field label="Username" type="text" value={user} onChange={setUser} />
          <Field label="Password" type="password" value={pass} onChange={setPass} />

          {error && (
            <p style={{ color: '#ff6b6b', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              marginTop: '0.4rem',
              padding: '13px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #00674F, #004d3a)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0,103,79,0.3)',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 32px rgba(0,103,79,0.55)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(0,103,79,0.3)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Sign in
          </button>
        </form>
      </motion.div>
    </div>
  );
}
