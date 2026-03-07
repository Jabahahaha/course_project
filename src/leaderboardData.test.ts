import { describe, it, expect } from "vitest"

import { getAllGames, getGameById, getTopScorers } from "./leaderboardData"

describe("getAllGames", () => {
  it("returns all 4 games", () => {
    expect(getAllGames()).toHaveLength(4)
  })
})

describe("getGameById", () => {
  it("returns the game for a valid id", () => {
    const game = getGameById(1)
    expect(game).toBeDefined()
    expect(game?.name).toBe("Monday Challenge")
  })

  it("returns undefined for invalid id", () => {
    expect(getGameById(999)).toBeUndefined()
  })
})

describe("getTopScorers", () => {
  it("returns top 3 scorers sorted by score", () => {
    const top3 = getTopScorers(1, 3)
    expect(top3).toHaveLength(3)
    expect(top3[0].score).toBeGreaterThanOrEqual(top3[1].score)
    expect(top3[1].score).toBeGreaterThanOrEqual(top3[2].score)
  })

  it("respects the limit parameter", () => {
    expect(getTopScorers(1, 5)).toHaveLength(5)
    expect(getTopScorers(1, 1)).toHaveLength(1)
  })

  it("returns empty array for invalid game id", () => {
    expect(getTopScorers(999, 3)).toEqual([])
  })
})
