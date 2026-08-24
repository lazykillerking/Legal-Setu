import { createContext, useContext, useReducer, useCallback } from 'react';
import * as api from '../services/legalSetuApi.js';
import { AGENTS } from '../data/agents.js';
import { extractPdfText } from '../utils/pdfText.js';

// ---- Orchestration state machine -------------------------------------------------
// States: idle -> analyzing -> domainIdentified -> agentRecommended -> awaitingApproval
//         -> approved -> handoff -> agentWorking -> responseReady
//         (awaitingApproval -> denied is a valid branch)
//         any step can transition -> error

const initialState = {
  status: 'idle',
  messages: [], // { id, role: 'user', text, file? }
  domain: null, // { domain, topic, intent }
  recommendation: null, // { agent, reason }
  handoff: null, // { contextSummary, targetAgent }
  response: null, // { agent, lead, steps, note, actions }
  denialMessage: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return { ...initialState };
    case 'SUBMIT_QUERY':
      return {
        ...initialState,
        messages: [
          ...state.messages,
          { id: action.id, role: 'user', text: action.text, file: action.file || null },
        ],
        status: 'submitted',
      };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'SET_DOMAIN':
      return { ...state, domain: action.domain, status: 'domainIdentified' };
    case 'SET_RECOMMENDATION':
      return { ...state, recommendation: action.recommendation, status: 'agentRecommended' };
    case 'AWAIT_APPROVAL':
      return { ...state, status: 'awaitingApproval' };
    case 'APPROVE':
      return { ...state, status: 'approved' };
    case 'DENY':
      return { ...state, status: 'denied', denialMessage: action.denialMessage };
    case 'HANDOFF_START':
      return { ...state, status: 'handoff' };
    case 'HANDOFF_DATA':
      return { ...state, handoff: action.handoff, status: 'agentWorking' };
    case 'RESPONSE_READY':
      return { ...state, response: action.response, status: 'responseReady' };
    case 'ERROR':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}

const ConversationContext = createContext(null);

export function ConversationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const resetConversation = useCallback(() => {
    api.startNewSession();
    dispatch({ type: 'RESET' });
  }, []);

  const submitQuery = useCallback(async (text, file) => {
    const id = `m_${Date.now()}`;
    dispatch({ type: 'SUBMIT_QUERY', id, text, file });
    try {
      dispatch({ type: 'SET_STATUS', status: 'analyzing' });

      let outgoingMessage = text;
      if (file && (file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf'))) {
        try {
          const documentText = await extractPdfText(file);
          if (documentText) {
            outgoingMessage = `${text}\n\n--- Attached document: ${file.name} ---\n${documentText}`;
          }
        } catch (err) {
          console.error('Failed to read PDF file.', err);
        }
      }

      const { response } = await api.submitQuery(outgoingMessage);
      dispatch({ type: 'RESPONSE_READY', response: { agent: AGENTS.legalQuery, lead: response, steps: [], note: '', actions: [] } });
    } catch (err) {
      dispatch({ type: 'ERROR', error: err?.message || 'Something went wrong.' });
    }
  }, []);

  const approve = useCallback(() => {}, []);

  const deny = useCallback(() => {}, []);

  const retry = useCallback(() => {
    dispatch({ type: 'AWAIT_APPROVAL' });
  }, []);

  return (
    <ConversationContext.Provider
      value={{ state, submitQuery, approve, deny, retry, resetConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const ctx = useContext(ConversationContext);
  if (!ctx) throw new Error('useConversation must be used within ConversationProvider');
  return ctx;
}
