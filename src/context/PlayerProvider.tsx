import { useMemo, useState } from "react"
import { type ReactNode } from "react"

import { PlayerContext } from "./PlayerContext"

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState("")

  const value = useMemo(() => ({ name, setName }), [name])

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  )
}
