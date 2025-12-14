import './App.css'
import { HyperText } from './components/ui/hyper-text'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <HyperText 
          className="text-2xl font-bold text-white py-0" 
          duration={600}
          animateOnHover={true}
        >
          CounterSatta
        </HyperText>
        <div className="flex gap-6">
          <button className="text-white hover:text-purple-300 transition">
            Markets
          </button>
          <button className="text-white hover:text-purple-300 transition">
            How It Works
          </button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center space-y-8">
          <div>
            <HyperText 
              className="text-6xl font-bold text-white leading-tight inline-block"
              duration={1000}
              delay={300}
              startOnView={false}
            >
              Predict the Future
            </HyperText>
            <br />
            <HyperText 
              className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block mt-2"
              duration={1000}
              delay={800}
              startOnView={false}
            >
              Earn Rewards
            </HyperText>
          </div>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the world's most accurate prediction market. Make forecasts on real-world events and earn rewards for being right.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <button className="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition transform hover:scale-105">
              Start Trading
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10">
            <div className="text-4xl mb-4">📊</div>
            <HyperText 
              className="text-xl font-semibold text-white mb-2 py-1"
              duration={600}
              startOnView={true}
            >
              Real-Time Markets
            </HyperText>
            <p className="text-gray-400">
              Trade on live prediction markets with real-time odds and instant settlements.
            </p>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10">
            <div className="text-4xl mb-4">🎯</div>
            <HyperText 
              className="text-xl font-semibold text-white mb-2 py-1"
              duration={600}
              startOnView={true}
              delay={100}
            >
              Accurate Forecasts
            </HyperText>
            <p className="text-gray-400">
              Harness the wisdom of crowds for the most accurate event predictions.
            </p>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10">
            <div className="text-4xl mb-4">💰</div>
            <HyperText 
              className="text-xl font-semibold text-white mb-2 py-1"
              duration={600}
              startOnView={true}
              delay={200}
            >
              Earn Rewards
            </HyperText>
            <p className="text-gray-400">
              Get rewarded for making accurate predictions and sharing your insights.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mt-24 text-center">
          <div>
            <div className="text-4xl font-bold text-white">$10M+</div>
            <div className="text-gray-400 mt-2">Trading Volume</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">50K+</div>
            <div className="text-gray-400 mt-2">Active Traders</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">1000+</div>
            <div className="text-gray-400 mt-2">Markets</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">92%</div>
            <div className="text-gray-400 mt-2">Accuracy Rate</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-12 mt-24 border-t border-white/10">
        <div className="text-center text-gray-400">
          <p>&copy; 2025 CounterSatta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
