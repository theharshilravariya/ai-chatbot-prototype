import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { usePreferenceStore } from '../store/preferenceStore';
import { Bell, Moon, Sun, Zap, Clock } from 'lucide-react';

export const SettingsPage = () => {
  const {
    riskTolerance,
    notifications,
    theme,
    defaultTimeframe,
    autoRefresh,
    refreshInterval,
    setRiskTolerance,
    setNotifications,
    setTheme,
    setDefaultTimeframe,
    setAutoRefresh,
    setRefreshInterval,
  } = usePreferenceStore();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your experience</p>
      </div>

      {/* Risk Tolerance */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Tolerance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-sm mb-4">
            Set your risk preference for AI recommendations
          </p>
          <div className="grid grid-cols-3 gap-4">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setRiskTolerance(level)}
                className={`p-4 rounded-lg border-2 transition ${
                  riskTolerance === level
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="text-center">
                  <div className={`text-2xl mb-2 ${
                    level === 'low' ? 'text-green-500' :
                    level === 'medium' ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {level === 'low' ? '🛡️' : level === 'medium' ? '⚖️' : '🚀'}
                  </div>
                  <p className="text-white font-medium capitalize">{level}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {level === 'low' ? 'Conservative' :
                     level === 'medium' ? 'Balanced' :
                     'Aggressive'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-gray-400 text-sm">Get alerts for market changes</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-14 h-7 rounded-full transition ${
                notifications ? 'bg-purple-600' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                theme === 'dark'
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <Moon className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Dark Mode</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                theme === 'light'
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <Sun className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Light Mode</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Data Refresh */}
      <Card>
        <CardHeader>
          <CardTitle>Data Refresh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">Auto Refresh</p>
                <p className="text-gray-400 text-sm">Automatically update market data</p>
              </div>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative w-14 h-7 rounded-full transition ${
                autoRefresh ? 'bg-purple-600' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  autoRefresh ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {autoRefresh && (
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-purple-400" />
                <p className="text-white font-medium">Refresh Interval</p>
              </div>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={10000}>10 seconds</option>
                <option value={30000}>30 seconds</option>
                <option value={60000}>1 minute</option>
                <option value={300000}>5 minutes</option>
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Default Timeframe */}
      <Card>
        <CardHeader>
          <CardTitle>Default Chart Timeframe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {['1h', '24h', '7d', '30d', '1y', 'all'].map((tf) => (
              <button
                key={tf}
                onClick={() => setDefaultTimeframe(tf)}
                className={`p-3 rounded-lg border-2 transition ${
                  defaultTimeframe === tf
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <span className="text-white font-medium uppercase">{tf}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button variant="primary" size="lg">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};
