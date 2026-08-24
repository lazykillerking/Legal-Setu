import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useApp } from '../context/AppContext.jsx';
import LegalIcon from '../components/LegalIcon.jsx';

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
      />
    </svg>
  );
}

export default function Login() {
  const { user, loading, authError, clearAuthError, signInWithMagicLink, signInWithGoogle } =
    useAuth();
  const { t } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => clearAuthError, [clearAuthError]);

  // Already signed in — no reason to show the login page.
  if (!loading && user) return <Navigate to={from} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || submitting) return;
    setSubmitting(true);
    const { error } = await signInWithMagicLink(email.trim(), name.trim());
    setSubmitting(false);
    if (!error) setSent(true);
  }

  async function handleGoogleSignIn() {
    setGoogleSubmitting(true);
    await signInWithGoogle();
    // On success the browser navigates away to Google, so this only resumes
    // running if sign-in failed before the redirect happened.
    setGoogleSubmitting(false);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="empty-icon-wrap" style={{ margin: '0 auto 18px' }}>
          <LegalIcon name="scales" size={28} strokeWidth={1.6} />
        </div>
        <h1 className="login-title">{t('login.welcome')}</h1>
        <p className="login-subtitle">{t('login.desc')}</p>

        {authError && (
          <div className="login-error" role="alert">
            <LegalIcon name="alertTriangle" size={15} strokeWidth={2} />
            {authError}
          </div>
        )}

        {sent ? (
          <div className="login-success" role="status">
            <LegalIcon name="send" size={15} strokeWidth={2} />
            <span className="login-success-copy">
              {t('login.magicSentPrefix')} <strong>{email}</strong>{t('login.magicSentSuffix')}
            </span>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleSignIn}
              disabled={googleSubmitting || loading}
            >
              <GoogleGlyph />
              {googleSubmitting ? t('login.redirecting') : t('login.continueGoogle')}
            </button>

            <div className="login-divider">
              <span>{t('login.or')}</span>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="login-name">Your name</label>
              <input
                id="login-name"
                type="text"
                className="login-input"
                placeholder={t('login.namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                disabled={submitting || loading}
              />
              <label className="visually-hidden" htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                className="login-input"
                placeholder={t('login.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={submitting || loading}
              />
              <button
                type="submit"
                className="primary-btn"
                disabled={submitting || loading || !name.trim() || !email.trim()}
              >
                {submitting ? t('login.sending') : t('login.sendLink')}
              </button>
            </form>
          </>
        )}

        <p className="login-footnote">{t('login.terms')}</p>
      </div>
    </div>
  );
}
