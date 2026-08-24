import StatusDot from './StatusDot.jsx';
import SetuConnector from './SetuConnector.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function HandoffCard({ agent, contextSummary, working }) {
  const { t } = useApp();
  return (
    <div className="handoff-card" role="status" aria-live="polite">
      <div className="handoff-header-row">
        <span className="orch-title">{t('orchestrator.title')}</span>
        <span className="handoff-badge">
          <StatusDot pulse variant="accent" />
          {t('handoff.handingOff')}
        </span>
      </div>
      <div className="handoff-status-text">{t('handoff.preparing')}</div>

      <SetuConnector agent={agent} active />

      <div className="handoff-section-label">{t('handoff.contextExtracted')}</div>
      <ul className="context-list">
        {contextSummary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="handoff-meta-row">
        <div>
          <div className="handoff-meta-key">{t('handoff.targetAgent')}</div>
          <div className="handoff-meta-val">{agent.name}</div>
        </div>
        <div className="handoff-status-working">
          <StatusDot pulse={working} variant={working ? 'primary' : 'success'} />
          {working ? t('handoff.working') : t('handoff.ready')}
        </div>
      </div>
    </div>
  );
}
