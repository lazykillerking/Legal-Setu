import { useEffect, useRef, useState } from 'react';
import { useConversation } from '../context/ConversationContext.jsx';
import { useApp } from '../context/AppContext.jsx';
import ChatInput from '../components/ChatInput.jsx';
import UserMessage from '../components/UserMessage.jsx';
import AssistantMessage from '../components/AssistantMessage.jsx';
import OrchestratorCard from '../components/OrchestratorCard.jsx';
import DomainStatus from '../components/DomainStatus.jsx';
import AgentRecommendation from '../components/AgentRecommendation.jsx';
import ExpandableStatus from '../components/ExpandableStatus.jsx';
import HandoffCard from '../components/HandoffCard.jsx';
import AgentResponse from '../components/AgentResponse.jsx';
import LegalIcon from '../components/LegalIcon.jsx';

const SUGGESTIONS = [
  { id: 'suggestion1', icon: 'contract' },
  { id: 'suggestion2', icon: 'shield' },
  { id: 'suggestion3', icon: 'fileText' },
];

export default function Chat() {
  const { state, submitQuery, approve, deny, retry } = useConversation();
  const { t } = useApp();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const isEmpty = state.messages.length === 0;
  const hasApprovalDecision = ['approved', 'handoff', 'agentWorking', 'responseReady', 'denied'].includes(
    state.status
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.status, state.messages]);

  function handleSuggestionClick(id) {
    setInputValue(t(`chat.suggestionText${id.slice(-1)}`));
    inputRef.current?.focus();
  }

  function handleSend({ text, file }) {
    setInputValue('');
    submitQuery(text, file);
  }

  const message = state.messages[state.messages.length - 1];
  const showOrchestratorAnalyzing = state.status === 'analyzing' || state.status === 'submitted';
  const showDomain = ['domainIdentified', 'agentRecommended', 'awaitingApproval', ...['approved', 'handoff', 'agentWorking', 'responseReady', 'denied']].includes(
    state.status
  );
  const showRecommendation = state.status === 'agentRecommended' || state.status === 'awaitingApproval';
  const showApprovedStatus = hasApprovalDecision && state.status !== 'denied';
  const showHandoff = ['handoff', 'agentWorking', 'responseReady'].includes(state.status);
  const showResponseStatus = state.status === 'responseReady';

  return (
    <div className="chat-page">
      <div className="chat-scroll" ref={scrollRef}>
        {isEmpty ? (
          <div className="empty-state">
            <div className="empty-icon-wrap">
              <LegalIcon name="scales" size={30} strokeWidth={1.6} />
            </div>
            <h1 className="empty-heading">{t('chat.heading')}</h1>
            <p className="empty-subheading">{t('chat.subheading')}</p>
            <div className="suggestion-row">
              {SUGGESTIONS.map(({ id, icon }) => (
                <button
                  key={id}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => handleSuggestionClick(id)}
                >
                  <LegalIcon name={icon} size={15} strokeWidth={1.8} className="suggestion-icon" />
                  {t(`chat.${id}`)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="chat-container">
            {state.messages.slice(0, -1).map((m) =>
              m.role === 'assistant' ? (
                <AssistantMessage key={m.id} text={m.text} />
              ) : (
                <UserMessage key={m.id} text={m.text} file={m.file} />
              )
            )}
            {message.role === 'assistant' ? (
              <AssistantMessage text={message.text} />
            ) : (
              <UserMessage text={message.text} file={message.file} />
            )}

            {showOrchestratorAnalyzing && <OrchestratorCard />}

            {showDomain && state.domain && <DomainStatus domain={state.domain} />}

            {showRecommendation && state.recommendation && (
              <AgentRecommendation
                agent={state.recommendation.agent}
                reason={state.recommendation.reason}
                onAllow={approve}
                onDeny={deny}
              />
            )}

            {showApprovedStatus && state.recommendation && (
              <ExpandableStatus
                label={`${state.recommendation.agent.name} ${t('chat.approvedSuffix')}`}
                variant="success"
              >
                {t('chat.approvedBody')}
              </ExpandableStatus>
            )}

            {state.status === 'denied' && (
              <div className="denied-card">
                <div className="denied-title">
                  <LegalIcon name="x" size={15} strokeWidth={2} />
                  {t('chat.deniedTitle')}
                </div>
                <div className="denied-text">{state.denialMessage}</div>
                <button type="button" className="btn btn-primary" onClick={retry}>
                  {t('chat.tryDifferent')}
                </button>
              </div>
            )}

            {showHandoff && state.handoff && (
              <HandoffCard
                agent={state.handoff.targetAgent}
                contextSummary={state.handoff.contextSummary}
                working={state.status === 'agentWorking'}
              />
            )}

            {showResponseStatus && state.handoff && (
              <ExpandableStatus
                label={`${state.handoff.targetAgent.name} — ${t('chat.responseReadySuffix')}`}
                variant="success"
                defaultOpen
              >
                {t('chat.handoffBody')}
              </ExpandableStatus>
            )}

            {state.status === 'responseReady' && state.response && (
              <AgentResponse response={state.response} />
            )}

            {state.status === 'error' && (
              <div className="error-card">
                <LegalIcon name="alertTriangle" size={18} strokeWidth={2} />
                <div>
                  <div>{t('chat.errorBody')}</div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginTop: 10 }}
                    onClick={retry}
                  >
                    {t('chat.tryAgain')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="chat-input-wrap">
        <ChatInput
          ref={inputRef}
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          disabled={[
            'submitted',
            'analyzing',
            'domainIdentified',
            'approved',
            'handoff',
            'agentWorking',
          ].includes(state.status)}
          placeholder={t('chat.placeholder')}
        />
      </div>
    </div>
  );
}
