import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"

import { PlayerProvider } from "../../shared/context/PlayerProvider"

import GamePage from "./GamePage"

vi.mock("../../game/logic", async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...(mod as Record<string, unknown>),
    createState: () => ({ word: "dizzy", guesses: [], maxGuesses: 6 }),
  }
})

const renderGamePage = () =>
  render(
    <PlayerProvider>
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>
    </PlayerProvider>,
  )

describe("GamePage", () => {
  it("renders without crashing", () => {
    renderGamePage()
  })

  it("shows the title and Begin button", () => {
    renderGamePage()
    expect(screen.getByText("Wordlish")).toBeInTheDocument()
    expect(screen.getByText("Begin")).toBeInTheDocument()
  })

  it("plays a full game from start to win", async () => {
    const user = userEvent.setup()

    renderGamePage()

    // Start the game
    await user.click(screen.getByText("Begin"))

    // The guess grid should now be visible
    expect(document.querySelector(".guesses")).toBeInTheDocument()
    // The keyboard should be visible
    expect(screen.getByText("Enter")).toBeInTheDocument()

    // Type an incorrect first guess "hello" via physical keyboard
    await user.keyboard("hello")

    // Submit the guess by pressing Enter
    await user.keyboard("{Enter}")

    // The submitted guess should show in the grid (letters appear
    // in both the grid and keyboard, so use getAllByText)
    expect(screen.getAllByText("h").length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText("e").length).toBeGreaterThanOrEqual(2)

    // No win/loss message yet
    expect(screen.queryByText("You won!")).not.toBeInTheDocument()
    expect(screen.queryByText(/Game over!/)).not.toBeInTheDocument()

    // Test backspace: start typing, then delete a character
    await user.keyboard("ab")
    await user.keyboard("{Backspace}")
    // Type the correct word "dizzy" after clearing
    await user.keyboard("{Backspace}")
    await user.keyboard("dizzy")

    // Submit the winning guess
    await user.keyboard("{Enter}")

    // Should show the win message
    expect(screen.getByText("You won!")).toBeInTheDocument()
  })
})
