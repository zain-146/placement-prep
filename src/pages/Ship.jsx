import { useState, useEffect } from 'react'
import { Lock, Rocket, ShieldAlert, ArrowLeft, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Ship() {
    const [isLocked, setIsLocked] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const saved = localStorage.getItem("prp_test_checklist")
        if (saved) {
            const checked = JSON.parse(saved)
            if (checked.length === 10) {
                setIsLocked(false)
            }
        }
    }, [])

    if (isLocked) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-10 h-10 text-amber-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shipping Locked</h1>
                        <p className="text-gray-600 mb-8">
                            Verification is incomplete. You must pass all 10 checklist tests before you can ship the application.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3 mb-8">
                            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-medium text-left">Fix all verification issues first.</p>
                        </div>
                        <button
                            onClick={() => navigate('/prp/07-test')}
                            className="flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Checklist
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center px-4 py-20">
            <div className="max-w-2xl w-full text-center text-white">
                <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl ring-4 ring-primary-700">
                    <Rocket className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-5xl font-black mb-6">Application Shipped</h1>
                <p className="text-xl text-primary-200 mb-12 max-w-lg mx-auto leading-relaxed">
                    Verification complete. All 10 tests passed. The application is ready for the repository.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-12">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                        <div key={i} className="flex items-center gap-2 bg-primary-950/30 border border-primary-700/50 p-3 rounded-xl">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-semibold text-primary-200">Test {i} Passed</span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="bg-white text-primary-900 font-bold py-4 px-10 rounded-2xl hover:bg-primary-50 transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
    )
}

export default Ship
