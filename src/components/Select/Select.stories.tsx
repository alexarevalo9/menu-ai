import type { Meta, StoryObj } from "@storybook/react";
import { LanguageIcon } from "@heroicons/react/20/solid";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 1,
        name: "English",
      },
      {
        id: 2,
        name: "Spanish",
      },
    ],
    size: "medium",
    mainIcon: <LanguageIcon width={20} height={20} />,
  },
};
