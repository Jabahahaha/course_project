import { createContext } from "react"

export type GameSettingsState = {
  hardMode: boolean
  toggleHardMode: () => void
}

export const GameSettingsContext = createContext<GameSettingsState | null>(null)
