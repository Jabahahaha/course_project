import { Suspense } from "react"

import GameCard from "../../leaderboard/components/GameCard"
import { useAllGames } from "../../leaderboard/hooks/useLeaderboard"
import ErrorBoundary from "../../shared/components/ErrorBoundary"
import LoadingFallback from "../../shared/components/LoadingFallback"

const GamesContent: React.FC = () => {
  const { data: games } = useAllGames()

  return (
    <div className="leaderboard-list">
      {games.map((game) => (
        <GameCard
          key={game.id}
          gameId={game.id}
          name={game.name}
          date={game.date}
        />
      ))}
    </div>
  )
}

const LeaderboardListPage: React.FC = () => {
  return (
    <>
      <h1>Leaderboard</h1>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <GamesContent />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default LeaderboardListPage
