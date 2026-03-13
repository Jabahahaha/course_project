import { useContext } from "react"

import {
  GameSettingsContext,
  type GameSettingsState,
} from "../context/GameSettingsContext"

export function useGameSettings(): GameSettingsState {
  const ctx = useContext(GameSettingsContext)
  if (!ctx)
    throw new Error("useGameSettings must be used within GameSettingsProvider")
  return ctx
}
