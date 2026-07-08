export default function ResearchForm({ topic, setTopic, onSubmit, disabled }) {
  function handleSubmit(e) {
    e.preventDefault()
    if (!topic.trim() || disabled) return
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto rounded-xl border border-ink-line bg-ink-soft p-6 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
    >
      <p className="font-mono text-xs tracking-[0.2em] text-teal-soft uppercase mb-3">
        Field Request · Form R-1
      </p>
      <label htmlFor="topic" className="block font-display text-2xl sm:text-3xl text-cream mb-4">
        What should the desk investigate?
      </label>
      <input
        id="topic"
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. the economic impact of vertical farming"
        disabled={disabled}
        autoComplete="off"
        className="w-full bg-transparent border-b-2 border-ink-line focus:border-amber outline-none text-cream placeholder:text-ink-line font-body text-lg py-2 transition-colors disabled:opacity-50"
      />
      <div className="flex items-center justify-between mt-6">
        <span className="font-mono text-xs text-ink-line">
          4 agents on standby · search · read · write · critique
        </span>
        <button
          type="submit"
          disabled={disabled || !topic.trim()}
          className="group relative inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 font-body font-semibold text-ink transition-all hover:bg-amber-soft hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-amber"
        >
          Begin investigation
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </form>
  )
}
