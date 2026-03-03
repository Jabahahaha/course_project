export type LetterResult = "correct" | "present" | "absent" | "unknown"

export type State = {
  word: string
  guesses: string[]
  maxGuesses: number
}

const colors: Record<LetterResult, string> = {
  correct: "#538d4e",
  present: "#b59f3b",
  absent: "#3a3a3c",
  unknown: "#333333",
}

export function createState(): State {
  return {
    word: "dizzy",
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

export function getLetterState(
  state: State,
  letter: string,
  position?: number,
): string {
  if (letter.trim() === "") return colors.unknown

  if (position !== undefined) {
    // for the guess grid: find the specific result at that position
    // we walk guesses top-down, so return the result for whichever
    // guess row this letter belongs to
    for (const guess of state.guesses) {
      if (guess[position] === letter) {
        const results = evaluateGuess(state.word, guess)
        return colors[results[position]]
      }
    }
    return colors.unknown
  }

  // for the keyboard: return the best result across all guesses
  // priority: correct > present > absent > unknown
  let best: LetterResult = "unknown"

  for (const guess of state.guesses) {
    const results = evaluateGuess(state.word, guess)

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== letter) continue

      const result = results[i]
      if (result === "correct") return colors.correct
      if (result === "present" && best !== "present") best = "present"
      if (result === "absent" && best === "unknown") best = "absent"
    }
  }

  return colors[best]
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
