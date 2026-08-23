import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="page-wrap legal-doc">
      <Link to="/" className="legal-back-link">
        &larr; Back to Legal Setu
      </Link>

      <h1 className="page-title">Privacy Policy</h1>
      <p className="legal-meta">Last updated: 23 August 2026</p>

      <p>
        Legal Setu is a prototype built for All India Hackathon 2026 (Problem Statement PS-013)
        by team &ldquo;sudo rm -rf last_braincell&rdquo;. This policy explains what data we
        collect when you use Legal Setu, why we collect it, and what rights you have over it. By
        using Legal Setu you agree to the practices described here and in our{' '}
        <Link to="/terms">Terms of Service</Link>.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Legal Setu is an AI legal-assistance prototype that uses a Legal Orchestrator to route
        your plain-language legal questions to one of 8 specialized AI agents (query, research,
        rights, case guidance, document generation, complaint &amp; filing, contract review,
        safety). It is built and maintained by team sudo rm -rf last_braincell for a hackathon
        and is not a registered company or law firm. Questions about this policy:{' '}
        legalsetu.team@gmail.com.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li>
          Account information: email address and basic profile info when you sign in (via
          Supabase Auth, including Google OAuth if you choose it).
        </li>
        <li>
          Conversation content: the legal questions you type, uploaded documents/text you submit
          for review, and the agent responses generated for you, stored so you can revisit your
          history.
        </li>
        <li>Preferences: your selected language and interface settings (e.g. theme).</li>
        <li>
          Usage and device data: basic technical logs (browser type, timestamps, approximate
          activity) needed to operate and secure the service.
        </li>
      </ul>
      <p>
        We do not intentionally collect sensitive identifiers (Aadhaar, PAN, financial account
        numbers, etc.) &mdash; please avoid pasting these into your questions or documents.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To authenticate you and operate your account.</li>
        <li>
          To route your query through the Legal Orchestrator to the right specialized agent and
          retrieve relevant legal sources (RAG) to ground responses.
        </li>
        <li>To save your conversation history so you can return to it.</li>
        <li>To improve the accuracy and safety of Legal Setu&rsquo;s agents.</li>
        <li>To comply with legal obligations and enforce our Terms of Service.</li>
      </ul>
      <p>We do not sell your personal data.</p>

      <h2>4. Legal basis and your consent</h2>
      <p>
        We process personal data of users in India in line with the Digital Personal Data
        Protection Act, 2023 (DPDP Act). We rely on your consent, given when you create an
        account and use the service, as the basis for processing your data. You may withdraw
        consent at any time by deleting your account, though this may limit or end your access to
        Legal Setu.
      </p>

      <h2>5. Where your data is processed</h2>
      <ul>
        <li>
          Supabase (authentication, database, and storage of your account and conversation data,
          protected by row-level security).
        </li>
        <li>Lyzr.ai (orchestrates and runs the AI agents that generate responses to your queries).</li>
        <li>
          Wolfram (under consideration, for computational legal tasks such as deadline
          calculations &mdash; will only receive the minimum data needed for that calculation).
        </li>
      </ul>
      <p>
        These providers may process data outside India; we choose providers that offer
        appropriate security safeguards.
      </p>

      <h2>6. Data retention</h2>
      <p>
        We retain your account and conversation history for as long as your account is active, so
        you can access your past conversations. You can delete individual conversations or your
        entire account from Settings; deletion is generally permanent and we do not keep backups
        beyond what&rsquo;s needed for a short operational recovery window.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Under the DPDP Act and as a matter of good practice, you can: access the personal data we
        hold about you; correct inaccurate data; request erasure of your data or account; withdraw
        consent; and raise a grievance if you believe we&rsquo;ve mishandled your data. To exercise
        any of these, contact us or our Grievance Officer at legalsetu.team@gmail.com. As this is
        a hackathon prototype, this is a placeholder contact rather than a formally appointed
        Grievance Officer.
      </p>

      <h2>8. Cookies and local storage</h2>
      <p>
        We use browser local storage and cookies to keep you signed in (auth tokens via Supabase)
        and to remember preferences like theme and language. We do not use third-party
        advertising trackers.
      </p>

      <h2>9. Children&rsquo;s privacy</h2>
      <p>
        Legal Setu is not directed at children under 18. If you are under 18, please use Legal
        Setu only with the involvement of a parent or guardian, particularly before acting on any
        legal guidance.
      </p>

      <h2>10. Not a substitute for legal advice</h2>
      <p>
        Legal Setu&rsquo;s AI-generated responses are informational and help you understand legal
        concepts and next steps &mdash; they are not legal advice and do not create an
        attorney-client relationship. See our Terms of Service for details.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy at any time, at our sole discretion, without prior notice to
        you. The &ldquo;Last updated&rdquo; date above reflects the most recent revision &mdash;
        please check back periodically. Continued use of Legal Setu after a change means you
        accept the updated policy.
      </p>

      <h2>12. Contact us</h2>
      <p>
        Questions, requests, or complaints about this policy: legalsetu.team@gmail.com.
      </p>

      <div className="legal-doc-footer">
        <Link to="/terms">Read our Terms of Service &rarr;</Link>
      </div>
    </div>
  );
}
