import { useEffect, useRef, useState } from 'react';
import { useApp, LANGUAGES } from '../context/AppContext.jsx';
import LegalIcon from './LegalIcon.jsx';

export default function LanguageSelector() {
  const { language, setLanguage } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const current = LANGUAGES.find((l) => l.code === language);

  return (
    <div className="lang-selector" ref={ref}>
      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="lang-trigger-text">{current.label}</span>
        <LegalIcon name="chevronDown" size={14} strokeWidth={2} />
      </button>
      {open && (
        <div className="dropdown-menu" role="listbox">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              lang={lang.code}
              aria-selected={lang.code === language}
              className={`dropdown-item${lang.code === language ? ' selected' : ''}`}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
            >
              {lang.label}
              <span className="uppercase-label">{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
