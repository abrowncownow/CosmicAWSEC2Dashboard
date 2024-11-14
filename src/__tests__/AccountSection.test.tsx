import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountSection from '../components/AccountSection';

const mockAccount = {
  id: 'acc-1',
  name: 'Test Account',
  region: 'us-east-1',
  totalCost: 1234.56,
  instances: [
    {
      id: 'i-critical',
      name: 'critical-server',
      type: 't3.large',
      state: 'running',
      region: 'us-east-1',
      uptime: 24,
      cpu: 90,
      memory: 85,
      cost: 45.2,
      account: 'Test Account',
      tags: {
        Environment: 'Production',
        Service: 'Web'
      },
      alerts: [
        { type: 'critical', message: 'Critical alert' }
      ]
    },
    {
      id: 'i-normal',
      name: 'normal-server',
      type: 't3.medium',
      state: 'running',
      region: 'us-east-1',
      uptime: 48,
      cpu: 50,
      memory: 60,
      cost: 34.5,
      account: 'Test Account',
      tags: {
        Environment: 'Development',
        Service: 'API'
      },
      alerts: []
    }
  ]
};

describe('AccountSection Component', () => {
  it('renders account information correctly', () => {
    render(<AccountSection account={mockAccount} />);
    
    expect(screen.getByText(mockAccount.name)).toBeInTheDocument();
    expect(screen.getByText(`(${mockAccount.region})`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockAccount.instances.reduce((sum, instance) => sum + instance.cost, 0).toFixed(2)}`)).toBeInTheDocument();
  });

  it('sorts instances with critical alerts first', () => {
    render(<AccountSection account={mockAccount} />);
    const instanceCards = screen.getAllByText(/server$/);
    expect(instanceCards[0]).toHaveTextContent('critical-server');
  });

  it('filters instances by tag', () => {
    render(<AccountSection account={mockAccount} />);
    
    const environmentSelect = screen.getByLabelText('Filter by Environment');
    fireEvent.change(environmentSelect, { target: { value: 'Production' } });
    
    expect(screen.getByText('critical-server')).toBeInTheDocument();
    expect(screen.queryByText('normal-server')).not.toBeInTheDocument();
  });
});