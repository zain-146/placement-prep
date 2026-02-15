import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, Link2, Copy, Github, Globe, ExternalLink, ArrowRight } from 'lucide-react'

const CORE_STEPS = [
    { id: 1, label: "JD Data Modeling", description: "Structured schema for job data" },
    { id: 2, label: "Strict Input Validation", description: "Required fields & length warnings" },
    { id: 3, label: "Skill Classification Engine", description: "Categorized skill extraction" },
    { id: 4, label: "Readiness Scoring Logic", description: "Deterministic base & final scores" },
    { id: 5, label: "Preparation Roadmap", description: "Personalized 7-day plan" },
    { id: 6, label: "Interview Question Bank", description: "Role-specific question generation" },
    { id: 7, label: "History Persistence", description: "localStorage data management" },
    { id: 8, label: "Robust Data Handling", description: "Corruption detection & cleanup" },
]

function Proof() {
    const navigate = useNavigate()
    const [links, setLinks] = useState({
        lovable: "",
        github: "",
        deployed: ""
    })
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("prp_final_submission")
        if (saved) setLinks(JSON.parse(saved))
    }, [])

    const handleInputChange = (field, value) => {
        const newLinks = { ...links, [field]: value }
        setLinks(newLinks)
        localStorage.setItem("prp_final_submission", JSON.stringify(newLinks))
    }

    const isValidUrl = (url) => {
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    const isFormValid = isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deployed)

    const copySubmission = () => {
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-primary-900 p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">Final Proof of Work</h1>
                        <p className="text-primary-200">Verify your implementation and provide repository links.</p>
                    </div>

                    <div className="p-8 space-y-10">
                        {/* Step Completion Overview */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary-500" />
                                Step Completion Overview
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {CORE_STEPS.map((step) => (
                                    <div key={step.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="bg-emerald-100 p-1.5 rounded-full">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900">{step.label}</div>
                                            <div className="text-[10px] text-gray-500 uppercase font-medium">{step.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Artifact Inputs */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Link2 className="w-5 h-5 text-primary-500" />
                                Artifact Inputs
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        Lovable Project Link
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://lovable.dev/projects/..."
                                        value={links.lovable}
                                        onChange={(e) => handleInputChange('lovable', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border ${links.lovable && !isValidUrl(links.lovable) ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 outline-none transition-all`}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Github className="w-4 h-4" />
                                        GitHub Repository Link
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/..."
                                        value={links.github}
                                        onChange={(e) => handleInputChange('github', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border ${links.github && !isValidUrl(links.github) ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 outline-none transition-all`}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <ExternalLink className="w-4 h-4" />
                                        Deployed URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={links.deployed}
                                        onChange={(e) => handleInputChange('deployed', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border ${links.deployed && !isValidUrl(links.deployed) ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 outline-none transition-all`}
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                onClick={copySubmission}
                                disabled={!isFormValid}
                                className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-2xl transition-all ${isFormValid
                                        ? "bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-transparent"
                                    }`}
                            >
                                <Copy className="w-5 h-5" />
                                {copied ? "Copied!" : "Copy Final Submission"}
                            </button>

                            <button
                                onClick={() => navigate('/prp/08-ship')}
                                disabled={!isFormValid}
                                className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-2xl transition-all shadow-lg ${isFormValid
                                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Go to Ship
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Proof
