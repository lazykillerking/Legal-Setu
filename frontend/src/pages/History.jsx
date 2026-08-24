import { useState } from 'react';
import LegalIcon from '../components/LegalIcon.jsx';
import { useApp } from '../context/AppContext.jsx';

const GROUPS = [
  {
    label: 'Today',
    items: [
      {
        id: 'h1',
        title: 'Security Deposit Dispute',
        sub: 'Case Guidance Agent · Tenant / Landlord Dispute',
        icon: 'compass',
      },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      {
        id: 'h2',
        title: 'Employment Salary Issue',
        sub: 'Rights Agent · Labor & Employment',
        icon: 'shield',
      },
    ],
  },
  {
    label: 'Aug 20',
    items: [
      {
        id: 'h3',
        title: 'Contract Review',
        sub: 'Contract Review Agent · Vendor Agreement',
        icon: 'contract',
      },
    ],
  },
  {
    label: 'Aug 18',
    items: [
      {
        id: 'h4',
        title: 'Consumer Complaint',
        sub: 'Complaint & Filing Agent · Consumer Forum',
        icon: 'fileText',
      },
    ],
  },
];

export default function History() {
  const { historyCleared, t } = useApp();
  const [selected, setSelected] = useState(null);

  const groups = historyCleared ? [] : GROUPS;

  return (
    <div className="page-wrap">
      <h1 className="page-title">{t('history.title')}</h1>
      <p className="page-subtitle">{t('history.subtitle')}</p>

      {groups.length === 0 && (
        <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>
          {t('history.empty')}
        </div>
      )}

      {groups.map((group) => (
        <div className="history-group" key={group.label}>
          <div className="history-group-label">{group.label}</div>
          {group.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="history-item"
              onClick={() => setSelected(item)}
            >
              <div className="history-item-icon">
                <LegalIcon name={item.icon} size={18} strokeWidth={1.8} />
              </div>
              <div>
                <div className="history-item-title">{item.title}</div>
                <div className="history-item-sub">{item.sub}</div>
              </div>
            </button>
          ))}
        </div>
      ))}

      {selected && (
        <div className="card history-detail-card">
          <div className="uppercase-label" style={{ marginBottom: 8 }}>
            {t('history.conversation')}
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: 16 }}>{selected.title}</h2>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)' }}>
            {selected.sub}. {t('history.staticDemo')}
          </p>
        </div>
      )}
    </div>
  );
}
