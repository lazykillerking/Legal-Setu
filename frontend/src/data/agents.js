// Central registry of all 8 Legal Setu specialist agents.
// Icons reference keys rendered by <LegalIcon name="..." /> (see components/LegalIcon.jsx).
// Only the agent(s) relevant to the active demo flow are ever shown to the user at once —
// the orchestrator recommends exactly one agent per query.

export const AGENTS = {
  legalQuery: {
    id: 'legalQuery',
    name: 'Legal Query Agent',
    description: 'Answers direct legal questions in plain language.',
    specialization: 'General legal Q&A grounded in the Constitution and verified statutes.',
    icon: 'scales',
    accent: '#2563EB',
  },
  legalResearch: {
    id: 'legalResearch',
    name: 'Legal Research Agent',
    description: 'Finds and summarizes relevant laws, sections, and precedent.',
    specialization: 'Deep-dive statutory and case-law research.',
    icon: 'search',
    accent: '#2563EB',
  },
  rights: {
    id: 'rights',
    name: 'Rights Agent',
    description: 'Explains your constitutional and statutory rights.',
    specialization: 'Fundamental rights, consumer rights, tenant rights, labor rights.',
    icon: 'shield',
    accent: '#16A34A',
  },
  caseGuidance: {
    id: 'caseGuidance',
    name: 'Case Guidance Agent',
    description: 'Step-by-step guidance for your situation.',
    specialization: 'Practical, sequential next steps tailored to your case.',
    icon: 'compass',
    accent: '#2563EB',
  },
  documentGeneration: {
    id: 'documentGeneration',
    name: 'Document Generation Agent',
    description: 'Drafts legal notices, letters, and applications.',
    specialization: 'Structured legal document drafting.',
    icon: 'document',
    accent: '#2563EB',
  },
  complaintFiling: {
    id: 'complaintFiling',
    name: 'Complaint & Filing Agent',
    description: 'Helps prepare and file complaints with the right authority.',
    specialization: 'Consumer forums, police complaints, RTI, grievance portals.',
    icon: 'fileText',
    accent: '#D97706',
  },
  contractReview: {
    id: 'contractReview',
    name: 'Contract Review Agent',
    description: 'Reviews agreements and flags risky clauses.',
    specialization: 'Rental, employment, and vendor contract analysis.',
    icon: 'contract',
    accent: '#2563EB',
  },
  safety: {
    id: 'safety',
    name: 'Safety Agent',
    description: 'Adds disclaimers and flags sensitive or urgent content.',
    specialization: 'Legal-advice-sounding output review and safety disclaimers.',
    icon: 'headset',
    accent: '#DC2626',
  },
};

export const AGENT_LIST = Object.values(AGENTS);
