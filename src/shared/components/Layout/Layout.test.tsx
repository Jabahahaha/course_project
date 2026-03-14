import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { PlayerProvider } from "../../context/PlayerProvider"

import Layout from "./Layout"

describe("Layout", () => {
  it("renders without crashing", () => {
    render(
      <PlayerProvider>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </PlayerProvider>,
    )
  })

  it("renders Play and Leaderboard nav links", () => {
    render(
      <PlayerProvider>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </PlayerProvider>,
    )
    expect(screen.getByText("Play")).toBeInTheDocument()
    expect(screen.getByText("Leaderboard")).toBeInTheDocument()
  })
})
