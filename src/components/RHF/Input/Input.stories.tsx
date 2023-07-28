import type { Meta, StoryObj } from "@storybook/react";

import { InputStory } from "./Input";

const meta: Meta<typeof InputStory> = {
  title: "UI/Input",
  component: InputStory,
};

export default meta;

type Story = StoryObj<typeof InputStory>;

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
