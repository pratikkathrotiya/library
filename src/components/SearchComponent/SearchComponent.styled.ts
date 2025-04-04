import styled from 'styled-components';

// Main container
export const Container = styled.div`
 
  
  max-width: 750px;
  margin: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  overflow: hidden;
`;

export const Title = styled.h2`
  margin: 20px 0 0 0;  // Adds space at the top
  padding: 15px 0;
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-align: center;
  color: #333;
  
  width: 100%;  // Ensures full width
  
  @media (max-width: 768px) {
    font-size: 18px; // Adjusts font size for smaller screens
  }

  @media (max-width: 480px) {
    font-size: 16px; // Further adjust for very small screens
    padding: 10px 0;
  }
`;

// Search Input
export const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  outline: none;
  ::placeholder {
    color: #aaa;
  }
`;

// Search Input Wrapper
export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// Section wrapper
export const Section = styled.div`
  margin-top: 10px;
`;

// Section Header with Chevron Toggle
export const SectionHeader = styled.button`
  width: 100%;
  padding: 12px;
  text-align: left;
  background: #f8f8f8;
  border: none;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #e8e8e8;
  }
`;

// Chevron Icon for toggle effect
export const Chevron = styled.span<{ isOpen: boolean }>`
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

// Wrapper for contact list (to keep layout structured)
export const ResponsiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// Contact Item (List Row)
export const ContactItem = styled.div<{ sectionType: 'Attended' | 'Absent' }>`
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 10px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  
  &:hover {
    background: ${({ sectionType }) => (sectionType === 'Attended' ? '#E4F2D5' : '#ffcccb')}; 
  }
`;

// Avatar (Profile Image)
export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

// Contact Information (Name & Email)
export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

// Name Styling
export const Name = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

// Email Styling
export const Email = styled.span`
  font-size: 14px;
  color: #777;
`;

