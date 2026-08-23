import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useApp, LANGUAGES } from '../context/AppContext.jsx';

function Toggle({ on, onClick, label }) {
  return (
    <button
      type="button"
      className={`toggle-switch${on ? ' on' : ''}`}
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
    >
      <span className="toggle-switch-thumb" />
    </button>
  );
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, displayName, setDisplayName, clearHistory, historyCleared } =
    useApp();
  const [name, setName] = useState(displayName);
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  return (
    <div className="page-wrap">
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Manage your appearance, language, and conversation data.</p>

      <div className="settings-section">
        <div className="settings-section-title">Appearance</div>
        <div className="settings-section-desc">Choose how Legal Setu looks on your device.</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Theme</div>
            <div className="settings-row-sub">Light or dark mode, synced across the app.</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className={`btn${theme === 'light' ? ' btn-primary' : ''}`}
              onClick={() => setTheme('light')}
            >
              Light
            </button>
            <button
              type="button"
              className={`btn${theme === 'dark' ? ' btn-primary' : ''}`}
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Language</div>
        <div className="settings-section-desc">
          A handful of interface strings switch for this demo — full translation is out of scope.
        </div>
        <div className="settings-row">
          <span className="settings-row-label">Interface language</span>
          <select
            className="settings-input"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Profile</div>
        <div className="settings-row">
          <span className="settings-row-label">Display name</span>
          <input
            className="settings-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setDisplayName(name.trim() || displayName)}
          />
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Conversation</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Clear history</div>
            <div className="settings-row-sub">
              {historyCleared ? 'Conversation history has been cleared.' : 'Remove all saved conversations.'}
            </div>
          </div>
          <button type="button" className="btn btn-danger-ghost" onClick={clearHistory}>
            Clear history
          </button>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Privacy</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Share anonymized data to improve responses</div>
          </div>
          <Toggle on={dataSharing} onClick={() => setDataSharing((v) => !v)} label="Data sharing" />
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Usage analytics</div>
          </div>
          <Toggle on={analytics} onClick={() => setAnalytics((v) => !v)} label="Usage analytics" />
        </div>
      </div>
    </div>
  );
}
