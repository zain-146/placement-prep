import { useState, useEffect } from 'react'
import { TrendingUp, Calendar, CheckCircle2, Circle, AlertTriangle, Briefcase, User2 } from 'lucide-react'
import { getHistory, updateFinalScore, saveHistory } from '../utils/analysis'

function Dashboard() {
  const [history, setHistory] = useState([])
  const [activeEntry, setActiveEntry] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null)

  useEffect(() => {
    const data = getHistory()
    // Rule 5: show error if some were corrupted
    const rawCount = JSON.parse(localStorage.getItem("placement_prep_history") || "[]").length
    if (rawCount > data.length) {
      setErrorStatus("One saved entry couldn't be loaded. Create a new analysis.")
    }
    setHistory(data)
    if (data.length > 0) setActiveEntry(data[0])
  }, [])

  const handleToggleSkill = (skill) => {
    if (!activeEntry) return

    const newEntry = { ...activeEntry }
    const currentStatus = newEntry.skillConfidenceMap[skill]
    newEntry.skillConfidenceMap[skill] = currentStatus === "know" ? "practice" : "know"

    // Rule 4: finalScore changes based on skillConfidenceMap
    newEntry.finalScore = updateFinalScore(newEntry)
    newEntry.updatedAt = new Date().toISOString()

    setActiveEntry(newEntry)

    // Persist to history
    const newHistory = history.map(h => h.id === newEntry.id ? newEntry : h)
    setHistory(newHistory)
    localStorage.setItem("placement_prep_history", JSON.stringify(newHistory))
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <TrendingUp className="w-16 h-16 text-primary-200 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-primary-900 mb-2">No Analysis Yet</h2>
        <p className="text-gray-600 mb-8 mx-auto max-w-sm">
          Paste a job description on the home page to see your preparation readiness score.
        </p>
        <a href="/" className="inline-flex items-center text-primary-600 font-semibold hover:underline">
          Go to Home
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {errorStatus && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          <p className="text-sm font-medium">{errorStatus}</p>
        </div>
      )}

      {activeEntry && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 text-primary-600 font-medium mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span>Analysis for:</span>
                  </div>
                  <h1 className="text-3xl font-bold text-primary-900">
                    {activeEntry.role || "Software Engineer"} @ {activeEntry.company || "Target Company"}
                  </h1>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-primary-500">
                    {Math.round(activeEntry.finalScore)}%
                  </div>
                  <div className="text-xs uppercase font-bold text-gray-400 mt-1 letter tracking-widest">
                    Readiness Score
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                  <div className="text-2xl font-bold text-primary-900">{activeEntry.baseScore}%</div>
                  <div className="text-xs text-primary-600">Base Score</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <div className="text-2xl font-bold text-emerald-900">
                    {Object.values(activeEntry.skillConfidenceMap).filter(v => v === "know").length}
                  </div>
                  <div className="text-xs text-emerald-600">Skills Mastered</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <div className="text-2xl font-bold text-amber-900">
                    {Object.values(activeEntry.skillConfidenceMap).filter(v => v === "practice").length}
                  </div>
                  <div className="text-xs text-amber-600">To Practice</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-2xl font-bold text-gray-900">7 Days</div>
                  <div className="text-xs text-gray-600">Plan Duration</div>
                </div>
              </div>
            </div>

            {/* Preparation Checklists */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  Preparation Checklist
                </h3>
                <button
                  onClick={() => {
                    const text = activeEntry.checklist.map(r => `${r.roundTitle}:\n${r.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')
                    navigator.clipboard.writeText(text)
                  }}
                  className="text-xs font-bold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100 transition-colors"
                >
                  Copy Checklist
                </button>
              </div>
              <div className="space-y-6">
                {activeEntry.checklist.map((round) => (
                  <div key={round.roundTitle}>
                    <h4 className="font-semibold text-gray-900 mb-3">{round.roundTitle}</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {round.items.map((item, id) => (
                        <div key={id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Circle className="w-4 h-4 text-gray-300" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Questions */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                  Top Interview Questions
                </h3>
                <button
                  onClick={() => {
                    const text = activeEntry.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')
                    navigator.clipboard.writeText(text)
                  }}
                  className="text-xs font-bold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100 transition-colors"
                >
                  Copy Questions
                </button>
              </div>
              <div className="space-y-3">
                {activeEntry.questions.map((q, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm leading-relaxed">
                    <span className="font-bold text-primary-500 mr-2">Q{idx + 1}.</span>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skills & History */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Skills Detected</h3>
              <div className="space-y-6">
                {Object.entries(activeEntry.extractedSkills).map(([cat, skills]) => skills.length > 0 && (
                  <div key={cat}>
                    <h4 className="text-xs uppercase font-bold text-gray-400 mb-2 tracking-widest">{cat}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => handleToggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${activeEntry.skillConfidenceMap[skill] === "know"
                            ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                            : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                            }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-500" />
                History
              </h3>
              <div className="space-y-3">
                {history.map(h => (
                  <button
                    key={h.id}
                    onClick={() => setActiveEntry(h)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${activeEntry.id === h.id
                      ? "bg-primary-50 border-primary-200 ring-1 ring-primary-200"
                      : "border-gray-100 hover:border-gray-200"
                      }`}
                  >
                    <div className="font-bold text-sm text-primary-900 truncate">
                      {h.role || "Developer"} @ {h.company || "Unknown"}
                    </div>
                    <div className="text-[10px] text-primary-500 uppercase font-medium mt-1">
                      {new Date(h.createdAt).toLocaleDateString()} • {Math.round(h.finalScore)}% Match
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
