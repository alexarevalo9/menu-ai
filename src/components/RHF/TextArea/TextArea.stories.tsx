import type { Meta, StoryObj } from "@storybook/react";

import { TextAreaStory } from "./TextArea";

const meta: Meta<typeof TextAreaStory> = {
  title: "UI/TexArea",
  component: TextAreaStory,
};

export default meta;

type Story = StoryObj<typeof TextAreaStory>;

export const Primary: Story = {
  args: {
    name: "menu",
    labelText: "Menu",
    id: "menu",
    placeholder: "Menu",
    intent: "primary",
    helperText: "Please enter your ingredients",
    fullWidth: true,
  },
};
