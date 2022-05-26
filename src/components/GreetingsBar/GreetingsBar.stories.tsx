import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GreetingsBar } from './GreetingsBar';

export default {
  title: 'GreetingsBar',
  component: GreetingsBar,
  args: {
    userName: 'Padil Gunar',
    userMajor: 'Informatika',
  }
}

const Template: ComponentStory<typeof GreetingsBar> = (args) => <GreetingsBar {...args} />;

export const Default = Template.bind({});

