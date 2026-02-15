import { useState, useEffect } from 'react'
import { Lock, Rocket, ShieldAlert, ArrowLeft, CheckCircle, Trophy, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Ship() {
    const [status, setStatus] = useState("In Progress")
    const [checklistPassed, setChecklistPassed] = useState(false)
    const [proofProvided, setProofProvided] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const checklistSaved = localStorage.getItem("prp_test_checklist")
        const proofSaved = localStorage.getItem("prp_final_submission")

        let isChecklistReady = false
        let isProofReady = false

        if (checklistSaved) {
            const checked = JSON.parse(checklistSaved)
            if (checked.length === 10) isChecklistReady = true
        }

        if (proofSaved) {
            const links = JSON.parse(proofSaved)
            const isValid = (url) => {
                try { return !!new URL(url) } catch { return false }
            }
            if (isValid(links.lovable) && isValid(links.github) && isValid(links.deployed)) {
                isProofReady = true
            }
        }

        setChecklistPassed(isChecklistReady)
        setProofProvided(isProofReady)

        if (isChecklistReady && isProofReady) {
            setStatus("Shipped")
        } else {
            setStatus("In Progress")
        }
    }, [])

    if (status !== "Shipped") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-10 h-10 text-amber-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shipping Locked</h1>
                        <p className="text-gray-600 mb-8">
                            Application status is currently <b>{status}</b>. Complete all verification layers to unlock shipping.
                        </p>

                        <div className="space-y-3 mb-8">
                            <div className={`p-3 rounded-xl border flex items-center justify-between ${checklistPassed ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                <span className="text-sm font-bold">10/10 Test Checklist</span>
                                {checklistPassed ? <CheckCircle className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                            </div>
                            <div className={`p-3 rounded-xl border flex items-center justify-between ${proofProvided ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                <span className="text-sm font-bold">Proof Artifacts Provided</span>
                                {proofProvided ? <CheckCircle className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/prp/07-test')}
                            className="flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Return to Verification
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-emerald-900 flex items-center justify-center px-4 py-20 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 animate-bounce"><Sparkles className="w-20 h-20 text-white" /></div>
                <div className="absolute bottom-10 right-10 animate-pulse"><Rocket className="w-32 h-32 text-white" /></div>
            </div>

            <div className="max-w-2xl w-full text-center text-white relative z-10">
                <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl ring-8 ring-emerald-500/30 animate-in zoom-in duration-700">
                    <Trophy className="w-16 h-16 text-white" />
                </div>

                <div className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-300 font-bold text-xs uppercase tracking-widest mb-6">
                    Project Status: {status}
                </div>

                <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                    You built a <span className="text-emerald-400">real product.</span>
                </h1>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl mb-12 text-left">
                    <p className="text-xl md:text-2xl text-primary-50 mb-6 italic leading-relaxed">
                        "Not a tutorial. Not a clone. A structured tool that solves a real problem."
                    </p>
                    <p className="text-emerald-400 font-bold text-lg">
                        This is your proof of work.
                    </p>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="bg-white text-primary-900 font-black py-5 px-12 rounded-2xl hover:bg-primary-50 transition-all shadow-2xl hover:scale-110 active:scale-95 text-lg"
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
    )
}

export default Ship
