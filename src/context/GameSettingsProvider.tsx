import { useCallback, useMemo, useState } from "react"
import { type ReactNode } from "react"

import { GameSettingsContext } from "./GameSettingsContext"

export const GameSettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hardMode, setHardMode] = useState(false)

  const toggleHardMode = useCallback(() => {
    setHardMode((prev) => !prev)
  }, [])

  const value = useMemo(
    () => ({ hardMode, toggleHardMode }),
    [hardMode, toggleHardMode],
  )

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  )
}
