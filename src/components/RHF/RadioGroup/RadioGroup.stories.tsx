import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroupStory } from "./RadioGroup";

const meta: Meta<typeof RadioGroupStory> = {
  title: "UI/RadioGroup",
  component: RadioGroupStory,
};

export default meta;

type Story = StoryObj<typeof RadioGroupStory>;

export const Default: Story = {
  args: {
    name: "goal",
    options: [
      {
        label: "Lose weight",
        description: "Lose weight and get in shape",
        value: "lose",
      },
      {
        label: "Maintain weight",
        description: "Maintain your current weight",
        value: "maintain",
      },
      {
        label: "Gain weight",
        value: "gain",
      },
    ],
  },
};
