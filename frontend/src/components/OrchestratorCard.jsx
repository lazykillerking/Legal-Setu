import { useEffect, useState } from 'react';
import StatusDot from './StatusDot.jsx';
import { useApp } from '../context/AppContext.jsx';

const SUBSTEP_IDS = ['step1', 'step2', 'step3'];

export default function OrchestratorCard() {
  const { t } = useApp();
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const timers = SUBSTEP_IDS.map((_, i) =>
      setTimeout(() => setVisibleSteps((v) => Math.max(v, i + 1)), 220 * i)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="orch-card" role="status" aria-live="polite">
      <div className="orch-header">
        <StatusDot pulse />
        <span className="orch-title">{t('orchestrator.title')}</span>
      </div>
      <div className="orch-status-text">{t('orchestrator.analyzing')}</div>
      <div className="orch-substeps">
        {SUBSTEP_IDS.slice(0, visibleSteps).map((id) => (
          <div key={id} className="orch-substep">
            <StatusDot pulse />
            {t(`orchestrator.${id}`)}
          </div>
        ))}
      </div>
    </div>
  );
}
