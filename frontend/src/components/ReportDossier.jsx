import { useState } from 'react'

function caseNumber(topic) {
  let hash = 0
  for (let i = 0; i < topic.length; i++) {
    hash = (hash * 31 + topic.charCodeAt(i)) % 9973
  }
  return `R-${String(hash).padStart(4, '0')}`
}

export default function ReportDossier({ result, onReset }) {
  const [showFieldNotes, setShowFieldNotes] = useState(false)
  const { topic, report, critic_response, search_results, research_data } = result

  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeUp">
      <div className="relative pt-6">
        {/* Sticky-note critique, clipped to the report's corner */}
        <div className="sticky-note absolute -top-2 right-4 sm:right-8 z-10 w-48 sm:w-56 -rotate-3 rounded-sm bg-teal px-4 py-3">
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink/70 mb-1">
            Critic&apos;s notes
          </p>
          <p className="font-display italic text-sm text-ink leading-snug line-clamp-6">
            {critic_response}
          </p>
        </div>

        {/* Parchment case file */}
        <div className="relative rounded-b-lg bg-parchment shadow-2xl">
          <div className="deckle-top h-3 bg-parchment" />
          <div className="px-6 sm:px-10 pt-4 pb-10">
            <div className="flex items-start justify-between border-b border-parchment-shadow pb-4 mb-6">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-soft/60">
                  Case {caseNumber(topic)} · Research Desk Dispatch
                </p>
                <h1 className="font-display text-2xl sm:text-3xl text-ink mt-1">{topic}</h1>
              </div>
              <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-ink-soft/30 rotate-12 shrink-0">
                <span className="font-mono text-[9px] text-ink-soft/50 uppercase">Filed</span>
                <span className="font-mono text-[9px] text-ink-soft/50 uppercase">Complete</span>
              </div>
            </div>

            <article className="font-body text-[15px] leading-relaxed text-ink-soft whitespace-pre-wrap">
              {report}
            </article>
          </div>
        </div>
      </div>

      {/* Field notes: raw agent output, collapsed by default */}
      <div className="mt-6 rounded-xl border border-ink-line bg-ink-soft overflow-hidden">
        <button
          onClick={() => setShowFieldNotes((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-teal-soft hover:text-teal transition-colors"
        >
          Field notes (raw search &amp; scrape output)
          <span aria-hidden="true">{showFieldNotes ? '−' : '+'}</span>
        </button>
        {showFieldNotes && (
          <div className="px-5 pb-5 space-y-4 font-mono text-xs text-ink-line">
            <div>
              <p className="text-cream mb-1">search_agent</p>
              <p className="whitespace-pre-wrap">{search_results}</p>
            </div>
            <div>
              <p className="text-cream mb-1">reader_agent</p>
              <p className="whitespace-pre-wrap">{research_data}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onReset}
          className="font-mono text-xs uppercase tracking-[0.15em] text-ink-line hover:text-cream transition-colors"
        >
          ← Open a new case
        </button>
      </div>
    </div>
  )
}
