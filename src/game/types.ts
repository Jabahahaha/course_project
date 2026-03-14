export type LetterResult = "correct" | "present" | "absent" | "unknown"

export type State = {
  word: string
  guesses: string[]
  maxGuesses: number
}
