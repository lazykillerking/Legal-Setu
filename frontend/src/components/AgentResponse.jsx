import LegalIcon from './LegalIcon.jsx';
import { useApp } from '../context/AppContext.jsx';

function InlineText({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part
  );
}

function FormattedResponse({ text }) {
  const normalized = text
    .replace(/\s*---\s*/g, '\n\n')
    .replace(/\s+(#{1,6}\s+)/g, '\n\n$1')
    .replace(/\s+(\d+\.\s+\*\*)/g, '\n\n$1')
    .replace(/\s+-\s+(?=[A-Z*])/g, '\n- ')
    .trim();
  const blocks = normalized.split(/\n{2,}/).filter(Boolean);

  return <div className="formatted-response">
    {blocks.map((block, index) => {
      const heading = block.match(/^#{1,6}\s+(.+)/);
      const lines = block.split('\n').filter(Boolean);
      const isList = lines.every((line) => /^(-|\d+\.)\s+/.test(line));
      if (heading) return <h2 key={index}><InlineText text={heading[1]} /></h2>;
      if (isList) return <ul key={index}>{lines.map((line, itemIndex) => <li key={itemIndex}><InlineText text={line.replace(/^(-|\d+\.)\s+/, '')} /></li>)}</ul>;
      return <p key={index}><InlineText text={block.replace(/\n/g, ' ')} /></p>;
    })}
  </div>;
}

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

      <FormattedResponse text={lead} />

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
