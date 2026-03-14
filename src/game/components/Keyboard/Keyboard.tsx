import { LETTER_COLORS } from "../../constants"
import { type LetterResult } from "../../types"

import styles from "./Keyboard.module.css"

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
]

const Keyboard: React.FC<{
  getState: (letter: string) => LetterResult
  onKey: (letter: string) => void
  onBackspace: () => void
  onSubmit: () => void
}> = ({ getState, onKey, onBackspace, onSubmit }) => {
  return (
    <div className={styles.keyboard}>
      {keyboard.map((row, index) => (
        <div key={index} className={styles.row}>
          {index === 2 && (
            <span className={styles.key} onClick={onSubmit}>
              Enter
            </span>
          )}
          {row.map((letter) => (
            <span
              key={letter}
              className={styles.key}
              style={{
                background: LETTER_COLORS[getState(letter)],
              }}
              onClick={() => onKey(letter)}
            >
              {letter}
            </span>
          ))}
          {index === 2 && (
            <span className={styles.key} onClick={onBackspace}>
              ←
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
