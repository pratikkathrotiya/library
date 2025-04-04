import { Meta, StoryObj } from "@storybook/react";
import  SearchComponent  from "../components/SearchComponent/SearchComponent";
import { Contact } from "../types/contactTypes";
import { within, userEvent, screen } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
// Example Data
const sampleContacts: Contact[] = [
  { id: 1, name: "Dianne Russell", email: "dianne@example.com", avatar: "https://i.pravatar.cc/150?img=1", attended: true },
  { id: 2, name: "Ronald Richards", email: "ronald@example.com", avatar: "https://i.pravatar.cc/150?img=2", attended: true },
  { id: 3, name: "Arlene McCoy", email: "arlene@example.com", avatar: "https://i.pravatar.cc/150?img=3", attended: false },
  { id: 4, name: "Dianne Bell", email: "jenny@example.com", avatar: "https://i.pravatar.cc/150?img=4", attended: false },
];

const meta: Meta<typeof SearchComponent> = {
  title: "Components/SearchableContactList",
  component: SearchComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A reusable contact list component with search and filtering. Supports grouping of Attended and Absent contacts.",
      },
    },
  },
  argTypes: {
    contacts: {
      description: "List of contacts to display",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchComponent>;

// **Default State**
export const Default: Story = {
  args: {
    contacts: sampleContacts,
  },
};

// **Empty State**
export const Empty: Story = {
  args: {
    contacts: [],
  },
};

// **With Only Attended Users**
export const OnlyAttended: Story = {
  args: {
    contacts: sampleContacts.filter((contact) => contact.attended),
  },
};

// **With Only Absent Users**
export const OnlyAbsent: Story = {
  args: {
    contacts: sampleContacts.filter((contact) => !contact.attended),
  },
};

// Custom Styling Example
export const CustomStyling: Story = {
  args: {
    contacts: sampleContacts,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// **Interaction Test: Search Functionality**
export const SearchTest: Story = {
  args: {
    contacts: sampleContacts,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the search input and type 'Dianne'
    const searchInput = await canvas.getByPlaceholderText("Search contacts...");
    await userEvent.type(searchInput, "Dianne");

    // Check if 'Dianne Russell' is visible
    await expect(await screen.findByText("Dianne Russell")).toBeInTheDocument();
    await expect(await screen.findByText("Dianne Bell")).toBeInTheDocument();
    // Ensure 'Ronald Richards' is not visible
    await expect(await screen.queryByText("Ronald Richards")).not.toBeInTheDocument();
  },
};

export const SearchByEmail: Story = {
  args: {
    contacts: sampleContacts,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByPlaceholderText("Search contacts...");
    await userEvent.type(input, "ronald@example.com");
    await expect(await screen.findByText("Ronald Richards")).toBeInTheDocument();
    await expect(screen.queryByText("Dianne Russell")).not.toBeInTheDocument();
  },
};

export const MultipleMatches: Story = {
  args: {
    contacts: sampleContacts,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByPlaceholderText("Search contacts...");
    await userEvent.type(input, "Dianne");

    
    await expect(await screen.findByText("Dianne Russell")).toBeInTheDocument();
    await expect(await screen.findByText("Dianne Bell")).toBeInTheDocument();

    // Optional: Check for grouping
    const sections = screen.getAllByRole("button"); // Assuming SectionHeader is a <button>
    await expect(sections[0]).toHaveTextContent("Attended");
    await expect(sections[1]).toHaveTextContent("Absent");
  },
};


export const NoMatchFound: Story = {
  args: {
    contacts: sampleContacts,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByPlaceholderText("Search contacts...");
    await userEvent.type(input, "Pratik");

    // Ensure nothing renders
    await expect(screen.queryByText("Dianne Russell")).not.toBeInTheDocument();
    await expect(screen.queryByText("Ronald Richards")).not.toBeInTheDocument();
  },
};
