import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Info, 
  HelpCircle, 
  Shield, 
  TrendingUp, 
  Brain, 
  Users, 
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Mail,
  Github,
  Twitter
} from 'lucide-react';

export const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is a prediction market?",
      answer: "A prediction market is a platform where people can bet on the outcome of future events. Prices in these markets reflect the crowd's collective belief about the probability of different outcomes. For example, if a market for 'Will Bitcoin reach $100,000 by end of 2025?' is trading at 65%, it means the market collectively believes there's a 65% chance this will happen."
    },
    {
      question: "How does the AI recommendation system work?",
      answer: "Our AI system analyzes multiple data sources including: historical price data, technical indicators (RSI, MACD, moving averages), sentiment analysis from news and social media, trading volume patterns, and market liquidity. It then generates a recommendation (YES, NO, or HOLD) along with a confidence score and risk assessment. The system uses machine learning models trained on historical market data to identify patterns and opportunities."
    },
    {
      question: "What do the risk scores mean?",
      answer: "Risk scores range from 0-100, where 0 is lowest risk and 100 is highest risk. The score considers factors like market volatility, time to resolution, liquidity, and information quality. Low Risk (0-30): Stable markets with high liquidity and clear information. Medium Risk (31-65): Moderate volatility with adequate liquidity. High Risk (66-100): Highly volatile or low liquidity markets with uncertain outcomes."
    },
    {
      question: "How accurate are the predictions?",
      answer: "Our AI system provides probabilities and recommendations based on available data, but no prediction system is 100% accurate. Historical performance shows our recommendations have an accuracy rate of approximately 65-75% depending on the market category. Always conduct your own research and never invest more than you can afford to lose. Past performance does not guarantee future results."
    },
    {
      question: "What are the technical indicators?",
      answer: "We display several technical indicators: RSI (Relative Strength Index) - Measures momentum, values over 70 indicate overbought, under 30 indicate oversold. Moving Averages - Show average price over time periods (7, 25, 99 days). MACD (Moving Average Convergence Divergence) - Shows trend strength and direction. Support/Resistance - Price levels where markets tend to bounce or reverse."
    },
    {
      question: "How is sentiment calculated?",
      answer: "Our sentiment analysis uses Natural Language Processing (NLP) to analyze news articles, social media posts, and market commentary related to each prediction market. The system assigns a sentiment score from -1 (very negative) to +1 (very positive). We aggregate sentiment from multiple sources and weight them by source credibility and recency."
    },
    {
      question: "What does liquidity mean?",
      answer: "Liquidity refers to how easy it is to buy or sell in a market without significantly affecting the price. High liquidity means you can trade larger amounts with minimal price impact. Low liquidity markets may have wider spreads and more volatile prices. We recommend focusing on markets with higher liquidity, especially for larger trades."
    },
    {
      question: "How often is data updated?",
      answer: "Market prices update in real-time via WebSocket connections. Technical indicators refresh every 5 minutes. Sentiment analysis updates hourly. News feeds update every 15 minutes. AI recommendations are regenerated whenever significant market changes occur or at least every 4 hours."
    },
    {
      question: "Can I trust the AI recommendations?",
      answer: "Our AI recommendations are tools to assist your decision-making, not financial advice. While our models are sophisticated and use proven algorithms, they cannot predict the future with certainty. External events, unexpected news, or market manipulation can affect outcomes. Always use recommendations as one input among many in your research process."
    },
    {
      question: "What fees are involved?",
      answer: "This platform displays market data and AI analysis. Trading fees depend on the underlying prediction market platform you use. Typical fees include: Trading fees (1-2% per transaction), Creator fees (0-5% set by market creator), and Platform fees (varies by platform). Always check the specific market's fee structure before trading."
    },
    {
      question: "How do I interpret the probability bars?",
      answer: "The probability bars show the market's current implied probability. Green portion = probability of YES outcome. Red portion = probability of NO outcome. The percentages should add up to approximately 100% (small differences may exist due to spreads). A larger green bar means the market believes YES is more likely."
    },
    {
      question: "What happens when a market resolves?",
      answer: "When the event outcome is determined, the market resolves to either YES or NO. If you predicted correctly, you receive $1 per share. If incorrect, your shares become worthless. For example, if you bought YES shares at $0.60 and the market resolves YES, you profit $0.40 per share. The resolution is typically handled by the underlying prediction market platform."
    }
  ];

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning models analyze market data, sentiment, and technical indicators to provide actionable insights.",
      color: "purple"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-Time Data",
      description: "Live price updates, trading volume, and market movements streamed directly to your dashboard via WebSocket connections.",
      color: "green"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Technical Indicators",
      description: "Professional-grade charting with RSI, MACD, moving averages, and support/resistance levels.",
      color: "blue"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Risk Assessment",
      description: "Comprehensive risk scoring considering volatility, liquidity, time horizons, and market conditions.",
      color: "yellow"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Sentiment Analysis",
      description: "NLP-powered sentiment tracking from news sources, social media, and market commentary.",
      color: "pink"
    },
    {
      icon: <Info className="w-6 h-6" />,
      title: "Educational Resources",
      description: "Learn about prediction markets, trading strategies, and how to interpret our AI recommendations.",
      color: "cyan"
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          About Prediction Market Predictor
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Empowering traders with AI-driven insights for smarter prediction market decisions
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="border-2 border-purple-500/50">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                We believe prediction markets are powerful tools for aggregating information and forecasting future events. 
                Our mission is to democratize access to sophisticated market analysis by combining artificial intelligence, 
                real-time data processing, and intuitive visualizations. Whether you're a seasoned trader or just getting started, 
                our platform provides the insights you need to make informed decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colorClasses = {
              purple: 'bg-purple-500/20 text-purple-400',
              green: 'bg-green-500/20 text-green-400',
              blue: 'bg-blue-500/20 text-blue-400',
              yellow: 'bg-yellow-500/20 text-yellow-400',
              pink: 'bg-pink-500/20 text-pink-400',
              cyan: 'bg-cyan-500/20 text-cyan-400'
            };
            const colorClass = colorClasses[feature.color] || 'bg-purple-500/20 text-purple-400';
            
            return (
              <Card key={index} className="hover:bg-white/5 transition">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-lg mb-4 ${colorClass.split(' ')[0]}`}>
                    <div className={colorClass.split(' ')[1]}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-2">Data Collection</h4>
                <p className="text-gray-400">
                  We aggregate data from multiple prediction market platforms, news sources, social media, and blockchain networks. 
                  Our systems process millions of data points in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-2">AI Analysis</h4>
                <p className="text-gray-400">
                  Machine learning models analyze historical patterns, technical indicators, sentiment signals, and market dynamics. 
                  Our algorithms identify opportunities and assess risks across thousands of markets.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-2">Recommendations</h4>
                <p className="text-gray-400">
                  The system generates clear recommendations (YES, NO, or HOLD) with confidence scores, risk assessments, 
                  and detailed reasoning. Each recommendation includes entry/exit strategies and monitoring checklists.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-2">Visualization</h4>
                <p className="text-gray-400">
                  Interactive charts, gauges, and dashboards present complex data in an intuitive format. 
                  Real-time updates keep you informed of market movements and sentiment shifts.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about prediction markets and our platform</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <h3 className="text-white font-semibold text-left">{faq.question}</h3>
                </div>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openFaq === index && (
                <div className="px-6 pb-6">
                  <div className="pl-8 pt-2 border-l-2 border-purple-500/30">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Important Disclaimers */}
      <Card className="border-2 border-yellow-500/50 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <AlertCircle className="w-6 h-6" />
            Important Disclaimers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              <strong>Not Financial Advice:</strong> All recommendations, analysis, and information provided on this platform 
              are for informational purposes only and should not be construed as financial advice.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              <strong>Do Your Own Research:</strong> Always conduct thorough research and consult with qualified professionals 
              before making any investment decisions.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              <strong>Risk Warning:</strong> Trading in prediction markets involves substantial risk of loss. 
              Never invest more than you can afford to lose.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              <strong>No Guarantees:</strong> Past performance is not indicative of future results. 
              Market conditions can change rapidly and unexpectedly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Frontend</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  React 19 with modern hooks
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  TanStack Query for data fetching
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Zustand for state management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Recharts for data visualization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Tailwind CSS for styling
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Backend & AI</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Machine Learning models (TensorFlow/PyTorch)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Natural Language Processing for sentiment
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  WebSocket for real-time updates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  RESTful API architecture
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Distributed data processing
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="border-2 border-purple-500/50">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400 mb-6">
            Have questions, feedback, or partnership opportunities? We'd love to hear from you.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button variant="primary" className="gap-2">
              <Mail className="w-4 h-4" />
              Contact Us
            </Button>
            <Button variant="secondary" className="gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </Button>
            <Button variant="secondary" className="gap-2">
              <Twitter className="w-4 h-4" />
              Twitter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Version Info */}
      <div className="text-center py-6 text-gray-500 text-sm">
        <p>Prediction Market Predictor v1.0.0</p>
        <p className="mt-1">Last updated: December 2025</p>
      </div>
    </div>
  );
};
