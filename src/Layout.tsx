import { NavLink, Outlet } from "react-router-dom"

import { usePlayer } from "./hooks/usePlayer"

const Layout: React.FC = () => {
  const { name, setName } = usePlayer()

  return (
    <>
      <nav className="site-nav">
        <NavLink to="/">Play</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </nav>
      <div className="player-bar">
        <label htmlFor="player-name">Player:</label>
        <input
          id="player-name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <Outlet />
    </>
  )
}

export default Layout
