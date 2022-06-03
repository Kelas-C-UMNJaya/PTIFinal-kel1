import React from "react";
import { PauseMenu } from "./PauseMenu";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "PauseMenu",
  component: PauseMenu,
} as ComponentMeta<typeof PauseMenu>;

export const Default: ComponentStory<typeof PauseMenu> = () => {
  return <PauseMenu setOpen={() => console.log("test")} />;
};
