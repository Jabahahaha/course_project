import { type LetterResult, type State } from "./types"
import { WORDS } from "./words"

export function createState(): State {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)]
  return {
    word,
    guesses: [],
    maxGuesses: 6,
  }
}

export function evaluateGuess(word: string, guess: string): LetterResult[] {
  const results: LetterResult[] = Array(word.length).fill("absent")
  const remaining = word.split("")

  // first pass: mark correct letters
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      results[i] = "correct"
      remaining[i] = ""
    }
  }

  // second pass: mark present letters
  for (let i = 0; i < guess.length; i++) {
    if (results[i] === "correct") continue

    const index = remaining.indexOf(guess[i])
    if (index !== -1) {
      results[i] = "present"
      remaining[index] = ""
    }
  }

  return results
}

export function getKeyboardLetterState(
  state: State,
  letter: string,
): LetterResult {
  if (letter.trim() === "") return "unknown"

  let best: LetterResult = "unknown"

  for (const guess of state.guesses) {
    const results = evaluateGuess(state.word, guess)

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== letter) continue

      const result = results[i]
      if (result === "correct") return "correct"
      if (result === "present" && best !== "present") best = "present"
      if (result === "absent" && best === "unknown") best = "absent"
    }
  }

  return best
}

export function validateHardMode(state: State, guess: string): string | null {
  for (const prev of state.guesses) {
    const results = evaluateGuess(state.word, prev)

    for (let i = 0; i < results.length; i++) {
      if (results[i] === "correct" && guess[i] !== prev[i]) {
        return `Letter "${prev[i].toUpperCase()}" must stay in position ${i + 1}`
      }
      if (results[i] === "present" && !guess.includes(prev[i])) {
        return `Guess must contain "${prev[i].toUpperCase()}"`
      }
    }
  }

  return null
}

export function addGuess(state: State, guess: string): State {
  return {
    ...state,
    guesses: [...state.guesses, guess.toLowerCase()],
  }
}

export function isGameOver(state: State): boolean {
  if (state.guesses.length >= state.maxGuesses) return true
  return state.guesses.includes(state.word)
}

export function isWin(state: State): boolean {
  return state.guesses.includes(state.word)
}
