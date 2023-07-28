import type { Meta, StoryObj } from "@storybook/react";

import { DateInputStory } from "./DateInput";

const meta: Meta<typeof DateInputStory> = {
  title: "UI/DateInput",
  component: DateInputStory,
};

export default meta;

type Story = StoryObj<typeof DateInputStory>;

export const Primary: Story = {
  args: {},
};
