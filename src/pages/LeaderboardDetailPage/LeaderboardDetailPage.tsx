import { Suspense } from "react"
import { Link, useParams } from "react-router-dom"

import ScorersTable from "../../leaderboard/components/ScorersTable"
import { useGame } from "../../leaderboard/hooks/useLeaderboard"
import ErrorBoundary from "../../shared/components/ErrorBoundary"
import LoadingFallback from "../../shared/components/LoadingFallback"

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
      <Suspense fallback={<LoadingFallback />}>
        <GameDetail id={numericId} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default LeaderboardDetailPage
