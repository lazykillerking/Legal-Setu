import { useNavigate } from 'react-router-dom';
import LegalIcon from '../components/LegalIcon.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <div className="page-wrap" style={{ maxWidth: 680, textAlign: 'center', paddingTop: 64 }}>
      <div className="empty-icon-wrap" style={{ margin: '0 auto 18px' }}>
        <LegalIcon name="scales" size={30} strokeWidth={1.6} />
      </div>
      <h1 className="page-title" style={{ fontSize: 26 }}>{t('home.title')}</h1>
      <p className="page-subtitle" style={{ marginBottom: 28 }}>
        {t('home.desc')}
      </p>
      <button type="button" className="btn btn-primary" onClick={() => navigate('/chat')}>
        {t('home.start')}
        <LegalIcon name="arrow" size={15} strokeWidth={2} />
      </button>
    </div>
  );
}
