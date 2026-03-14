import { Link } from "react-router-dom"

import { useTopScorers } from "../../hooks/useLeaderboard"

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

export default GameCard
