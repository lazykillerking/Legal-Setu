import { useEffect, useState } from 'react';
import StatusDot from './StatusDot.jsx';

const SUBSTEPS = [
  'Understanding the situation',
  'Identifying legal domain',
  'Selecting relevant expertise',
];

export default function OrchestratorCard() {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const timers = SUBSTEPS.map((_, i) =>
      setTimeout(() => setVisibleSteps((v) => Math.max(v, i + 1)), 220 * i)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="orch-card" role="status" aria-live="polite">
      <div className="orch-header">
        <StatusDot pulse />
        <span className="orch-title">Legal Orchestrator</span>
      </div>
      <div className="orch-status-text">Analyzing your query…</div>
      <div className="orch-substeps">
        {SUBSTEPS.slice(0, visibleSteps).map((step) => (
          <div key={step} className="orch-substep">
            <StatusDot pulse />
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
