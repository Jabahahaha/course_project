import { Link, useParams } from "react-router-dom"

import { getGameById, getTopScorers } from "../leaderboardData"

const LeaderboardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const game = getGameById(Number(id))

  if (!game) {
    return (
      <>
        <h1>Game not found</h1>
        <Link to="/leaderboard">&larr; Back to Leaderboard</Link>
      </>
    )
  }

  const top10 = getTopScorers(game.id, 10)

  return (
    <>
      <Link to="/leaderboard" className="back-link">
        &larr; Back to Leaderboard
      </Link>
      <h1>{game.name}</h1>
      <p className="leaderboard-date">{game.date}</p>
      <table className="scorers-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {top10.map((player, index) => (
            <tr key={player.name}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default LeaderboardDetailPage
