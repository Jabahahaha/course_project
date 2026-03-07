import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import LeaderboardListPage from "./LeaderboardListPage"

describe("LeaderboardListPage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LeaderboardListPage />
      </MemoryRouter>,
    )
  })

  it("shows the Leaderboard heading", () => {
    render(
      <MemoryRouter>
        <LeaderboardListPage />
      </MemoryRouter>,
    )
    expect(screen.getByText("Leaderboard")).toBeInTheDocument()
  })

  it("renders all game names", () => {
    render(
      <MemoryRouter>
        <LeaderboardListPage />
      </MemoryRouter>,
    )
    expect(screen.getByText("Monday Challenge")).toBeInTheDocument()
    expect(screen.getByText("Tuesday Blitz")).toBeInTheDocument()
    expect(screen.getByText("Midweek Marathon")).toBeInTheDocument()
    expect(screen.getByText("Friday Showdown")).toBeInTheDocument()
  })
})
