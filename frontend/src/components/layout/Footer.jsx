export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">CounterSatta</h3>
            <p className="text-gray-400 text-sm">
              AI-powered prediction market analysis platform. Make informed decisions with real-time data and intelligent recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Markets</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">API</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Risk Disclosure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CounterSatta. All rights reserved. | Powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
};
