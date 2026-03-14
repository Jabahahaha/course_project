import { useCallback, useEffect, useMemo, useState } from "react"

import Guesses from "../../game/components/Guesses"
import Keyboard from "../../game/components/Keyboard"
import { GameSettingsProvider } from "../../game/context/GameSettingsProvider"
import { useGameSettings } from "../../game/hooks/useGameSettings"
import {
  addGuess,
  createState,
  evaluateGuess,
  getKeyboardLetterState,
  isGameOver,
  isWin,
  validateHardMode,
} from "../../game/logic"
import { type State } from "../../game/types"
import { usePlayer } from "../../shared/hooks/usePlayer"

const WORD_LENGTH = 5

const GameContent: React.FC = () => {
  const { name } = usePlayer()
  const { hardMode, toggleHardMode } = useGameSettings()
  const [state, setState] = useState<State>()
  const [currentGuess, setCurrentGuess] = useState("")
  const [error, setError] = useState("")

  const handleKeyPress = useCallback(
    (letter: string) => {
      if (!state || isGameOver(state)) return
      setError("")
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + letter)
      }
    },
    [state, currentGuess.length],
  )

  const handleBackspace = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1))
    setError("")
  }, [])

  const handleSubmit = useCallback(() => {
    if (!state || currentGuess.length !== WORD_LENGTH) return

    const normalizedGuess = currentGuess.toLowerCase()

    if (hardMode) {
      const hardModeError = validateHardMode(state, normalizedGuess)
      if (hardModeError) {
        setError(hardModeError)
        return
      }
    }

    setState(addGuess(state, currentGuess))
    setCurrentGuess("")
    setError("")
  }, [state, currentGuess, hardMode])

  useEffect(() => {
    if (!state) return

    function onKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLElement &&
        (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
      )
        return

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

  const results = useMemo(
    () => (state ? state.guesses.map((g) => evaluateGuess(state.word, g)) : []),
    [state],
  )

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
      {error && (
        <p style={{ color: "#b59f3b", fontSize: "0.85rem" }}>{error}</p>
      )}
      {gameOver && (
        <p>{won ? "You won!" : `Game over! The word was "${state.word}".`}</p>
      )}
      <Guesses
        guesses={state.guesses}
        maxGuesses={state.maxGuesses}
        currentGuess={currentGuess}
        results={results}
      />
      <Keyboard
        getState={(letter: string) => getKeyboardLetterState(state, letter)}
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
