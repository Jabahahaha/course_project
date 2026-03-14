import { describe, expect, it } from "vitest"

import {
  addGuess,
  createState,
  evaluateGuess,
  getKeyboardLetterState,
  isGameOver,
  isWin,
  validateHardMode,
} from "./logic"
import { type State } from "./types"
import { WORDS } from "./words"

describe("createState", () => {
  it("returns initial state with a word from the word list", () => {
    const state = createState()
    expect(WORDS).toContain(state.word)
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

describe("getKeyboardLetterState", () => {
  it("returns unknown for empty letter", () => {
    const state: State = { word: "dizzy", guesses: ["dizzy"], maxGuesses: 6 }
    expect(getKeyboardLetterState(state, " ")).toBe("unknown")
  })

  it("returns correct for letter in correct position", () => {
    const state: State = { word: "dizzy", guesses: ["dizzy"], maxGuesses: 6 }
    expect(getKeyboardLetterState(state, "d")).toBe("correct")
  })

  it("returns unknown for unguessed letter", () => {
    const state: State = { word: "dizzy", guesses: ["dizzy"], maxGuesses: 6 }
    expect(getKeyboardLetterState(state, "x")).toBe("unknown")
  })

  it("returns present when letter is in word but wrong position", () => {
    const state: State = { word: "dizzy", guesses: ["zxxxx"], maxGuesses: 6 }
    expect(getKeyboardLetterState(state, "z")).toBe("present")
  })

  it("promotes to correct if any guess has it correct", () => {
    const state: State = {
      word: "dizzy",
      guesses: ["zxxxx", "xxzxx"],
      maxGuesses: 6,
    }
    expect(getKeyboardLetterState(state, "z")).toBe("correct")
  })
})

describe("validateHardMode", () => {
  it("returns null when guess satisfies hard mode", () => {
    const state: State = { word: "dizzy", guesses: ["dxxxx"], maxGuesses: 6 }
    expect(validateHardMode(state, "dairy")).toBeNull()
  })

  it("rejects guess missing a correct-position letter", () => {
    const state: State = { word: "dizzy", guesses: ["dxxxx"], maxGuesses: 6 }
    const result = validateHardMode(state, "xxxxx")
    expect(result).toContain("D")
    expect(result).toContain("position 1")
  })

  it("rejects guess missing a present letter", () => {
    const state: State = { word: "dizzy", guesses: ["zxxxx"], maxGuesses: 6 }
    const result = validateHardMode(state, "xxxxx")
    expect(result).toContain("Z")
  })

  it("returns null with no previous guesses", () => {
    const state: State = { word: "dizzy", guesses: [], maxGuesses: 6 }
    expect(validateHardMode(state, "xxxxx")).toBeNull()
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
