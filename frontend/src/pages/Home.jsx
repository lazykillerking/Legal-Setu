import { useNavigate } from 'react-router-dom';
import LegalIcon from '../components/LegalIcon.jsx';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-wrap" style={{ maxWidth: 680, textAlign: 'center', paddingTop: 64 }}>
      <div className="empty-icon-wrap" style={{ margin: '0 auto 18px' }}>
        <LegalIcon name="scales" size={30} strokeWidth={1.6} />
      </div>
      <h1 className="page-title" style={{ fontSize: 26 }}>Legal Setu</h1>
      <p className="page-subtitle" style={{ marginBottom: 28 }}>
        Ask your legal question in plain language. The Legal Orchestrator identifies the right
        domain and recommends a specialist agent — you decide whether to bring them in.
      </p>
      <button type="button" className="btn btn-primary" onClick={() => navigate('/chat')}>
        Start a conversation
        <LegalIcon name="arrow" size={15} strokeWidth={2} />
      </button>
    </div>
  );
}
