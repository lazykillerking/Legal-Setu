import StatusDot from './StatusDot.jsx';
import SetuConnector from './SetuConnector.jsx';

export default function HandoffCard({ agent, contextSummary, working }) {
  return (
    <div className="handoff-card" role="status" aria-live="polite">
      <div className="handoff-header-row">
        <span className="orch-title">Legal Orchestrator</span>
        <span className="handoff-badge">
          <StatusDot pulse variant="accent" />
          Handing off
        </span>
      </div>
      <div className="handoff-status-text">Preparing contextual handoff…</div>

      <SetuConnector agent={agent} active />

      <div className="handoff-section-label">Context extracted</div>
      <ul className="context-list">
        {contextSummary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="handoff-meta-row">
        <div>
          <div className="handoff-meta-key">Target agent</div>
          <div className="handoff-meta-val">{agent.name}</div>
        </div>
        <div className="handoff-status-working">
          <StatusDot pulse={working} variant={working ? 'primary' : 'success'} />
          {working ? 'Working' : 'Ready'}
        </div>
      </div>
    </div>
  );
}
