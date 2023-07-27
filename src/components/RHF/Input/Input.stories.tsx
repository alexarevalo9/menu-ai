import type { Meta, StoryObj } from "@storybook/react";

import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    name: "email",
    labelText: "Email",
    type: "email",
    id: "email",
    placeholder: "Email",
    intent: "primary",
    helperText: "Please enter your email",
    fullWidth: true,
  },
};
