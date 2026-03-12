import { Suspense } from "react"
import { Link } from "react-router-dom"

import ErrorBoundary from "../ErrorBoundary"
import { useAllGames, useTopScorers } from "../hooks/useLeaderboard"

const GameCard: React.FC<{ gameId: number; name: string; date: string }> = ({
  gameId,
  name,
  date,
}) => {
  const { data: top3 } = useTopScorers(gameId, 3)

  return (
    <Link to={`/leaderboard/${gameId}`} className="leaderboard-card">
      <h2>{name}</h2>
      <p className="leaderboard-date">{date}</p>
      <ol className="top-scorers">
        {top3.map((player) => (
          <li key={player.name}>
            {player.name} — {player.score}
          </li>
        ))}
      </ol>
    </Link>
  )
}

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
        <Suspense fallback={<p style={{ color: "#818384" }}>Loading...</p>}>
          <GamesContent />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default LeaderboardListPage
