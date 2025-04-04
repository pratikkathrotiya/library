import React, { useState } from 'react';
import { Contact } from '../../types/contactTypes';
import {
  Container,
  SearchInput,
  Section,
  SectionHeader,
  ContactItem,
  Avatar,
  ContactInfo,
  Name,
  Email,
  Title,
  ResponsiveWrapper,
  Chevron,
} from './SearchComponent.styled';

interface SearchComponentProps {
  contacts: Contact[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({ contacts }) => {
  const [search, setSearch] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Attended: true,
    Absent: true,
  });

  // Group contacts into "Attended" and "Absent"
  const groupedContacts: Record<string, Contact[]> = {
    Attended: contacts.filter(contact => contact.attended),
    Absent: contacts.filter(contact => !contact.attended),
  };

  // Filter contacts by search term (name or email)
  const filteredData = Object.entries(groupedContacts).reduce<Record<string, Contact[]>>(
    (acc, [section, contactList]) => {
      const filtered = contactList.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[section] = filtered;
      }
      return acc;
    },
    {}
  );

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <Title>Attendance List</Title>
      <Container>
        <SearchInput
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {Object.entries(filteredData).map(([section, contacts]) => (
          <Section key={section}>
            <SectionHeader type="button" onClick={() => toggleSection(section)}>
              {section}
              <Chevron isOpen={openSections[section]}>⌄</Chevron>
            </SectionHeader>
            {openSections[section] && (
              <ResponsiveWrapper>
                {contacts.map(contact => (
                  <ContactItem key={contact.id} sectionType={section as 'Attended' | 'Absent'}>
                    <Avatar src={contact.avatar} alt={contact.name} />
                    <ContactInfo>
                      <Name>{contact.name}</Name>
                      <Email>{contact.email}</Email>
                    </ContactInfo>
                  </ContactItem>
                ))}
              </ResponsiveWrapper>
            )}
          </Section>
        ))}
      </Container>
    </>
  );
};

export default SearchComponent;
