import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/';

export default {
  title: "ButtonGroup",
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>

export const ThreeButtons: ComponentStory<typeof ButtonGroup> = () => {
  return (
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  );
};