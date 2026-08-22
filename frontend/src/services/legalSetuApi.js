// Mock service layer for Legal Setu's Legal Orchestrator flow.
//
// Every function here is written to mirror the shape of a future real API call
// (async, returns a plain data object, can throw). Swap the internals for real
// `fetch`/axios calls to a Node/Express backend later without touching the UI.
//
// No mock/demo logic should live inside UI components — it all lives here.

import { AGENTS } from '../data/agents.js';

// ---- Tunable timing config (ms) — single source of truth for the demo pacing ----
export const ORCHESTRATION_DELAYS = {
  submitToAnalyzing: 1000,
  analyzingVisible: 1200,
  analyzingToDomain: 1200,
  domainToRecommendation: 800,
  allowToHandoff: 1000,
  handoffToWorking: 1500,
  workingToResponse: 1500,
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Very small keyword router used only to pick believable demo data.
// Not a real classifier — a stand-in for the future backend orchestrator.
function classify(queryText = '') {
  const text = queryText.toLowerCase();

  if (text.includes('contract') || text.includes('agreement') || text.includes('review')) {
    return 'contractReview';
  }

  // Default / canonical demo path: tenant & security deposit dispute.
  return 'tenantDeposit';
}

const DEMO_DATA = {
  tenantDeposit: {
    domain: 'Tenant / Landlord Dispute',
    topic: 'Security deposit refund',
    intent: 'Seeking actionable next steps',
    agentKey: 'caseGuidance',
    reason:
      'You need clear, actionable steps to recover your security deposit — not just an explanation of the law.',
    context: [
      'Tenant / landlord dispute',
      'Security deposit issue — refund withheld',
      'User requests next steps',
    ],
    response: {
      lead: 'Based on your situation, you may have a right to recover your security deposit.',
      steps: [
        'What your rental agreement says about the deposit.',
        'Whether the landlord gave a reason for withholding it.',
        'Whether there are written records of the request.',
        'Whether any applicable local rules set requirements for returning the deposit.',
      ],
      note:
        'You may want to gather your agreement, payment records, and communication with the landlord before deciding your next step.',
      actions: ['Upload Rental Agreement', 'Ask Follow-up', 'Summarize My Options'],
    },
  },
  contractReview: {
    domain: 'Contract Review',
    topic: 'Agreement clause analysis',
    intent: 'Seeking a review of contract terms before signing',
    agentKey: 'contractReview',
    reason:
      'You need a clause-by-clause review to spot risky or one-sided terms — not just general contract law explanation.',
    context: [
      'Contract review request',
      'Agreement not yet signed — pre-signature review',
      'User wants risky clauses flagged',
    ],
    response: {
      lead: 'Based on your request, here is how we can review your contract for potential risks.',
      steps: [
        'Confirm the parties, term, and termination conditions in the document.',
        'Check for one-sided indemnity, penalty, or auto-renewal clauses.',
        'Verify payment terms and any hidden fees or escalation clauses.',
        'Flag any unusual jurisdiction or dispute-resolution requirements.',
      ],
      note: 'Upload the contract document and we will walk through it clause by clause.',
      actions: ['Upload Contract', 'Ask Follow-up', 'Summarize My Options'],
    },
  },
};

/**
 * Submit the user's raw query to the orchestrator.
 * Returns a queryId that subsequent calls key off of.
 */
export async function submitQuery(queryText) {
  await wait(ORCHESTRATION_DELAYS.submitToAnalyzing);
  const demoKey = classify(queryText);
  return {
    queryId: `q_${Date.now()}`,
    queryText,
    demoKey,
  };
}

/**
 * Ask the orchestrator to identify the legal domain for a given query.
 */
export async function identifyDomain({ demoKey }) {
  await wait(ORCHESTRATION_DELAYS.analyzingToDomain);
  const data = DEMO_DATA[demoKey] || DEMO_DATA.tenantDeposit;
  return {
    domain: data.domain,
    topic: data.topic,
    intent: data.intent,
  };
}

/**
 * Ask the orchestrator to recommend a specialist agent for the identified domain.
 */
export async function recommendAgent({ demoKey }) {
  await wait(ORCHESTRATION_DELAYS.domainToRecommendation);
  const data = DEMO_DATA[demoKey] || DEMO_DATA.tenantDeposit;
  const agent = AGENTS[data.agentKey];
  return {
    agent,
    reason: data.reason,
  };
}

/**
 * User explicitly approves the recommended agent.
 */
export async function approveAgent({ demoKey, agentId }) {
  await wait(200);
  return { approved: true, agentId, demoKey };
}

/**
 * User explicitly denies the recommended agent.
 */
export async function denyAgent({ demoKey, agentId }) {
  await wait(200);
  return {
    approved: false,
    agentId,
    demoKey,
    fallbackMessage:
      "No problem — I won't hand this off. Would you like me to suggest a different specialist, or would you rather rephrase your question so I can re-analyze it?",
  };
}

/**
 * Perform the contextual handoff from the orchestrator to the approved specialist agent.
 * Returns the extracted case-context summary shown to the user (never raw chain-of-thought).
 */
export async function performHandoff({ demoKey }) {
  await wait(ORCHESTRATION_DELAYS.allowToHandoff);
  const data = DEMO_DATA[demoKey] || DEMO_DATA.tenantDeposit;
  return {
    contextSummary: data.context,
    targetAgent: AGENTS[data.agentKey],
  };
}

/**
 * Fetch the specialist agent's response after the handoff completes.
 */
export async function getAgentResponse({ demoKey }) {
  await wait(ORCHESTRATION_DELAYS.workingToResponse);
  const data = DEMO_DATA[demoKey] || DEMO_DATA.tenantDeposit;
  return {
    agent: AGENTS[data.agentKey],
    ...data.response,
  };
}
