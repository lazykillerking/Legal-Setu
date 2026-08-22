import { useApp } from '../context/AppContext.jsx';

export default function Profile() {
  const { displayName } = useApp();
  const initials = displayName
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="page-wrap">
      <h1 className="page-title">Profile</h1>
      <p className="page-subtitle">Your account details on Legal Setu.</p>

      <div className="profile-header">
        <div className="profile-avatar-lg">{initials}</div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{displayName}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>swastik1109.sa@gmail.com</div>
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
          <span className="settings-row-sub">swastik1109.sa@gmail.com</span>
        </div>
        <div className="settings-row">
          <span className="settings-row-label">Member since</span>
          <span className="settings-row-sub">2026</span>
        </div>
      </div>
    </div>
  );
}
