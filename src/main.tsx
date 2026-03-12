import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./global.css"
import Layout from "./Layout"
import GamePage from "./pages/GamePage"
import LeaderboardDetailPage from "./pages/LeaderboardDetailPage"
import LeaderboardListPage from "./pages/LeaderboardListPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})

const root = document.getElementById("root")
if (!root) throw new Error("Cannot find #root")

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<GamePage />} />
            <Route path="leaderboard" element={<LeaderboardListPage />} />
            <Route path="leaderboard/:id" element={<LeaderboardDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
