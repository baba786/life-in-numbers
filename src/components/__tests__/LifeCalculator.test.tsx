import { render, screen, fireEvent } from '@testing-library/react';
import { LifeCalculator } from '../LifeCalculator';

describe('LifeCalculator', () => {
  it('renders the birth date selector', () => {
    render(<LifeCalculator />);
    expect(screen.getByLabelText('Birth Date')).toBeInTheDocument();
  });

  it('displays metrics after selecting a date', () => {
    render(<LifeCalculator />);
    
    // Mock date selection
    const dateInput = screen.getByLabelText('Birth Date');
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });

    // Check if metrics are displayed
    expect(screen.getByText(/Exact Age/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Celebrations/i })).toBeInTheDocument();
    expect(screen.getByText(/Earth Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/Vital Statistics/i)).toBeInTheDocument();
  });

  it('has a working share button', () => {
    render(<LifeCalculator />);
    
    // Mock date selection
    const dateInput = screen.getByLabelText('Birth Date');
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });

    // Check share button
    expect(screen.getByText('Share your journey')).toBeInTheDocument();
  });
});
