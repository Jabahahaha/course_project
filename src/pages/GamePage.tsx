import { useCallback, useEffect, useState } from "react"

import { GameSettingsProvider } from "../context/GameSettingsProvider"
import Guesses from "../Guesses"
import { useGameSettings } from "../hooks/useGameSettings"
import { usePlayer } from "../hooks/usePlayer"
import Keyboard from "../Keyboard"
import {
  type State,
  addGuess,
  createState,
  getLetterState,
  isGameOver,
  isWin,
} from "../logic"

const WORD_LENGTH = 5

const GameContent: React.FC = () => {
  const { name } = usePlayer()
  const { hardMode, toggleHardMode } = useGameSettings()
  const [state, setState] = useState<State>()
  const [currentGuess, setCurrentGuess] = useState("")

  const handleKeyPress = useCallback(
    (letter: string) => {
      if (!state || isGameOver(state)) return
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + letter)
      }
    },
    [state, currentGuess.length],
  )

  const handleBackspace = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1))
  }, [])

  const handleSubmit = useCallback(() => {
    if (!state || currentGuess.length !== WORD_LENGTH) return
    setState(addGuess(state, currentGuess))
    setCurrentGuess("")
  }, [state, currentGuess])

  useEffect(() => {
    if (!state) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        handleSubmit()
      } else if (e.key === "Backspace") {
        handleBackspace()
      } else if (/^[a-z]$/i.test(e.key)) {
        handleKeyPress(e.key.toLowerCase())
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [state, handleKeyPress, handleBackspace, handleSubmit])

  if (!state) {
    return (
      <>
        <h1>Wordlish</h1>
        {name && <p className="greeting">Playing as {name}</p>}
        <div className="game-settings">
          <label>
            <input
              type="checkbox"
              checked={hardMode}
              onChange={toggleHardMode}
            />
            Hard mode
          </label>
        </div>
        <button onClick={() => setState(createState())}>Begin</button>
      </>
    )
  }

  const gameOver = isGameOver(state)
  const won = isWin(state)

  return (
    <>
      <h1>Wordlish</h1>
      {name && <p className="greeting">Playing as {name}</p>}
      {hardMode && <p className="hard-mode-badge">Hard Mode</p>}
      {gameOver && (
        <p>{won ? "You won!" : `Game over! The word was "${state.word}".`}</p>
      )}
      <Guesses
        guesses={state.guesses}
        maxGuesses={state.maxGuesses}
        currentGuess={currentGuess}
        getState={(letter: string, position: number) =>
          getLetterState(state, letter, position)
        }
      />
      <Keyboard
        getState={(letter: string) => getLetterState(state, letter)}
        onKey={handleKeyPress}
        onBackspace={handleBackspace}
        onSubmit={handleSubmit}
      />
    </>
  )
}

const GamePage: React.FC = () => {
  return (
    <GameSettingsProvider>
      <GameContent />
    </GameSettingsProvider>
  )
}

export default GamePage
