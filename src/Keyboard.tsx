import styles from "./Keyboard.module.css"

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
]

const Keyboard: React.FC<{
  getState: (letter: string) => string
}> = ({ getState }) => {
  return (
    <div className={styles.keyboard}>
      {keyboard.map((row, index) => (
        <div key={index} className={styles.row}>
          {row.map((letter) => (
            <span
              key={letter}
              className={styles.key}
              style={{
                background: getState(letter),
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
