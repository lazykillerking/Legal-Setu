import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LegalIcon from '../components/LegalIcon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useConversation } from '../context/ConversationContext.jsx';
import { supabase } from '../services/supabaseClient.js';

function groupLabel(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date);
}

function fallbackTitle(item) {
  const firstUserMessage = [...(item.legal_messages ?? [])]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .find((m) => m.role === 'user');
  if (!firstUserMessage) return null;
  const text = firstUserMessage.content.trim();
  return text.length > 60 ? `${text.slice(0, 57).trim()}…` : text;
}

export default function History() {
  const { t } = useApp();
  const { user } = useAuth();
  const { loadConversation } = useConversation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!supabase || !user) { if (active) { setItems([]); setLoading(false); } return; }
      const { data } = await supabase
        .from('legal_conversations')
        .select('id, session_id, title, created_at, legal_messages(role, content, created_at)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (active) { setItems(data ?? []); setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, [user]);

  function handleContinue(item) {
    const messages = [...(item.legal_messages ?? [])]
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .map((m, index) => ({ id: `h_${item.id}_${index}`, role: m.role, text: m.content }));
    loadConversation(item.session_id, messages);
    navigate('/chat');
  }

  const groups = items.reduce((result, item) => {
    const label = groupLabel(item.created_at);
    const group = result.find((entry) => entry.label === label);
    if (group) group.items.push(item);
    else result.push({ label, items: [item] });
    return result;
  }, []);

  return <div className="page-wrap">
    <h1 className="page-title">{t('history.title')}</h1>
    <p className="page-subtitle">{t('history.subtitle')}</p>
    {loading && <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>Loading conversations…</div>}
    {!loading && !groups.length && <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>{t('history.empty')}</div>}
    {groups.map((group) => <div className="history-group" key={group.label}>
      <div className="history-group-label">{group.label}</div>
      {group.items.map((item) => <button key={item.id} type="button" className="history-item" onClick={() => handleContinue(item)}>
        <div className="history-item-icon"><LegalIcon name="fileText" size={18} strokeWidth={1.8} /></div>
        <div><div className="history-item-title">{item.title || fallbackTitle(item) || t('history.conversation')}</div><div className="history-item-sub">{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.created_at))}</div></div>
      </button>)}
    </div>)}
  </div>;
}
