import { Link } from "react-router-dom"

import { getAllGames, getTopScorers } from "../leaderboardData"

const games = getAllGames()

const LeaderboardListPage: React.FC = () => {
  return (
    <>
      <h1>Leaderboard</h1>
      <div className="leaderboard-list">
        {games.map((game) => {
          const top3 = getTopScorers(game.id, 3)
          return (
            <Link
              key={game.id}
              to={`/leaderboard/${game.id}`}
              className="leaderboard-card"
            >
              <h2>{game.name}</h2>
              <p className="leaderboard-date">{game.date}</p>
              <ol className="top-scorers">
                {top3.map((player) => (
                  <li key={player.name}>
                    {player.name} — {player.score}
                  </li>
                ))}
              </ol>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default LeaderboardListPage
