const agentStatus = [
  { name: "Legal Query", status: "idle" },
  { name: "Legal Research", status: "idle" },
  { name: "Rights Advisor", status: "idle" },
  { name: "Case Guidance", status: "idle" },
  { name: "Document Generation", status: "idle" },
  { name: "Complaint & Filing", status: "idle" },
  { name: "Contract Review", status: "idle" },
  { name: "Safety", status: "idle" },
];

const caseHistory = [
  "Tenant deposit dispute",
  "Consumer complaint — e-commerce",
  "Employment termination query",
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-6 border-r border-white/10 bg-navy-900 p-5 overflow-y-auto">
      <div>
        <h2 className="text-xs uppercase tracking-wide text-white/40 mb-3">
          Agent status
        </h2>
        <ul className="space-y-2">
          {agentStatus.map((agent) => (
            <li
              key={agent.name}
              className="flex items-center justify-between text-sm text-white/80"
            >
              <span>{agent.name}</span>
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                {agent.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xs uppercase tracking-wide text-white/40 mb-3">
          Case history
        </h2>
        <ul className="space-y-2">
          {caseHistory.map((item) => (
            <li
              key={item}
              className="rounded-md px-3 py-2 text-sm text-white/70 bg-navy-800 hover:bg-navy-700 cursor-pointer transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
