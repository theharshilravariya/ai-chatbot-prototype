import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { getRiskColor, getRiskLabel } from '../../lib/formatters';

export const RiskGauge = ({ riskScore }) => {
  if (riskScore === null || riskScore === undefined) {
    return null;
  }

  const getRiskDegrees = (score) => {
    // Convert 0-100 score to -90 to 90 degrees for a semicircle gauge
    return (score / 100) * 180 - 90;
  };

  const degrees = getRiskDegrees(riskScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Gauge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-square max-w-xs mx-auto">
          {/* Gauge Background */}
          <svg viewBox="0 0 200 120" className="w-full h-full">
            {/* Background Arc - Low Risk */}
            <path
              d="M 20 100 A 80 80 0 0 1 66.67 28.67"
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              opacity="0.3"
            />
            {/* Background Arc - Medium Risk */}
            <path
              d="M 66.67 28.67 A 80 80 0 0 1 133.33 28.67"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="20"
              opacity="0.3"
            />
            {/* Background Arc - High Risk */}
            <path
              d="M 133.33 28.67 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#ef4444"
              strokeWidth="20"
              opacity="0.3"
            />
            
            {/* Needle */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${degrees} 100 100)`}
              className="transition-transform duration-700"
            />
            
            {/* Center Circle */}
            <circle cx="100" cy="100" r="8" fill="#8b5cf6" />
          </svg>

          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
            <span className={`text-6xl font-bold ${getRiskColor(riskScore)}`}>
              {riskScore}
            </span>
            <span className="text-gray-400 text-sm mt-1">
              {getRiskLabel(riskScore)}
            </span>
          </div>
        </div>

        {/* Risk Levels Legend */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="text-center">
            <div className="w-full h-2 bg-green-500 rounded mb-1"></div>
            <span className="text-xs text-gray-400">0-30</span>
          </div>
          <div className="text-center">
            <div className="w-full h-2 bg-yellow-500 rounded mb-1"></div>
            <span className="text-xs text-gray-400">30-60</span>
          </div>
          <div className="text-center">
            <div className="w-full h-2 bg-red-500 rounded mb-1"></div>
            <span className="text-xs text-gray-400">60-100</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
