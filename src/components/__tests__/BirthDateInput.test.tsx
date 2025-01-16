import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BirthDateInput } from '../BirthDateInput';

describe('BirthDateInput', () => {
  it('should render with empty initial values', () => {
    render(<BirthDateInput onBirthInfoChange={() => {}} />);
    const dateInput = screen.getByLabelText('Birth Date');
    expect(dateInput).toHaveValue('');
  });

  it('should handle mobile date input correctly', async () => {
    render(<BirthDateInput onBirthInfoChange={() => {}} />);
    const dateInput = screen.getByLabelText('Birth Date');
    await userEvent.type(dateInput, '1990-01-01');
    expect(dateInput).toHaveValue('1990-01-01');
  });

  it('should show advanced options when clicked', async () => {
    render(<BirthDateInput onBirthInfoChange={() => {}} />);
    const advancedButton = screen.getByText(/Show Advanced Options/);
    await userEvent.click(advancedButton);
    expect(screen.getByLabelText('Birth Time (optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Time Zone (optional)')).toBeInTheDocument();
  });

  it('should be accessible on mobile devices', () => {
    render(<BirthDateInput onBirthInfoChange={() => {}} />);
    const dateInput = screen.getByLabelText('Birth Date');
    expect(dateInput).toHaveAttribute('aria-label', 'Birth Date');
    expect(dateInput).toHaveAttribute('type', 'date');
  });
});
