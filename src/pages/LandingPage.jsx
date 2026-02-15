import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Code, Video, BarChart3, AlertCircle } from 'lucide-react'
import { analyzeJD, saveHistory } from '../utils/analysis'

const features = [
  {
    icon: Code,
    title: 'Practice Problems',
    description: 'Solve curated coding challenges across multiple difficulty levels.',
  },
  {
    icon: Video,
    title: 'Mock Interviews',
    description: 'Experience realistic interview simulations with instant feedback.',
  },
  {
    icon: BarChart3,
    title: 'Track Progress',
    description: 'Monitor your improvement with detailed analytics and insights.',
  },
]

function LandingPage() {
  const navigate = useNavigate()
  const [jd, setJd] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = (e) => {
    e.preventDefault()
    if (!jd.trim()) return

    setIsAnalyzing(true)
    setTimeout(() => {
      const entry = analyzeJD(jd, company, role)
      saveHistory(entry)
      setIsAnalyzing(false)
      navigate('/app')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Ready to Ace Your <span className="text-primary-500">Placement?</span>
            </h1>
            <p className="text-xl text-primary-700 mb-10">
              Transform any Job Description into a personalized 7-day preparation roadmap.
            </p>

            <div className="hidden md:block">
              {features.slice(0, 1).map((f) => (
                <div key={f.title} className="flex gap-4 items-start mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <f.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900">{f.title}</h4>
                    <p className="text-primary-600 text-sm">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleAnalyze} className="bg-white p-8 rounded-2xl shadow-xl border border-primary-100">
            <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">Scan Job Description</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Paste Full JD *</label>
                  <span className={`text-[10px] uppercase font-bold ${jd.length < 200 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {jd.length} chars
                  </span>
                </div>
                <textarea
                  required
                  rows={6}
                  placeholder="Paste the job description here..."
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                />

                {jd.length > 0 && jd.length < 200 && (
                  <div className="mt-2 flex items-center gap-2 text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p className="text-xs">
                      This JD is too short to analyze deeply. Paste full JD for better output.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !jd.trim()}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Readiness'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-primary-200">
            © {new Date().getFullYear()} Placement Prep. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
