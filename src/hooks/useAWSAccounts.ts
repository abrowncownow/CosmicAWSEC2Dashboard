import { useState, useEffect, useCallback } from 'react';
import { AWSAccount } from '../types/aws';
import { mockAccounts } from '../data/mockData';
import { AWSCredentials } from '../components/AddAccountModal';

export type RefreshInterval = 5 | 30 | 60 | 120 | 300;

export function useAWSAccounts(refreshInterval: RefreshInterval) {
  const [accounts, setAccounts] = useState<AWSAccount[]>(mockAccounts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const refreshAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Here you would typically fetch fresh data for all accounts
      // For now, we'll just simulate a delay and data refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate some random changes in CPU and memory usage
      setAccounts(prev => prev.map(account => ({
        ...account,
        instances: account.instances.map(instance => ({
          ...instance,
          cpu: Math.min(100, Math.max(0, instance.cpu + (Math.random() * 20 - 10))),
          memory: Math.min(100, Math.max(0, instance.memory + (Math.random() * 20 - 10)))
        }))
      })));
      
      setLastRefresh(new Date());
    } catch (err) {
      setError('Failed to refresh accounts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addAccount = async (credentials: AWSCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const newAccount: AWSAccount = {
        id: `acc-${Date.now()}`,
        name: credentials.accountName,
        region: credentials.region,
        totalCost: 0,
        instances: []
      };

      setAccounts(prev => [...prev, newAccount]);
    } catch (err) {
      setError('Failed to add AWS account. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshAccounts, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [refreshInterval, refreshAccounts]);

  return {
    accounts,
    loading,
    error,
    addAccount,
    refreshAccounts,
    lastRefresh
  };
}