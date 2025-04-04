import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchComponent from './SearchComponent';
import { Contact } from '../../types/contactTypes';

// Use same structure as expected by SearchComponent
const sampleContacts: Contact[] = [
  {
    id: 1,
    name: 'Dianne Russell',
    email: 'dianne.russell@example.com',
    attended: true,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    attended: false,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

describe('SearchComponent', () => {
  test('filters contact list based on search input', () => {
    render(<SearchComponent contacts={sampleContacts} />);
    const searchInput = screen.getByPlaceholderText('Search contacts...');

    fireEvent.change(searchInput, { target: { value: 'Dianne' } });

    expect(screen.getByText('Dianne Russell')).toBeInTheDocument();
    expect(screen.queryByText('Jenny Wilson')).not.toBeInTheDocument();
  });

  test('collapses and expands Attended section when clicked', () => {
    render(<SearchComponent contacts={sampleContacts} />);
    
    const attendedHeader = screen.getByText('Attended');

    fireEvent.click(attendedHeader);
    expect(screen.queryByText('Dianne Russell')).not.toBeInTheDocument();

    fireEvent.click(attendedHeader);
    expect(screen.getByText('Dianne Russell')).toBeInTheDocument();
  });

  test('collapses and expands Absent section when clicked', () => {
    render(<SearchComponent contacts={sampleContacts} />);

    const absentHeader = screen.getByText('Absent');

    fireEvent.click(absentHeader);
    expect(screen.queryByText('Jenny Wilson')).not.toBeInTheDocument();

    fireEvent.click(absentHeader);
    expect(screen.getByText('Jenny Wilson')).toBeInTheDocument();
  });
});
