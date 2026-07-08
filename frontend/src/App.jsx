import { useState } from 'react'
import ResearchForm from './components/ResearchForm.jsx'
import AgentLoading from './components/AgentLoading.jsx'
import ReportDossier from './components/ReportDossier.jsx'
import { runResearch } from './api.js'

export default function App() {
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  async function handleSubmit() {
    setStatus('loading')
    setError('')
    try {
      const data = await runResearch(topic)
      setResult(data)
      setStatus('done')
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setStatus('error')
    }
  }

  function handleReset() {
    setTopic('')
    setResult(null)
    setStatus('idle')
    setError('')
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <header className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-teal-soft mb-3">
          Multi-Agent Research System
        </p>
        <h1 className="font-display text-4xl sm:text-5xl">The Research Desk</h1>
        <p className="font-body text-ink-line mt-3 max-w-md mx-auto">
          Four agents, one desk. Send a topic and get back a written report with an
          editor&apos;s critique attached.
        </p>
      </header>

      <main className="px-6 pb-20">
        {status === 'idle' && (
          <ResearchForm topic={topic} setTopic={setTopic} onSubmit={handleSubmit} disabled={false} />
        )}

        {status === 'loading' && <AgentLoading topic={topic} />}

        {status === 'error' && (
          <div className="w-full max-w-2xl mx-auto rounded-xl border border-amber/40 bg-ink-soft p-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-amber-soft mb-2">
              The case stalled
            </p>
            <p className="font-body text-cream mb-6">{error}</p>
            <button
              onClick={() => setStatus('idle')}
              className="font-mono text-xs uppercase tracking-[0.15em] text-ink-line hover:text-cream transition-colors"
            >
              ← Try again
            </button>
          </div>
        )}

        {status === 'done' && result && (
          <ReportDossier result={result} onReset={handleReset} />
        )}
      </main>
    </div>
  )
}
