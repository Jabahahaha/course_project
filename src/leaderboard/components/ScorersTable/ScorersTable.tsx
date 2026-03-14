import { usePlayer } from "../../../shared/hooks/usePlayer"
import { useTopScorers } from "../../hooks/useLeaderboard"

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

export default ScorersTable
