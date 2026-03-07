import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"

import LeaderboardDetailPage from "./LeaderboardDetailPage"

const renderAtRoute = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/leaderboard/:id"
          element={<LeaderboardDetailPage />}
        />
      </Routes>
    </MemoryRouter>,
  )

describe("LeaderboardDetailPage", () => {
  it("renders without crashing", () => {
    renderAtRoute("/leaderboard/1")
  })

  it("shows the game name for a valid id", () => {
    renderAtRoute("/leaderboard/1")
    expect(screen.getByText("Monday Challenge")).toBeInTheDocument()
  })

  it("shows Game not found for invalid id", () => {
    renderAtRoute("/leaderboard/999")
    expect(screen.getByText("Game not found")).toBeInTheDocument()
  })

  it("renders the scorers table with 10 rows", () => {
    renderAtRoute("/leaderboard/1")
    const rows = screen.getAllByRole("row")
    // 1 header row + 10 data rows
    expect(rows).toHaveLength(11)
  })
})
