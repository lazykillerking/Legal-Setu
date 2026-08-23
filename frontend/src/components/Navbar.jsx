import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LegalIcon from './LegalIcon.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import UserMenu from './UserMenu.jsx';
import { useConversation } from '../context/ConversationContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { resetConversation } = useConversation();
  const { user, loading } = useAuth();

  function handleNewChat() {
    setMobileOpen(false);
    resetConversation();
    navigate('/chat');
  }

  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <button
            type="button"
            className="hamburger-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <LegalIcon name={mobileOpen ? 'x' : 'menu'} size={18} strokeWidth={2} />
          </button>
          <NavLink to="/" className="navbar-brand" aria-label="Legal Setu home">
            <span className="navbar-logo">LS</span>
            <span className="navbar-wordmark">Legal Setu</span>
          </NavLink>
          <nav className="navbar-nav" aria-label="Primary">
            <button type="button" className="navbar-nav-item" onClick={handleNewChat}>
              <LegalIcon name="plus" size={15} strokeWidth={2} />
              New Chat
            </button>
            <NavLink
              to="/history"
              className={({ isActive }) => `navbar-nav-item${isActive ? ' active' : ''}`}
            >
              <LegalIcon name="history" size={15} strokeWidth={2} />
              History
            </NavLink>
          </nav>
        </div>
        <div className="navbar-right">
          <LanguageSelector />
          <ThemeToggle />
          {!loading && (user ? (
            <UserMenu />
          ) : (
            <button
              type="button"
              className="navbar-login-btn"
              onClick={() => navigate('/login')}
            >
              <LegalIcon name="user" size={14} strokeWidth={2} />
              Log in
            </button>
          ))}
        </div>
      </header>

      <div className={`mobile-nav-panel${mobileOpen ? ' open' : ''}`}>
        <button type="button" className="navbar-nav-item" onClick={handleNewChat}>
          <LegalIcon name="plus" size={15} strokeWidth={2} />
          New Chat
        </button>
        <NavLink
          to="/history"
          className={({ isActive }) => `navbar-nav-item${isActive ? ' active' : ''}`}
          onClick={() => setMobileOpen(false)}
        >
          <LegalIcon name="history" size={15} strokeWidth={2} />
          History
        </NavLink>
      </div>
    </>
  );
}
