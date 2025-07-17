import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../../src/components/App';

describe('App', () => {
  it('renders the main header', () => {
    render(<App />);
    const header = screen.getByText(/MedScribe AI/i);
    expect(header).toBeInTheDocument();
  });
});
