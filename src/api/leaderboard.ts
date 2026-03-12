import {
  getAllGames,
  getGameById,
  getTopScorers,
  type GameRecord,
  type Player,
} from "../leaderboardData"

const SIMULATED_DELAY_MS = 400

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchAllGames(): Promise<GameRecord[]> {
  await delay(SIMULATED_DELAY_MS)
  return getAllGames()
}

export async function fetchGameById(id: number): Promise<GameRecord | null> {
  await delay(SIMULATED_DELAY_MS)
  return getGameById(id) ?? null
}

export async function fetchTopScorers(
  gameId: number,
  limit: number,
): Promise<Player[]> {
  await delay(SIMULATED_DELAY_MS)
  return getTopScorers(gameId, limit)
}
