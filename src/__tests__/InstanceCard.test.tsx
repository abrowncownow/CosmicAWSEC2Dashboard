import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InstanceCard from '../components/InstanceCard';

const mockInstance = {
  id: 'i-test123',
  name: 'test-instance',
  type: 't3.micro',
  state: 'running' as const,
  region: 'us-east-1',
  uptime: 24.5,
  cpu: 75,
  memory: 80,
  cost: 45.67,
  account: 'Test',
  tags: {
    Environment: 'Production',
    Service: 'Web'
  },
  alerts: [
    { type: 'warning' as const, message: 'Test alert' }
  ]
};

describe('InstanceCard Component', () => {
  it('renders instance details correctly', () => {
    render(<InstanceCard instance={mockInstance} />);
    
    expect(screen.getByText(mockInstance.name)).toBeInTheDocument();
    expect(screen.getByText(mockInstance.type)).toBeInTheDocument();
    expect(screen.getByText(`${mockInstance.uptime}h`)).toBeInTheDocument();
    expect(screen.getByText('Environment: Production')).toBeInTheDocument();
    expect(screen.getByText('Service: Web')).toBeInTheDocument();
  });

  it('opens AWS console link when clicked', () => {
    const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<InstanceCard instance={mockInstance} />);
    
    fireEvent.click(screen.getByText(mockInstance.name).closest('div')!);
    
    expect(windowSpy).toHaveBeenCalledWith(
      `https://${mockInstance.region}.console.aws.amazon.com/ec2/home?region=${mockInstance.region}#InstanceDetails:instanceId=${mockInstance.id}`,
      '_blank'
    );
    
    windowSpy.mockRestore();
  });

  it('displays alerts correctly', () => {
    render(<InstanceCard instance={mockInstance} />);
    expect(screen.getByText('Test alert')).toBeInTheDocument();
  });

  it('shows correct state indicator', () => {
    render(<InstanceCard instance={mockInstance} />);
    expect(screen.getByText('running')).toBeInTheDocument();
  });
});