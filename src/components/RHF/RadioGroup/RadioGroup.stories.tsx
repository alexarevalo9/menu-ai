import type { Meta, StoryObj } from "@storybook/react";

import RadioGroup from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

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
