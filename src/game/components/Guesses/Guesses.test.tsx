import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import Guesses from "./Guesses"

describe("Guesses", () => {
  it("renders without crashing", () => {
    render(<Guesses guesses={[]} maxGuesses={6} currentGuess="" results={[]} />)
  })

  it("renders the correct number of rows", () => {
    const { container } = render(
      <Guesses
        guesses={["hello"]}
        maxGuesses={6}
        currentGuess=""
        results={[["absent", "absent", "absent", "absent", "absent"]]}
      />,
    )
    const rows = container.querySelectorAll(".row")
    expect(rows).toHaveLength(6)
  })
})
