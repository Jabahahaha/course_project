import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import LeaderboardListPage from "./LeaderboardListPage"

const renderWithProviders = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LeaderboardListPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe("LeaderboardListPage", () => {
  it("renders without crashing", () => {
    renderWithProviders()
  })

  it("shows the Leaderboard heading", () => {
    renderWithProviders()
    expect(screen.getByText("Leaderboard")).toBeInTheDocument()
  })

  it("renders all game names after loading", async () => {
    renderWithProviders()
    expect(await screen.findByText("Monday Challenge")).toBeInTheDocument()
    expect(screen.getByText("Tuesday Blitz")).toBeInTheDocument()
    expect(screen.getByText("Midweek Marathon")).toBeInTheDocument()
    expect(screen.getByText("Friday Showdown")).toBeInTheDocument()
  })

  it("shows loading state initially", () => {
    renderWithProviders()
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })
})
