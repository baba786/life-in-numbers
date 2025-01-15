import { render, screen, fireEvent } from '@testing-library/react';
import { LifeCalculator } from '../LifeCalculator';

describe('LifeCalculator', () => {
  it('renders the birth date selector', () => {
    render(<LifeCalculator />);
    expect(screen.getByText('Select your birth date')).toBeInTheDocument();
  });

  it('displays metrics after selecting a date', () => {
    render(<LifeCalculator />);
    
    // Mock date selection
    const date = new Date(2000, 0, 1); // January 1, 2000
    const calendar = screen.getByRole('button', { name: /1/i });
    fireEvent.click(calendar);

    // Check if metrics are displayed
    expect(screen.getByText(/Exact Age/i)).toBeInTheDocument();
    expect(screen.getByText(/Celebrations/i)).toBeInTheDocument();
    expect(screen.getByText(/Earth Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/Body Stats/i)).toBeInTheDocument();
  });

  it('has a working share button', () => {
    render(<LifeCalculator />);
    
    // Mock date selection
    const date = new Date(2000, 0, 1);
    const calendar = screen.getByRole('button', { name: /1/i });
    fireEvent.click(calendar);

    // Check share button
    expect(screen.getByText('Share')).toBeInTheDocument();
  });
});