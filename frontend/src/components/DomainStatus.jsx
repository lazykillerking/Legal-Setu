import ExpandableStatus from './ExpandableStatus.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function DomainStatus({ domain }) {
  const { t } = useApp();
  return (
    <ExpandableStatus label={`${t('domain.identifiedPrefix')} ${domain.domain}`} variant="primary">
      <div className="domain-detail-grid">
        <div className="domain-detail-row">
          <span className="domain-detail-key">{t('domain.detected')}</span>
          <span className="domain-detail-val">{domain.domain}</span>
        </div>
        <div className="domain-detail-row">
          <span className="domain-detail-key">{t('domain.topic')}</span>
          <span className="domain-detail-val">{domain.topic}</span>
        </div>
        <div className="domain-detail-row">
          <span className="domain-detail-key">{t('domain.intent')}</span>
          <span className="domain-detail-val">{domain.intent}</span>
        </div>
      </div>
    </ExpandableStatus>
  );
}
