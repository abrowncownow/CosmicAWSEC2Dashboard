import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders the header correctly', () => {
    render(<App />);
    expect(screen.getByText('Cosmic AWS Monitor')).toBeInTheDocument();
    expect(screen.getByText('EC2 Instance Dashboard')).toBeInTheDocument();
  });

  it('opens and closes the Add Account modal', () => {
    render(<App />);
    
    // Open modal
    const addButton = screen.getByRole('button', { name: /add aws account/i });
    fireEvent.click(addButton);
    expect(screen.getByRole('heading', { name: /add aws account/i })).toBeInTheDocument();
    
    // Close modal
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(screen.queryByRole('heading', { name: /add aws account/i })).not.toBeInTheDocument();
  });

  it('changes refresh interval', () => {
    render(<App />);
    const select = screen.getByLabelText('Refresh Interval');
    
    fireEvent.change(select, { target: { value: '60' } });
    expect(select.value).toBe('60');
  });
});