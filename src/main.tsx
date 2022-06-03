import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { UserProvider } from "@/lib/UserContext";
import { GameProvider } from "@/lib/GameContext";

import App from "./App";
import { Home } from "@/pages/Home";
import { DebugPage } from "./pages/debug";
import { GamePage } from "./pages/GamePage";
import { LoginPage } from "./pages/LoginPage";
import { GameOver } from "./pages/GameOver";

import "./index.css";

const MainRoute = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/*" element={<App />}>
          <Route index element={<Home />} />
          <Route path="debug" element={<DebugPage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="avatar" element={<LoginPage />} />
          <Route path="finish" element={<GameOver />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <GameProvider>
        <BrowserRouter>
          <MainRoute />
        </BrowserRouter>
      </GameProvider>
    </UserProvider>
  </React.StrictMode>
);
