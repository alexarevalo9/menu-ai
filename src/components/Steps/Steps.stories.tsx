import type { Meta, StoryObj } from "@storybook/react";

import Steps from "./Steps";

const meta: Meta<typeof Steps> = {
  title: "UI/Steps",
  component: Steps,
};

export default meta;

type Story = StoryObj<typeof Steps>;

export const Default: Story = {
  args: {
    steps: [
      { id: "01", name: "Goal", href: "", status: "complete" },
      { id: "02", name: "Active", href: "", status: "current" },
      { id: "03", name: "Measures", href: "", status: "upcoming" },
      { id: "04", name: "Profile", href: "", status: "upcoming" },
    ],
  },
};
