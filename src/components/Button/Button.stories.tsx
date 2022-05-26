import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button'

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>

export const Interactive: ComponentStory<typeof Button> = () => {
  const [isActive, setIsActive] = React.useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
    console.log("Button is clicked!");
    console.log(isActive);
  }
  return (
    <Button active={isActive} onClick={handleClick}>Button</Button>
  );
};

export const Active: ComponentStory<typeof Button> = () => {
  return (
    <Button active onClick={() => console.log("Hello World!")}>Button</Button>
  );
};
