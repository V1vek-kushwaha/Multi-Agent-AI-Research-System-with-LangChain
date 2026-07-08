const AGENTS = [
  { label: 'Search', note: 'scanning sources' },
  { label: 'Reader', note: 'scraping the best match' },
  { label: 'Writer', note: 'drafting the report' },
  { label: 'Critic', note: 'reviewing the draft' }
]

export default function AgentLoading({ topic }) {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-ink-line bg-ink-soft p-8 text-center animate-fadeUp">
      <p className="font-mono text-xs tracking-[0.2em] text-teal-soft uppercase mb-2">
        Case opened
      </p>
      <p className="font-display text-xl text-cream mb-8">
        Working the desk on <span className="text-amber-soft">&ldquo;{topic}&rdquo;</span>
      </p>

      <div className="flex items-center justify-center gap-3 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-amber animate-pulseDot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-3 text-left">
        {AGENTS.map((agent) => (
          <li
            key={agent.label}
            className="rounded-lg border border-ink-line bg-ink px-4 py-3"
          >
            <p className="font-mono text-sm text-cream">{agent.label}</p>
            <p className="font-mono text-xs text-ink-line mt-0.5">{agent.note}</p>
          </li>
        ))}
      </ul>

      <p className="font-mono text-xs text-ink-line mt-6">
        This can take a minute — the agents are actually reading things.
      </p>
    </div>
  )
}
