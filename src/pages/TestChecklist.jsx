import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, RotateCcw, ShieldAlert, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TEST_ITEMS = [
    { id: 1, label: "JD required validation works", hint: "Try analyzing with empty JD" },
    { id: 2, label: "Short JD warning shows for <200 chars", hint: "Paste <200 chars and check amber warning" },
    { id: 3, label: "Skills extraction groups correctly", hint: "Check if React is in Web, SQL in Data, etc." },
    { id: 4, label: "Round mapping changes based on company + skills", hint: "Check online assessment vs technical rounds" },
    { id: 5, label: "Score calculation is deterministic", hint: "Same JD should yield same baseScore" },
    { id: 6, label: "Skill toggles update score live", hint: "Check if finalScore changes in Dashboard" },
    { id: 7, label: "Changes persist after refresh", hint: "Toggle a skill and refresh the page" },
    { id: 8, label: "History saves and loads correctly", hint: "Multiple analyses should show in Sidebar" },
    { id: 9, label: "Export buttons copy the correct content", hint: "Check questions/checklist copy logic" },
    { id: 10, label: "No console errors on core pages", hint: "Inspect devtools on Home and Dashboard" },
]

function TestChecklist() {
    const [checked, setChecked] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const saved = localStorage.getItem("prp_test_checklist")
        if (saved) setChecked(JSON.parse(saved))
    }, [])

    const toggleItem = (id) => {
        const newChecked = checked.includes(id)
            ? checked.filter(i => i !== id)
            : [...checked, id]
        setChecked(newChecked)
        localStorage.setItem("prp_test_checklist", JSON.stringify(newChecked))
    }

    const resetChecklist = () => {
        setChecked([])
        localStorage.removeItem("prp_test_checklist")
    }

    const passedCount = checked.length

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary-900 p-8 text-white">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Verification Checklist</h1>
                            <button
                                onClick={resetChecklist}
                                className="flex items-center gap-2 text-sm bg-primary-800 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors border border-primary-700"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>
                        </div>

                        <div className="flex items-center justify-between bg-primary-800 p-4 rounded-xl border border-primary-700">
                            <div className="text-sm font-medium text-primary-200">Tests Passed:</div>
                            <div className="text-3xl font-bold">{passedCount} / 10</div>
                        </div>

                        {passedCount < 10 && (
                            <div className="mt-4 flex items-center gap-2 text-amber-300 text-sm bg-amber-950/30 p-3 rounded-lg border border-amber-900/50">
                                <ShieldAlert className="w-4 h-4" />
                                <span>Fix issues before shipping.</span>
                            </div>
                        )}
                    </div>

                    {/* List */}
                    <div className="p-8">
                        <div className="space-y-4">
                            {TEST_ITEMS.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => toggleItem(item.id)}
                                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${checked.includes(item.id)
                                        ? "bg-emerald-50 border-emerald-200"
                                        : "bg-white border-gray-100 hover:border-gray-200"
                                        }`}
                                >
                                    <div className="mt-1">
                                        {checked.includes(item.id) ? (
                                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-gray-300" />
                                        )}
                                    </div>
                                    <div>
                                        <div className={`font-semibold ${checked.includes(item.id) ? "text-emerald-900" : "text-gray-900"}`}>
                                            {item.label}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {item.hint}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 italic text-sm text-gray-400 text-center">
                            Items are stored in localStorage and persist on refresh.
                        </div>

                        <button
                            onClick={() => navigate('/prp/proof')}
                            className={`w-full mt-6 flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-all shadow-lg ${passedCount === 10
                                    ? "bg-primary-600 hover:bg-primary-700 text-white"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Next: Provide Proof Artifacts
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestChecklist
