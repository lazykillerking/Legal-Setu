import { useState } from 'react';
import StatusDot from './StatusDot.jsx';
import LegalIcon from './LegalIcon.jsx';

export default function ExpandableStatus({ label, variant = 'primary', pulse = false, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="expandable-status">
      <button
        type="button"
        className="expandable-status-header"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <StatusDot variant={variant} pulse={pulse} />
        {label}
        <span className={`chev${open ? ' open' : ''}`}>
          <LegalIcon name="chevronDown" size={15} strokeWidth={2} />
        </span>
      </button>
      {open && <div className="expandable-status-body">{children}</div>}
    </div>
  );
}
