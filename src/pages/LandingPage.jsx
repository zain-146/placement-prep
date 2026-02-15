import { useNavigate } from 'react-router-dom'
import { Code, Video, BarChart3 } from 'lucide-react'

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6">
            Ace Your Placement
          </h1>
          <p className="text-xl md:text-2xl text-primary-700 mb-10">
            Practice, assess, and prepare for your dream job
          </p>
          <button
            onClick={() => navigate('/app')}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-10 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary-900 mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-primary-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
