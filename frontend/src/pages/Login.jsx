import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LegalIcon from '../components/LegalIcon.jsx';

export default function Login() {
  const { user, loading, authError, clearAuthError, signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => clearAuthError, [clearAuthError]);

  // Already signed in — no reason to show the login page.
  if (!loading && user) return <Navigate to={from} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    const { error } = await signInWithMagicLink(email.trim());
    setSubmitting(false);
    if (!error) setSent(true);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="empty-icon-wrap" style={{ margin: '0 auto 18px' }}>
          <LegalIcon name="scales" size={28} strokeWidth={1.6} />
        </div>
        <h1 className="login-title">Welcome to Legal Setu</h1>
        <p className="login-subtitle">
          Sign in to get personalized legal guidance, with your conversation history and
          context saved to your account.
        </p>

        {authError && (
          <div className="login-error" role="alert">
            <LegalIcon name="alertTriangle" size={15} strokeWidth={2} />
            {authError}
          </div>
        )}

        {sent ? (
          <div className="login-success" role="status">
            <LegalIcon name="send" size={15} strokeWidth={2} />
            Magic link sent to <strong>{email}</strong>. Check your inbox and click it to sign
            in.
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="login-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={submitting || loading}
            />
            <button
              type="submit"
              className="google-btn"
              disabled={submitting || loading || !email.trim()}
            >
              {submitting ? 'Sending link…' : 'Send magic link'}
            </button>
          </form>
        )}

        <p className="login-footnote">
          By continuing you agree this is a hackathon prototype, not a substitute for
          professional legal advice.
        </p>
      </div>
    </div>
  );
}
