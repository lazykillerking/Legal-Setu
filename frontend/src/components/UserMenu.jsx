import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
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
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'Account';
  const email = user?.email || '';
  const avatarUrl = user?.user_metadata?.avatar_url;
  const initials = initialsOf(displayName);

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    navigate('/');
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
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="user-avatar-img" referrerPolicy="no-referrer" />
        ) : (
          initials
        )}
      </button>
      {open && (
        <div className="dropdown-menu" role="menu">
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
            Profile
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
            Settings
          </button>
          <div className="dropdown-divider" />
          <div className="dropdown-label">Theme</div>
          <button
            type="button"
            className="dropdown-item"
            role="menuitem"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Dark mode' : 'Light mode'}
            <LegalIcon name={theme === 'dark' ? 'moon' : 'sun'} size={14} strokeWidth={2} />
          </button>
          <div className="dropdown-divider" />
          <button
            type="button"
            className="dropdown-item"
            role="menuitem"
            onClick={handleSignOut}
          >
            Sign out
            <LegalIcon name="logout" size={14} strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}
