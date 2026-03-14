import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import Keyboard from "./Keyboard"

const noop = vi.fn()

describe("Keyboard", () => {
  it("renders without crashing", () => {
    render(
      <Keyboard
        getState={() => "unknown"}
        onKey={noop}
        onBackspace={noop}
        onSubmit={noop}
      />,
    )
  })

  it("renders all 26 letter keys plus Enter and backspace", () => {
    render(
      <Keyboard
        getState={() => "unknown"}
        onKey={noop}
        onBackspace={noop}
        onSubmit={noop}
      />,
    )
    expect(screen.getByText("Enter")).toBeInTheDocument()
    expect(screen.getByText("←")).toBeInTheDocument()
    expect(screen.getByText("q")).toBeInTheDocument()
    expect(screen.getByText("m")).toBeInTheDocument()
  })

  it("calls onKey when a letter is clicked", async () => {
    const onKey = vi.fn()
    render(
      <Keyboard
        getState={() => "unknown"}
        onKey={onKey}
        onBackspace={noop}
        onSubmit={noop}
      />,
    )
    await userEvent.click(screen.getByText("a"))
    expect(onKey).toHaveBeenCalledWith("a")
  })

  it("calls onSubmit when Enter is clicked", async () => {
    const onSubmit = vi.fn()
    render(
      <Keyboard
        getState={() => "unknown"}
        onKey={noop}
        onBackspace={noop}
        onSubmit={onSubmit}
      />,
    )
    await userEvent.click(screen.getByText("Enter"))
    expect(onSubmit).toHaveBeenCalled()
  })

  it("calls onBackspace when ← is clicked", async () => {
    const onBackspace = vi.fn()
    render(
      <Keyboard
        getState={() => "unknown"}
        onKey={noop}
        onBackspace={onBackspace}
        onSubmit={noop}
      />,
    )
    await userEvent.click(screen.getByText("←"))
    expect(onBackspace).toHaveBeenCalled()
  })
})
