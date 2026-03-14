import cx from "classnames"

import { LETTER_COLORS } from "../../constants"
import { type LetterResult } from "../../types"

import styles from "./Guesses.module.css"

const WORD_LENGTH = 5

const Guesses: React.FC<{
  guesses: string[]
  maxGuesses: number
  currentGuess: string
  results: LetterResult[][]
}> = ({ guesses, maxGuesses, currentGuess, results }) => {
  const rows: string[] = []

  for (let i = 0; i < maxGuesses; i++) {
    if (i < guesses.length) {
      rows.push(guesses[i])
    } else if (i === guesses.length) {
      rows.push(currentGuess.padEnd(WORD_LENGTH))
    } else {
      rows.push(" ".repeat(WORD_LENGTH))
    }
  }

  return (
    <div className={cx("guesses", styles.guesses)}>
      {rows.map((word, rowIndex) => {
        const isSubmitted = rowIndex < guesses.length
        const rowResults = results[rowIndex]

        return (
          <div key={rowIndex} className={styles.row}>
            {word.split("").map((letter, colIndex) => (
              <span
                key={colIndex}
                className={cx(styles.letter, {
                  [styles.letterFilled]: letter !== " " && !isSubmitted,
                  [styles.letterSubmitted]: isSubmitted,
                })}
                style={{
                  background:
                    isSubmitted && rowResults
                      ? LETTER_COLORS[rowResults[colIndex]]
                      : undefined,
                }}
              >
                {letter === " " ? "" : letter}
              </span>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Guesses
