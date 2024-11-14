import React from 'react';
import { EC2Instance, AlertStatus } from '../types/aws';
import { Server, Cpu, MemoryStick, Clock, DollarSign, AlertCircle, ExternalLink, Tag } from 'lucide-react';

interface Props {
  instance: EC2Instance;
}

export default function InstanceCard({ instance }: Props) {
  const stateColors = {
    running: 'bg-green-500',
    stopped: 'bg-red-500',
    pending: 'bg-yellow-500',
    terminated: 'bg-gray-500'
  };

  const alertColors = {
    critical: 'bg-red-500/10 text-red-500 border-red-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    info: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  };

  const alertIcons = {
    critical: <AlertCircle className="w-3 h-3" />,
    warning: <AlertCircle className="w-3 h-3" />,
    info: <AlertCircle className="w-3 h-3" />
  };

  const getAWSConsoleUrl = (instance: EC2Instance) => {
    return `https://${instance.region}.console.aws.amazon.com/ec2/home?region=${instance.region}#InstanceDetails:instanceId=${instance.id}`;
  };

  const handleClick = () => {
    window.open(getAWSConsoleUrl(instance), '_blank');
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Server className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">{instance.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${stateColors[instance.state]}`} />
          <span className="text-sm text-slate-300 capitalize">{instance.state}</span>
          <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-slate-400" />
          <div className="flex-1">
            <div className="h-2 bg-slate-700 rounded-full">
              <div 
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${instance.cpu}%` }}
              />
            </div>
            <span className="text-sm text-slate-400 mt-1">CPU {instance.cpu}%</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MemoryStick className="w-4 h-4 text-slate-400" />
          <div className="flex-1">
            <div className="h-2 bg-slate-700 rounded-full">
              <div 
                className="h-2 bg-purple-500 rounded-full"
                style={{ width: `${instance.memory}%` }}
              />
            </div>
            <span className="text-sm text-slate-400 mt-1">RAM {instance.memory}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm mb-4">
        <div className="flex items-center space-x-1 text-slate-300">
          <Clock className="w-4 h-4" />
          <span>{instance.uptime}h</span>
        </div>
        <div className="text-slate-300">{instance.type}</div>
        <div className="flex items-center space-x-1 text-slate-300">
          <DollarSign className="w-4 h-4" />
          <span>{instance.cost.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(instance.tags).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center space-x-1 text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full"
          >
            <Tag className="w-3 h-3" />
            <span>{key}: {value}</span>
          </div>
        ))}
      </div>

      {instance.alerts.length > 0 && (
        <div className="space-y-2">
          {instance.alerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 text-xs px-3 py-2 rounded-md border ${alertColors[alert.type]}`}
            >
              {alertIcons[alert.type]}
              <span>{alert.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}