import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AvatarBody } from "./AvatarBody";
import { useUser } from "@/lib/UserContext";

export default {
  title: "Avatar Body",
  component: AvatarBody,
} as ComponentMeta<typeof AvatarBody>;

export const Default = () => {
  const { user } = useUser();
  return <AvatarBody head={user.avatar} />;
};
