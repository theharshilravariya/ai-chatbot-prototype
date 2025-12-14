import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { getRiskColor, getRiskLabel, getDecisionColor, formatTimeAgo } from '../../lib/formatters';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export const RecommendationCard = ({ recommendation, compact = false }) => {
  if (!recommendation) {
    return (
      <Card>
        <CardContent>
          <p className="text-gray-400 text-center py-8">No recommendation available</p>
        </CardContent>
      </Card>
    );
  }

  const getDecisionIcon = (decision) => {
    switch (decision) {
      case 'YES':
        return <CheckCircle className="w-6 h-6" />;
      case 'NO':
        return <XCircle className="w-6 h-6" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getDecisionBgColor = (decision) => {
    switch (decision) {
      case 'YES':
        return 'bg-green-500/20 border-green-500/50';
      case 'NO':
        return 'bg-red-500/20 border-red-500/50';
      default:
        return 'bg-gray-500/20 border-gray-500/50';
    }
  };

  const getDecisionTextColor = (decision) => {
    switch (decision) {
      case 'YES':
        return 'text-green-500';
      case 'NO':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Compact version for list views
  if (compact) {
    return (
      <div className="border-2 border-purple-500/20 rounded-lg p-4 bg-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={getDecisionTextColor(recommendation.decision)}>
              {getDecisionIcon(recommendation.decision)}
            </div>
            <div>
              <span className={`text-xl font-bold ${getDecisionTextColor(recommendation.decision)}`}>
                {recommendation.decision === 'YES' ? 'BUY YES' : recommendation.decision === 'NO' ? 'BUY NO' : 'HOLD'}
              </span>
              <span className="text-gray-400 text-sm ml-3">
                Confidence: {(recommendation.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <Badge variant={recommendation.riskScore < 30 ? 'success' : recommendation.riskScore < 60 ? 'warning' : 'danger'}>
            Risk: {recommendation.riskScore}
          </Badge>
        </div>
        
        <p className="text-gray-300 text-sm line-clamp-2">
          {recommendation.reasoning}
        </p>
      </div>
    );
  }

  return (
    <Card className="border-2 border-purple-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Recommendation</CardTitle>
          <span className="text-gray-400 text-xs">
            Updated {formatTimeAgo(recommendation.generatedAt)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Decision */}
        <div className={`border-2 rounded-xl p-6 mb-6 ${getDecisionBgColor(recommendation.decision)}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={getDecisionTextColor(recommendation.decision)}>
              {getDecisionIcon(recommendation.decision)}
            </div>
            <h3 className={`text-3xl font-bold ${getDecisionTextColor(recommendation.decision)}`}>
              {recommendation.decision === 'YES' ? 'BUY YES' : recommendation.decision === 'NO' ? 'BUY NO' : 'HOLD'}
            </h3>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-300 text-sm">Confidence:</span>
            <span className="text-white text-xl font-bold">
              {(recommendation.confidence * 100).toFixed(0)}%
            </span>
          </div>
          
          {/* Confidence Bar */}
          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
              style={{ width: `${recommendation.confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Risk Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-semibold">Risk Assessment</h4>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getRiskColor(recommendation.riskScore)}`}>
                {recommendation.riskScore}
              </span>
              <Badge variant={recommendation.riskScore < 30 ? 'success' : recommendation.riskScore < 60 ? 'warning' : 'danger'}>
                {getRiskLabel(recommendation.riskScore)}
              </Badge>
            </div>
          </div>
          
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all ${
                recommendation.riskScore < 30 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : recommendation.riskScore < 60 
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
                  : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}
              style={{ width: `${recommendation.riskScore}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        {/* Reasoning */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Reasoning
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {recommendation.reasoning}
          </p>
        </div>

        {/* Caveats */}
        {recommendation.caveats && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Important Considerations
            </h4>
            <p className="text-gray-300 text-sm">
              {recommendation.caveats}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant={recommendation.decision === 'YES' ? 'success' : 'secondary'}>
            Trade Yes
          </Button>
          <Button variant={recommendation.decision === 'NO' ? 'danger' : 'secondary'}>
            Trade No
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
