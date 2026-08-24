import LegalIcon from './LegalIcon.jsx';
import AgentApproval from './AgentApproval.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function AgentRecommendation({ agent, reason, onAllow, onDeny }) {
  const { t } = useApp();
  return (
    <div className="recommend-card">
      <div className="recommend-label">{t('recommendation.title')}</div>
      <div className="recommend-agent-row">
        <div className="recommend-agent-icon">
          <LegalIcon name={agent.icon} size={26} strokeWidth={1.7} />
        </div>
        <div>
          <div className="recommend-agent-name">{agent.name}</div>
          <div className="recommend-agent-desc">{agent.description}</div>
        </div>
      </div>
      <div className="recommend-reason">
        <div className="recommend-reason-label">{t('recommendation.reason')}</div>
        <div className="recommend-reason-text">{reason}</div>
      </div>
      <AgentApproval onAllow={onAllow} onDeny={onDeny} />
    </div>
  );
}
