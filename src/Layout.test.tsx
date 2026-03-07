import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import Layout from "./Layout"

describe("Layout", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    )
  })

  it("renders Play and Leaderboard nav links", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    )
    expect(screen.getByText("Play")).toBeInTheDocument()
    expect(screen.getByText("Leaderboard")).toBeInTheDocument()
  })
})
