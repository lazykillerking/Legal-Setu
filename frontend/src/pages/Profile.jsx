import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../services/supabaseClient.js';

function initialsOf(name) {
  if (!name) return '?';
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

  useEffect(() => {
    if (!supabase || !user) return;
    let active = true;
    supabase
      .from('profiles')
      .select('full_name, avatar_url, provider, created_at')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (active) setProfile(data);
      });
    return () => {
      active = false;
    };
  }, [user]);

  const displayName =
    profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url;
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      })
    : '—';

  return (
    <div className="page-wrap">
      <h1 className="page-title">Profile</h1>
      <p className="page-subtitle">Your account details on Legal Setu.</p>

      <div className="profile-header">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="profile-avatar-lg" style={{ objectFit: 'cover' }} />
        ) : (
          <div className="profile-avatar-lg">{initialsOf(displayName)}</div>
        )}
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{displayName}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{user?.email}</div>
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
          <span className="settings-row-sub">{user?.email}</span>
        </div>
        <div className="settings-row">
          <span className="settings-row-label">Signed in via</span>
          <span className="settings-row-sub">{profile?.provider || 'email'}</span>
        </div>
        <div className="settings-row">
          <span className="settings-row-label">Member since</span>
          <span className="settings-row-sub">{memberSince}</span>
        </div>
      </div>
    </div>
  );
}
