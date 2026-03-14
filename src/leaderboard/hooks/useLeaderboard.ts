import {
  type UseSuspenseQueryResult,
  useSuspenseQuery,
} from "@tanstack/react-query"

import {
  fetchAllGames,
  fetchGameById,
  fetchTopScorers,
} from "../api/leaderboard"
import { type GameRecord, type Player } from "../types"

export function useAllGames(): UseSuspenseQueryResult<GameRecord[]> {
  return useSuspenseQuery({
    queryKey: ["games"],
    queryFn: fetchAllGames,
  })
}

export function useGame(id: number): UseSuspenseQueryResult<GameRecord | null> {
  return useSuspenseQuery({
    queryKey: ["games", id],
    queryFn: () => fetchGameById(id),
  })
}

export function useTopScorers(
  gameId: number,
  limit: number,
): UseSuspenseQueryResult<Player[]> {
  return useSuspenseQuery({
    queryKey: ["topScorers", gameId, limit],
    queryFn: () => fetchTopScorers(gameId, limit),
  })
}
