export type Player = {
  name: string
  score: number
}

export type GameRecord = {
  id: number
  name: string
  date: string
  players: Player[]
}
