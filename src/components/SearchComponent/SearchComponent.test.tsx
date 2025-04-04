import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchComponent from './SearchComponent';
import App from '../../App';

describe('SearchableContactList Component', () => {
  test('renders search input field', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('filters contact list based on search input', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search');
    
    fireEvent.change(searchInput, { target: { value: 'Dianne' } });
    
    expect(screen.getByText('Dianne Russell')).toBeInTheDocument();
    expect(screen.queryByText('Jenny Wilson')).not.toBeInTheDocument();
  });

  test('collapses and expands sections when clicked', () => {
    render(<App />);
    
    const attendedHeader = screen.getByText('Attended');
    fireEvent.click(attendedHeader);
    
    expect(screen.queryByText('Dianne Russell')).not.toBeInTheDocument();
    
    fireEvent.click(attendedHeader);
    expect(screen.getByText('Dianne Russell')).toBeInTheDocument();
  });
});
