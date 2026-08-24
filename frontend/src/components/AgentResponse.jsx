import LegalIcon from './LegalIcon.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function AgentResponse({ response, onAction }) {
  const { t } = useApp();
  const { agent, lead, steps, note, actions } = response;

  return (
    <div className="response-card">
      <div className="response-header">
        <div className="response-agent-icon">
          <LegalIcon name={agent.icon} size={19} strokeWidth={1.8} />
        </div>
        <span className="response-agent-name">{agent.name}</span>
      </div>

      <p className="response-lead">{lead}</p>

      <ol className="response-list">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <p className="response-note">{note}</p>

      <div className="response-actions">
        {actions.map((action) => (
          <button
            key={action}
            type="button"
            className="btn"
            onClick={() => onAction && onAction(action)}
          >
            {action}
          </button>
        ))}
      </div>

      <div className="response-disclaimer">
        <LegalIcon name="alertTriangle" size={15} strokeWidth={2} />
        {t('agentResponse.disclaimer')}
      </div>
    </div>
  );
}
