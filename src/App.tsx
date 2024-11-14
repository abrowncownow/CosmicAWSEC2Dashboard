import React, { useState } from 'react';
import { Rocket, RefreshCcw, Clock } from 'lucide-react';
import AccountSection from './components/AccountSection';
import AddAccountModal from './components/AddAccountModal';
import { useAWSAccounts, RefreshInterval } from './hooks/useAWSAccounts';
import { formatDistanceToNow } from 'date-fns';

const REFRESH_INTERVALS: { value: RefreshInterval; label: string }[] = [
  { value: 5, label: '5 seconds' },
  { value: 30, label: '30 seconds' },
  { value: 60, label: '1 minute' },
  { value: 120, label: '2 minutes' },
  { value: 300, label: '5 minutes' },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<RefreshInterval>(30);
  const { accounts, loading, error, addAccount, refreshAccounts, lastRefresh } = useAWSAccounts(refreshInterval);

  return (
    <div className="min-h-screen bg-slate-900 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen backdrop-blur-sm bg-slate-900/70">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <Rocket className="w-10 h-10 text-indigo-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Cosmic AWS Monitor</h1>
                <p className="text-slate-400">EC2 Instance Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>Last update: {formatDistanceToNow(lastRefresh, { addSuffix: true })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="refresh-interval" className="sr-only">Refresh Interval</label>
                <select
                  id="refresh-interval"
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value) as RefreshInterval)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                  aria-label="Refresh Interval"
                >
                  {REFRESH_INTERVALS.map(interval => (
                    <option key={interval.value} value={interval.value}>
                      Refresh every {interval.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
              >
                Add AWS Account
              </button>
              <button
                onClick={refreshAccounts}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <h3 className="text-slate-400 mb-2">Total Instances</h3>
              <p className="text-3xl font-bold text-white">
                {accounts.reduce((acc, account) => acc + account.instances.length, 0)}
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <h3 className="text-slate-400 mb-2">Active Instances</h3>
              <p className="text-3xl font-bold text-white">
                {accounts.reduce((acc, account) => 
                  acc + account.instances.filter(i => i.state === 'running').length, 0
                )}
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <h3 className="text-slate-400 mb-2">Total Cost</h3>
              <p className="text-3xl font-bold text-white">
                ${accounts.reduce((acc, account) => acc + account.totalCost, 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Accounts */}
          {accounts.map(account => (
            <AccountSection key={account.id} account={account} />
          ))}
        </div>
      </div>

      <AddAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addAccount}
      />
    </div>
  );
}

export default App;