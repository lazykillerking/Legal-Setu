import ExpandableStatus from './ExpandableStatus.jsx';

export default function DomainStatus({ domain }) {
  return (
    <ExpandableStatus label={`Domain identified: ${domain.domain}`} variant="primary">
      <div className="domain-detail-grid">
        <div className="domain-detail-row">
          <span className="domain-detail-key">Detected domain</span>
          <span className="domain-detail-val">{domain.domain}</span>
        </div>
        <div className="domain-detail-row">
          <span className="domain-detail-key">Topic</span>
          <span className="domain-detail-val">{domain.topic}</span>
        </div>
        <div className="domain-detail-row">
          <span className="domain-detail-key">User intent</span>
          <span className="domain-detail-val">{domain.intent}</span>
        </div>
      </div>
    </ExpandableStatus>
  );
}
