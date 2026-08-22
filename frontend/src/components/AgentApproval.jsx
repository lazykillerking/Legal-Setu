import LegalIcon from './LegalIcon.jsx';

export default function AgentApproval({ onAllow, onDeny, disabled }) {
  return (
    <div className="recommend-actions">
      <button type="button" className="btn btn-primary" onClick={onAllow} disabled={disabled}>
        <LegalIcon name="arrow" size={15} strokeWidth={2} />
        Allow
      </button>
      <button type="button" className="btn btn-danger-ghost" onClick={onDeny} disabled={disabled}>
        Deny
      </button>
    </div>
  );
}
