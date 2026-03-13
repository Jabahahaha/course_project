import { createContext } from "react"

export type PlayerState = {
  name: string
  setName: (name: string) => void
}

export const PlayerContext = createContext<PlayerState | null>(null)
