import { describe, expect, it } from "vitest"

import {
  type State,
  addGuess,
  createState,
  evaluateGuess,
  getLetterState,
  isGameOver,
  isWin,
} from "./logic"

describe("createState", () => {
  it("returns initial state", () => {
    const state = createState()
    expect(state.word).toBe("dizzy")
    expect(state.guesses).toEqual([])
    expect(state.maxGuesses).toBe(6)
  })
})

describe("evaluateGuess", () => {
  it("marks all correct for exact match", () => {
    expect(evaluateGuess("dizzy", "dizzy")).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ])
  })

  it("marks absent for letters not in word", () => {
    expect(evaluateGuess("dizzy", "xxxxx")).toEqual([
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
    ])
  })

  it("marks present for correct letter wrong position", () => {
    const result = evaluateGuess("dizzy", "zxxxx")
    expect(result[0]).toBe("present")
  })

  it("handles duplicate letters correctly", () => {
    // word is "dizzy" (two z's at positions 2,3)
    // guess "zzzzz" should mark positions 2,3 correct, rest absent
    const result = evaluateGuess("dizzy", "zzzzz")
    expect(result).toEqual(["absent", "absent", "correct", "correct", "absent"])
  })

  it("does not double-count present letters", () => {
    // word "abcde", guess "aaxxx" — first a correct, second a absent (only one a)
    const result = evaluateGuess("abcde", "aaxxx")
    expect(result[0]).toBe("correct")
    expect(result[1]).toBe("absent")
  })
})

describe("getLetterState", () => {
  const state: State = {
    word: "dizzy",
    guesses: ["dizzy"],
    maxGuesses: 6,
  }

  it("returns unknown color for empty letter", () => {
    expect(getLetterState(state, " ")).toBe("#333333")
  })

  it("returns correct color for keyboard letter in correct position", () => {
    expect(getLetterState(state, "d")).toBe("#538d4e")
  })

  it("returns unknown for unguessed letter", () => {
    expect(getLetterState(state, "x")).toBe("#333333")
  })
})

describe("addGuess", () => {
  it("adds a lowercased guess to state", () => {
    const state = createState()
    const next = addGuess(state, "HELLO")
    expect(next.guesses).toEqual(["hello"])
  })

  it("does not mutate original state", () => {
    const state = createState()
    addGuess(state, "hello")
    expect(state.guesses).toEqual([])
  })
})

describe("isGameOver", () => {
  it("returns false for fresh game", () => {
    expect(isGameOver(createState())).toBe(false)
  })

  it("returns true when max guesses reached", () => {
    const state: State = {
      word: "dizzy",
      guesses: ["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee", "fffff"],
      maxGuesses: 6,
    }
    expect(isGameOver(state)).toBe(true)
  })

  it("returns true when word is guessed", () => {
    const state: State = {
      word: "dizzy",
      guesses: ["dizzy"],
      maxGuesses: 6,
    }
    expect(isGameOver(state)).toBe(true)
  })
})

describe("isWin", () => {
  it("returns false when word not guessed", () => {
    expect(isWin(createState())).toBe(false)
  })

  it("returns true when word is in guesses", () => {
    const state: State = {
      word: "dizzy",
      guesses: ["hello", "dizzy"],
      maxGuesses: 6,
    }
    expect(isWin(state)).toBe(true)
  })
})
