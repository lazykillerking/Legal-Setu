import LegalIcon from './LegalIcon.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function AgentApproval({ onAllow, onDeny, disabled }) {
  const { t } = useApp();
  return (
    <div className="recommend-actions">
      <button type="button" className="btn btn-primary" onClick={onAllow} disabled={disabled}>
        <LegalIcon name="arrow" size={15} strokeWidth={2} />
        {t('approval.allow')}
      </button>
      <button type="button" className="btn btn-danger-ghost" onClick={onDeny} disabled={disabled}>
        {t('approval.deny')}
      </button>
    </div>
  );
}
