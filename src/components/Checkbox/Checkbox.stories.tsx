import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    intent: "primary",
  },
};

export const Error: Story = {
  args: {
    intent: "error",
  },
};
