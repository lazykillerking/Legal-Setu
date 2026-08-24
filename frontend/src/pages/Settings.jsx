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
  const { language, setLanguage, displayName, setDisplayName, clearHistory, historyCleared, t } =
    useApp();
  const [name, setName] = useState(displayName);
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  return (
    <div className="page-wrap">
      <h1 className="page-title">{t('settings.title')}</h1>
      <p className="page-subtitle">{t('settings.subtitle')}</p>

      <div className="settings-section">
        <div className="settings-section-title">{t('settings.appearance')}</div>
        <div className="settings-section-desc">{t('settings.appearanceDesc')}</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">{t('settings.theme')}</div>
            <div className="settings-row-sub">{t('settings.themeDesc')}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className={`btn${theme === 'light' ? ' btn-primary' : ''}`}
              onClick={() => setTheme('light')}
            >
              {t('settings.light')}
            </button>
            <button
              type="button"
              className={`btn${theme === 'dark' ? ' btn-primary' : ''}`}
              onClick={() => setTheme('dark')}
            >
              {t('settings.dark')}
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">{t('settings.language')}</div>
        <div className="settings-section-desc">{t('settings.languageNote')}</div>
        <div className="settings-row">
          <span className="settings-row-label">{t('settings.interfaceLanguage')}</span>
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
        <div className="settings-section-title">{t('settings.profile')}</div>
        <div className="settings-row">
          <span className="settings-row-label">{t('settings.displayName')}</span>
          <input
            className="settings-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setDisplayName(name.trim() || displayName)}
          />
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">{t('settings.conversation')}</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">{t('settings.clearHistory')}</div>
            <div className="settings-row-sub">
              {historyCleared ? t('settings.clearedMsg') : t('settings.clearDesc')}
            </div>
          </div>
          <button type="button" className="btn btn-danger-ghost" onClick={clearHistory}>
            {t('settings.clearHistory')}
          </button>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">{t('settings.privacy')}</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">{t('settings.shareData')}</div>
          </div>
          <Toggle on={dataSharing} onClick={() => setDataSharing((v) => !v)} label="Data sharing" />
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">{t('settings.usageAnalytics')}</div>
          </div>
          <Toggle on={analytics} onClick={() => setAnalytics((v) => !v)} label="Usage analytics" />
        </div>
      </div>
    </div>
  );
}
