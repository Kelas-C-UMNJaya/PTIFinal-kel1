import "../src/index.css"
import { UserProvider } from "@/lib/UserContext";
import { GameProvider } from "@/lib/GameContext";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
export const decorators = [
  (Story) => (
    <UserProvider>
      <GameProvider>
        <Story />
      </GameProvider>
    </UserProvider>
  ),
]