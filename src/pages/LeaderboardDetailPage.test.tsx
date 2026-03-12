import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"

import LeaderboardDetailPage from "./LeaderboardDetailPage"

const renderAtRoute = (path: string) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/leaderboard/:id" element={<LeaderboardDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe("LeaderboardDetailPage", () => {
  it("renders without crashing", () => {
    renderAtRoute("/leaderboard/1")
  })

  it("shows the game name for a valid id", async () => {
    renderAtRoute("/leaderboard/1")
    expect(await screen.findByText("Monday Challenge")).toBeInTheDocument()
  })

  it("shows Game not found for invalid id", async () => {
    renderAtRoute("/leaderboard/999")
    expect(await screen.findByText("Game not found")).toBeInTheDocument()
  })

  it("renders the scorers table with 10 rows", async () => {
    renderAtRoute("/leaderboard/1")
    await screen.findByText("Monday Challenge")
    const rows = screen.getAllByRole("row")
    // 1 header row + 10 data rows
    expect(rows).toHaveLength(11)
  })

  it("shows loading state initially", () => {
    renderAtRoute("/leaderboard/1")
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })
})
