import { AWSAccount } from '../types/aws';

export const mockAccounts: AWSAccount[] = [
  {
    id: 'acc-1',
    name: 'Clocker-123456789',
    region: 'us-east-1',
    totalCost: 3456.78,
    instances: [
      {
        id: 'i-1234567890',
        name: 'web-server-1',
        type: 't3.large',
        state: 'running',
        region: 'us-east-1',
        uptime: 15.7,
        cpu: 76,
        memory: 82,
        cost: 45.2,
        account: 'Clocker-123456789',
        tags: {
          Environment: 'Production',
          Service: 'Web',
          Team: 'Frontend',
          Project: 'MainApp'
        },
        alerts: [
          { type: 'critical', message: 'High CPU utilization' },
          { type: 'warning', message: 'Memory usage above 80%' }
        ]
      },
      {
        id: 'i-0987654321',
        name: 'db-server-1',
        type: 'r5.xlarge',
        state: 'running',
        region: 'us-east-1',
        uptime: 45.2,
        cpu: 92,
        memory: 78,
        cost: 123.4,
        account: 'Clocker-123456789',
        tags: {
          Environment: 'Production',
          Service: 'Database',
          Team: 'Backend',
          Project: 'MainApp'
        },
        alerts: [
          { type: 'critical', message: 'Critical CPU threshold exceeded' }
        ]
      },
      {
        id: 'i-web002',
        name: 'web-server-2',
        type: 't3.large',
        state: 'running',
        region: 'us-east-1',
        uptime: 156.3,
        cpu: 65,
        memory: 72,
        cost: 45.2,
        account: 'Clocker-123456789',
        tags: {
          Environment: 'Production',
          Service: 'Web',
          Team: 'Frontend',
          Project: 'MainApp'
        },
        alerts: []
      },
      {
        id: 'i-web003',
        name: 'web-server-3',
        type: 't3.large',
        state: 'running',
        region: 'us-east-1',
        uptime: 234.5,
        cpu: 88,
        memory: 91,
        cost: 45.2,
        account: 'Clocker-123456789',
        tags: {
          Environment: 'Production',
          Service: 'Web',
          Team: 'Frontend',
          Project: 'MainApp'
        },
        alerts: [
          { type: 'warning', message: 'High memory usage trend' }
        ]
      },
      {
        id: 'i-abcd123456',
        name: 'cache-server-1',
        type: 'r6g.large',
        state: 'running',
        region: 'us-east-1',
        uptime: 120.5,
        cpu: 45,
        memory: 65,
        cost: 78.9,
        account: 'Clocker-123456789',
        tags: {
          Environment: 'Lower',
          Service: 'Cache',
          Team: 'Infrastructure',
          Project: 'MainApp'
        },
        alerts: []
      },
      {
        id: 'i-def789012',
        name: 'worker-1',
        type: 'c5.xlarge',
        state: 'running',
        region: 'us-east-1',
        uptime: 72.3,
        cpu: 88,
        memory: 45,
        cost: 95.6,
        account: 'Clocker-123456789',
        tags: {
          Environment: 'Lower',
          Service: 'Worker',
          Team: 'Backend',
          Project: 'DataProcessing'
        },
        alerts: [
          { type: 'warning', message: 'High CPU usage trend detected' }
        ]
      },
      {
        id: 'i-worker002',
        name: 'worker-2',
        type: 'c5.xlarge',
        state: 'stopped',
        region: 'us-east-1',
        uptime: 0,
        cpu: 0,
        memory: 0,
        cost: 0,
        account: 'Clocker-123456789',
        tags: {
          Environment: 'Lower',
          Service: 'Worker',
          Team: 'Backend',
          Project: 'DataProcessing'
        },
        alerts: [
          { type: 'info', message: 'Instance stopped manually' }
        ]
      },
      {
        id: 'i-db002',
        name: 'db-server-2',
        type: 'r5.2xlarge',
        state: 'running',
        region: 'us-east-1',
        uptime: 543.2,
        cpu: 45,
        memory: 82,
        cost: 246.8,
        account: 'Clocker-123456789',
        tags: {
          Environment: 'Production',
          Service: 'Database',
          Team: 'Backend',
          Project: 'MainApp'
        },
        alerts: []
      }
    ]
  },
  {
    id: 'acc-2',
    name: 'HR is Life App - 123456789',
    region: 'eu-west-1',
    totalCost: 892.45,
    instances: [
      {
        id: 'i-abcdef1234',
        name: 'test-server-1',
        type: 't3.medium',
        state: 'stopped',
        region: 'eu-west-1',
        uptime: 0,
        cpu: 0,
        memory: 0,
        cost: 12.3,
        account: 'HR is Life App - 123456789',
        tags: {
          Environment: 'Development',
          Service: 'Testing',
          Team: 'QA',
          Project: 'TestSuite'
        },
        alerts: [
          { type: 'info', message: 'Instance stopped for 24h+' }
        ]
      },
      {
        id: 'i-def456789',
        name: 'dev-api-1',
        type: 't3.large',
        state: 'running',
        region: 'eu-west-1',
        uptime: 48.2,
        cpu: 35,
        memory: 42,
        cost: 67.8,
        account: 'HR is Life App - 123456789',
        tags: {
          Environment: 'Development',
          Service: 'API',
          Team: 'Backend',
          Project: 'MainApp'
        },
        alerts: []
      },
      {
        id: 'i-dev003',
        name: 'dev-web-1',
        type: 't3.medium',
        state: 'running',
        region: 'eu-west-1',
        uptime: 12.4,
        cpu: 22,
        memory: 45,
        cost: 34.5,
        account: 'HR is Life App - 123456789',
        tags: {
          Environment: 'Development',
          Service: 'Web',
          Team: 'Frontend',
          Project: 'MainApp'
        },
        alerts: []
      },
      {
        id: 'i-dev004',
        name: 'dev-cache-1',
        type: 't3.medium',
        state: 'running',
        region: 'eu-west-1',
        uptime: 72.1,
        cpu: 15,
        memory: 34,
        cost: 34.5,
        account: 'HR is Life App - 123456789',
        tags: {
          Environment: 'Development',
          Service: 'Cache',
          Team: 'Infrastructure',
          Project: 'MainApp'
        },
        alerts: []
      }
    ]
  },
  {
    id: 'acc-3',
    name: 'Notify-123456789',
    region: 'us-west-2',
    totalCost: 1567.89,
    instances: [
      {
        id: 'i-stg123456',
        name: 'staging-web-1',
        type: 't3.xlarge',
        state: 'running',
        region: 'us-west-2',
        uptime: 156.7,
        cpu: 67,
        memory: 73,
        cost: 156.7,
        account: 'Notify-123456789',
        tags: {
          Environment: 'Staging',
          Service: 'Web',
          Team: 'Frontend',
          Project: 'MainApp'
        },
        alerts: [
          { type: 'warning', message: 'Memory usage trending up' }
        ]
      },
      {
        id: 'i-stg789012',
        name: 'staging-db-1',
        type: 'r5.2xlarge',
        state: 'running',
        region: 'us-west-2',
        uptime: 234.5,
        cpu: 89,
        memory: 91,
        cost: 345.8,
        account: 'Notify-123456789',
        tags: {
          Environment: 'Staging',
          Service: 'Database',
          Team: 'Backend',
          Project: 'MainApp'
        },
        alerts: [
          { type: 'critical', message: 'Memory usage critical' },
          { type: 'warning', message: 'High CPU utilization' }
        ]
      },
      {
        id: 'i-stg345678',
        name: 'staging-cache-1',
        type: 'r6g.xlarge',
        state: 'running',
        region: 'us-west-2',
        uptime: 89.3,
        cpu: 56,
        memory: 82,
        cost: 123.4,
        account: 'Notify-123456789',
        tags: {
          Environment: 'Lower',
          Service: 'Cache',
          Team: 'Infrastructure',
          Project: 'MainApp'
        },
        alerts: [
          { type: 'warning', message: 'Memory usage above threshold' }
        ]
      },
      {
        id: 'i-stg004',
        name: 'staging-web-2',
        type: 't3.xlarge',
        state: 'running',
        region: 'us-west-2',
        uptime: 45.6,
        cpu: 45,
        memory: 62,
        cost: 156.7,
        account: 'Notify-123456789',
        tags: {
          Environment: 'Staging',
          Service: 'Web',
          Team: 'Frontend',
          Project: 'MainApp'
        },
        alerts: []
      },
      {
        id: 'i-stg005',
        name: 'staging-worker-1',
        type: 'c5.xlarge',
        state: 'running',
        region: 'us-west-2',
        uptime: 167.8,
        cpu: 78,
        memory: 45,
        cost: 178.9,
        account: 'Notify-123456789',
        tags: {
          Environment: 'Staging',
          Service: 'Worker',
          Team: 'Backend',
          Project: 'DataProcessing'
        },
        alerts: [
          { type: 'warning', message: 'High CPU utilization' }
        ]
      },
      {
        id: 'i-stg006',
        name: 'staging-api-1',
        type: 't3.large',
        state: 'running',
        region: 'us-west-2',
        uptime: 234.5,
        cpu: 34,
        memory: 56,
        cost: 89.4,
        account: 'Notify-123456789',
        tags: {
          Environment: 'Staging',
          Service: 'API',
          Team: 'Backend',
          Project: 'MainApp'
        },
        alerts: []
      }
    ]
  }
];