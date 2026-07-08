const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function runResearch(topic) {
  const res = await fetch(`${API_BASE}/api/research`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic })
  })

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}))
    throw new Error(detail.detail || `Request failed with status ${res.status}`)
  }

  return res.json()
}
