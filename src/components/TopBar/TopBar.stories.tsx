import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TopBar } from './TopBar'

export default {
  title: "TopBar",
  component: TopBar,
  args: {
    clock: "12:00",
    date: "Monday, 01 January 2020",
  }
}

const Template: ComponentStory<typeof TopBar> = (args) => <TopBar {...args} />;

export const Default = Template.bind({});