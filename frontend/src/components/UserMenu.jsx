import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import LegalIcon from './LegalIcon.jsx';

function initialsOf(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function UserMenu() {
  const { displayName, t } = useApp();
  const { user, loading, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const email = user?.email ?? '';

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const initials = initialsOf(displayName);

  if (loading) return null;

  if (!user) {
    return (
      <button
        type="button"
        className="navbar-signin-btn"
        onClick={() => navigate('/login')}
      >
        {t('userMenu.signIn')}
      </button>
    );
  }

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="user-avatar"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open account menu"
        onClick={() => setOpen((o) => !o)}
      >
        {initials}
      </button>
      {open && (
        <div className="user-dropdown-menu" role="menu">
          <div className="user-menu-header">
            <div className="user-menu-name">{displayName}</div>
            <div className="user-menu-email">{email}</div>
          </div>
          <button
            type="button"
            className="dropdown-item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              navigate('/profile');
            }}
          >
            {t('userMenu.profile')}
          </button>
          <button
            type="button"
            className="dropdown-item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              navigate('/settings');
            }}
          >
            {t('userMenu.settings')}
          </button>
          <div className="dropdown-divider" />
          <div className="dropdown-label">{t('userMenu.theme')}</div>
          <button
            type="button"
            className="dropdown-item"
            role="menuitem"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? t('userMenu.darkMode') : t('userMenu.lightMode')}
            <LegalIcon name={theme === 'dark' ? 'moon' : 'sun'} size={14} strokeWidth={2} />
          </button>
          <div className="dropdown-divider" />
          <button
            type="button"
            className="dropdown-item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              signOut();
              navigate('/login');
            }}
          >
            {t('userMenu.signOut')}
            <LegalIcon name="logout" size={14} strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}
