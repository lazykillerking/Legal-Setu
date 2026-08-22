import Link from "next/link";

const agents = [
  "Legal Query",
  "Legal Research",
  "Rights Advisor",
  "Case Guidance",
  "Document Generation",
  "Complaint & Filing",
  "Contract Review",
  "Safety",
];

export default function Home() {
  return (
    <div className="flex-1">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 text-center">
        <p className="inline-block rounded-full border border-white/15 px-3 py-1 text-xs tracking-wide text-white/60 mb-6">
          Grounded in the Indian Constitution &amp; verified legal sources
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-6">
          Understand your rights.
          <br />
          Navigate the law, in plain language.
        </h1>
        <p className="max-w-xl mx-auto text-white/70 mb-10">
          Legal Setu is an AI legal assistant that routes your question to the
          right specialist agent — from rights and research to document
          drafting and complaint filing.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center justify-center rounded-md bg-gold-400 text-navy-950 font-medium px-6 py-3 hover:bg-gold-300 transition-colors"
        >
          Start a conversation
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <h2 className="font-serif text-2xl mb-6 text-center">
          8 specialized agents, one orchestrator
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <div
              key={agent}
              className="rounded-lg border border-white/10 bg-navy-800 px-4 py-5 text-center text-sm text-white/80"
            >
              {agent}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-center text-xs text-white/40">
          Legal Setu is a prototype assistant and does not constitute legal
          advice. Always consult a qualified lawyer for your specific
          situation.
        </div>
      </section>
    </div>
  );
}
