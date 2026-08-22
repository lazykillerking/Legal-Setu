import { useTheme } from '../context/ThemeContext.jsx';
import LegalIcon from './LegalIcon.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
    >
      <span className="theme-toggle-thumb">
        <LegalIcon name={isDark ? 'moon' : 'sun'} size={13} strokeWidth={2} />
      </span>
    </button>
  );
}
