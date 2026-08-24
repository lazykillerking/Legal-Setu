import { useEffect, useState } from 'react';
import LegalIcon from '../components/LegalIcon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
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

export default function History() {
  const { t } = useApp();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!supabase || !user) { if (active) { setItems([]); setLoading(false); } return; }
      const { data } = await supabase
        .from('legal_conversations')
        .select('id, title, created_at, legal_messages(role, content, created_at)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (active) { setItems(data ?? []); setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, [user]);

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
      {group.items.map((item) => <button key={item.id} type="button" className="history-item" onClick={() => setSelected(item)}>
        <div className="history-item-icon"><LegalIcon name="fileText" size={18} strokeWidth={1.8} /></div>
        <div><div className="history-item-title">{item.title || t('history.conversation')}</div><div className="history-item-sub">{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.created_at))}</div></div>
      </button>)}
    </div>)}
    {selected && <div className="card history-detail-card"><div className="uppercase-label" style={{ marginBottom: 8 }}>{t('history.conversation')}</div><h2 style={{ margin: '0 0 10px', fontSize: 16 }}>{selected.title}</h2>{selected.legal_messages?.map((message) => <p key={`${message.role}-${message.created_at}`} style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}><strong>{message.role === 'user' ? 'You' : 'Legal Setu'}:</strong> {message.content}</p>)}</div>}
  </div>;
}
