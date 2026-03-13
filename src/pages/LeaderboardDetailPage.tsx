import { Suspense } from "react"
import { Link, useParams } from "react-router-dom"

import ErrorBoundary from "../ErrorBoundary"
import { useGame, useTopScorers } from "../hooks/useLeaderboard"
import { usePlayer } from "../hooks/usePlayer"

const GameDetail: React.FC<{ id: number }> = ({ id }) => {
  const { data: game } = useGame(id)

  if (!game) {
    return (
      <>
        <h1>Game not found</h1>
        <Link to="/leaderboard">&larr; Back to Leaderboard</Link>
      </>
    )
  }

  return (
    <>
      <Link to="/leaderboard" className="back-link">
        &larr; Back to Leaderboard
      </Link>
      <h1>{game.name}</h1>
      <p className="leaderboard-date">{game.date}</p>
      <ScorersTable gameId={game.id} />
    </>
  )
}

const ScorersTable: React.FC<{ gameId: number }> = ({ gameId }) => {
  const { name } = usePlayer()
  const { data: top10 } = useTopScorers(gameId, 10)
  const normalizedName = name.trim().toLowerCase()

  return (
    <table className="scorers-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {top10.map((player, index) => {
          const isCurrentPlayer =
            normalizedName !== "" &&
            player.name.toLowerCase() === normalizedName

          return (
            <tr
              key={player.name}
              className={isCurrentPlayer ? "highlight-row" : undefined}
            >
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const LeaderboardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const numericId = Number(id)

  if (!id || isNaN(numericId)) {
    return (
      <>
        <h1>Invalid game ID</h1>
        <Link to="/leaderboard">&larr; Back to Leaderboard</Link>
      </>
    )
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<p style={{ color: "#818384" }}>Loading...</p>}>
        <GameDetail id={numericId} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default LeaderboardDetailPage
