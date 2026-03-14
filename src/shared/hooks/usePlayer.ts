import { useContext } from "react"

import { PlayerContext, type PlayerState } from "../context/PlayerContext"

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider")
  return ctx
}
