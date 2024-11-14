import React, { useState, useMemo } from 'react';
import { AWSAccount, EC2Instance } from '../types/aws';
import InstanceCard from './InstanceCard';
import { Cloud, DollarSign, Filter } from 'lucide-react';

interface Props {
  account: AWSAccount;
}

function getAvailableTags(instances: EC2Instance[]): { [key: string]: Set<string> } {
  const tags: { [key: string]: Set<string> } = {};
  
  instances.forEach(instance => {
    Object.entries(instance.tags).forEach(([key, value]) => {
      if (!tags[key]) {
        tags[key] = new Set();
      }
      tags[key].add(value);
    });
  });

  return tags;
}

function sortInstances(instances: EC2Instance[]): EC2Instance[] {
  return [...instances].sort((a, b) => {
    // First, sort by alert severity (critical > warning > info)
    const aHasCritical = a.alerts.some(alert => alert.type === 'critical');
    const bHasCritical = b.alerts.some(alert => alert.type === 'critical');
    const aHasWarning = a.alerts.some(alert => alert.type === 'warning');
    const bHasWarning = b.alerts.some(alert => alert.type === 'warning');
    
    if (aHasCritical && !bHasCritical) return -1;
    if (!aHasCritical && bHasCritical) return 1;
    if (aHasWarning && !bHasWarning) return -1;
    if (!aHasWarning && bHasWarning) return 1;
    
    // Then sort by state (running first)
    if (a.state === 'running' && b.state !== 'running') return -1;
    if (a.state !== 'running' && b.state === 'running') return 1;
    
    // Finally sort by name
    return a.name.localeCompare(b.name);
  });
}

export default function AccountSection({ account }: Props) {
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: string }>({});
  const availableTags = useMemo(() => getAvailableTags(account.instances), [account.instances]);

  const filteredInstances = useMemo(() => {
    let instances = account.instances;
    
    // Apply tag filters
    Object.entries(selectedTags).forEach(([key, value]) => {
      if (value) {
        instances = instances.filter(instance => instance.tags[key] === value);
      }
    });

    return sortInstances(instances);
  }, [account.instances, selectedTags]);

  const handleTagChange = (tagKey: string, value: string) => {
    setSelectedTags(prev => ({
      ...prev,
      [tagKey]: value
    }));
  };

  const totalFilteredCost = filteredInstances.reduce((sum, instance) => sum + instance.cost, 0);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Cloud className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">{account.name}</h2>
          <span className="text-sm text-slate-400">({account.region})</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            {Object.entries(availableTags).map(([tagKey, values]) => (
              <div key={tagKey} className="flex items-center space-x-2">
                <label htmlFor={`filter-${tagKey}`} className="sr-only">Filter by {tagKey}</label>
                <select
                  id={`filter-${tagKey}`}
                  value={selectedTags[tagKey] || ''}
                  onChange={(e) => handleTagChange(tagKey, e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  aria-label={`Filter by ${tagKey}`}
                >
                  <option value="">All {tagKey}</option>
                  {Array.from(values).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">${totalFilteredCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstances.map(instance => (
          <InstanceCard key={instance.id} instance={instance} />
        ))}
      </div>
    </div>
  );
}