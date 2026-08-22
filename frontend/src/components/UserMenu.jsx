import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
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
  const { displayName } = useApp();
  const { theme, toggleTheme } = useTheme();
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

  const initials = initialsOf(displayName);

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
        <div className="dropdown-menu" role="menu">
          <div className="user-menu-header">
            <div className="user-menu-name">{displayName}</div>
            <div className="user-menu-email">swastik1109.sa@gmail.com</div>
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
            onClick={() => setOpen(false)}
          >
            Sign out
            <LegalIcon name="logout" size={14} strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}
