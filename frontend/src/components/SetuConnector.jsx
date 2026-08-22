import LegalIcon from './LegalIcon.jsx';

export default function SetuConnector({ agent, active = true }) {
  return (
    <div className="setu-connector" aria-hidden="true">
      <div className="setu-node">
        <div className="setu-node-icon">
          <LegalIcon name="scales" size={20} strokeWidth={1.7} />
        </div>
        <div className="setu-node-label">Legal Orchestrator</div>
      </div>

      <div className={`setu-line-track${active ? ' active' : ''}`}>
        {active && <span className="setu-line-dot" />}
        <span className="setu-line-caption">contextual handoff</span>
      </div>

      <div className="setu-node">
        <div className="setu-node-icon">
          <LegalIcon name={agent.icon} size={20} strokeWidth={1.7} />
        </div>
        <div className="setu-node-label">{agent.name}</div>
      </div>
    </div>
  );
}
