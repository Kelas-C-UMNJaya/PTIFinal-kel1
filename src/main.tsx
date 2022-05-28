import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import { UserProvider } from '@/lib/UserContext'

import App from './App'
import { DebugPage } from './pages/debug'
import { GamePage } from './pages/GamePage'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
)
