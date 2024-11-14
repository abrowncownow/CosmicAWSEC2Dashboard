import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (credentials: AWSCredentials) => void;
}

export interface AWSCredentials {
  accountName: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

const AWS_REGIONS = [
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'eu-west-1',
  'eu-west-2',
  'eu-central-1',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1'
];

export default function AddAccountModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState<AWSCredentials>({
    accountName: '',
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Here you would typically validate the AWS credentials
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onAdd(formData);
      onClose();
    } catch (err) {
      setError('Failed to validate AWS credentials. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">Add AWS Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="accountName" className="block text-sm font-medium text-slate-300 mb-1">
              Account Name
            </label>
            <input
              id="accountName"
              type="text"
              value={formData.accountName}
              onChange={e => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g., Production"
              required
            />
          </div>

          <div>
            <label htmlFor="accessKeyId" className="block text-sm font-medium text-slate-300 mb-1">
              AWS Access Key ID
            </label>
            <input
              id="accessKeyId"
              type="text"
              value={formData.accessKeyId}
              onChange={e => setFormData(prev => ({ ...prev, accessKeyId: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="AKIA..."
              required
            />
          </div>

          <div>
            <label htmlFor="secretAccessKey" className="block text-sm font-medium text-slate-300 mb-1">
              AWS Secret Access Key
            </label>
            <input
              id="secretAccessKey"
              type="password"
              value={formData.secretAccessKey}
              onChange={e => setFormData(prev => ({ ...prev, secretAccessKey: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="••••••••••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-slate-300 mb-1">
              AWS Region
            </label>
            <select
              id="region"
              value={formData.region}
              onChange={e => setFormData(prev => ({ ...prev, region: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              required
            >
              {AWS_REGIONS.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Validating...' : 'Add Account'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-4 py-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}