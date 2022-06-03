import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { OverlayModal } from "./OverlayModal";
import { Button } from "../Button/";

export default {
  title: "OverlayModal",
  component: OverlayModal,
} as ComponentMeta<typeof OverlayModal>;

export const ModalWithButtons: ComponentStory<typeof OverlayModal> = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log("Button is clicked!");
    console.log(isOpen);
  };
  if (!isOpen) return <></>;
  return (
    <OverlayModal title="Test Button" onClose={() => setIsOpen(false)}>
      <Button onClick={handleClick}>Button 1</Button>
      <Button onClick={handleClick}>Button 2</Button>
      <Button onClick={handleClick}>Button 3</Button>
    </OverlayModal>
  );
};
