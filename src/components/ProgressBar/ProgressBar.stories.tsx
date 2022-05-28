import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProgressBar } from './ProgressBar';
import { ProgressGroup } from './ProgressGroup';

export default {
  title: "Progress Bar",
  component: ProgressBar,
  args: {
    value: 50,
    icon: "akar-icons:book",
  }
}

export const Default: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const WithProgressGroup: ComponentStory<typeof ProgressGroup> = () => (
  <ProgressGroup>
    <ProgressBar value={50} icon="dashicons:book" />
    <ProgressBar value={50} icon="fa-solid:bed" />
    <ProgressBar value={50} icon="ion:fast-food"/>
    <ProgressBar value={50} icon="fa:gamepad" />
  </ProgressGroup>
);