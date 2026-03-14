import { type GameRecord, type Player } from "./types"

const games: GameRecord[] = [
  {
    id: 1,
    name: "Monday Challenge",
    date: "2026-03-02",
    players: [
      { name: "Andrei", score: 950 },
      { name: "Boris", score: 880 },
      { name: "Svetlana", score: 840 },
      { name: "Dmitri", score: 790 },
      { name: "Ekaterina", score: 750 },
      { name: "Fyodor", score: 710 },
      { name: "Galina", score: 680 },
      { name: "Igor", score: 650 },
      { name: "Natalya", score: 620 },
      { name: "Kirill", score: 590 },
    ],
  },
  {
    id: 2,
    name: "Tuesday Blitz",
    date: "2026-03-03",
    players: [
      { name: "Boris", score: 920 },
      { name: "Dmitri", score: 900 },
      { name: "Andrei", score: 870 },
      { name: "Fyodor", score: 830 },
      { name: "Svetlana", score: 800 },
      { name: "Kirill", score: 760 },
      { name: "Ekaterina", score: 730 },
      { name: "Galina", score: 700 },
      { name: "Igor", score: 660 },
      { name: "Natalya", score: 640 },
    ],
  },
  {
    id: 3,
    name: "Midweek Marathon",
    date: "2026-03-04",
    players: [
      { name: "Svetlana", score: 980 },
      { name: "Andrei", score: 940 },
      { name: "Ekaterina", score: 910 },
      { name: "Boris", score: 860 },
      { name: "Galina", score: 820 },
      { name: "Dmitri", score: 780 },
      { name: "Igor", score: 740 },
      { name: "Fyodor", score: 700 },
      { name: "Kirill", score: 670 },
      { name: "Natalya", score: 630 },
    ],
  },
  {
    id: 4,
    name: "Friday Showdown",
    date: "2026-03-06",
    players: [
      { name: "Dmitri", score: 970 },
      { name: "Ekaterina", score: 930 },
      { name: "Boris", score: 890 },
      { name: "Andrei", score: 850 },
      { name: "Svetlana", score: 810 },
      { name: "Natalya", score: 770 },
      { name: "Kirill", score: 740 },
      { name: "Galina", score: 710 },
      { name: "Fyodor", score: 680 },
      { name: "Igor", score: 650 },
    ],
  },
]

export function getAllGames(): GameRecord[] {
  return games
}

export function getGameById(id: number): GameRecord | undefined {
  return games.find((g) => g.id === id)
}

export function getTopScorers(gameId: number, limit: number): Player[] {
  const game = getGameById(gameId)
  if (!game) return []
  return [...game.players].sort((a, b) => b.score - a.score).slice(0, limit)
}
