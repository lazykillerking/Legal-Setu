import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../services/supabaseClient.js';

function initialsOf(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!supabase || !user) {
      setLoadingProfile(false);
      return;
    }
    let active = true;
    supabase
      .from('profiles')
      .select('full_name, email, avatar_url, provider, created_at')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (active) {
          setProfile(data);
          setLoadingProfile(false);
        }
      });
    return () => {
      active = false;
    };
  }, [user]);

  const displayName =
    profile?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || 'Legal Setu user';
  const email = profile?.email || user?.email || '';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url;
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
    : '—';
  const initials = initialsOf(displayName);

  return (
    <div className="page-wrap">
      <h1 className="page-title">Profile</h1>
      <p className="page-subtitle">Your account details on Legal Setu.</p>

      <div className="profile-header">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="profile-avatar-lg"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="profile-avatar-lg">{initials}</div>
        )}
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{displayName}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{email}</div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Account</div>
        <div className="settings-row">
          <span className="settings-row-label">Full name</span>
          <span className="settings-row-sub">{displayName}</span>
        </div>
        <div className="settings-row">
          <span className="settings-row-label">Email</span>
          <span className="settings-row-sub">{email}</span>
        </div>
        <div className="settings-row">
          <span className="settings-row-label">Signed in with</span>
          <span className="settings-row-sub" style={{ textTransform: 'capitalize' }}>
            {profile?.provider || 'Google'}
          </span>
        </div>
        <div className="settings-row">
          <span className="settings-row-label">Member since</span>
          <span className="settings-row-sub">{loadingProfile ? '…' : memberSince}</span>
        </div>
      </div>
    </div>
  );
}
