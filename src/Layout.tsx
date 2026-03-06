import { NavLink, Outlet } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <>
      <nav className="site-nav">
        <NavLink to="/">Play</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </nav>
      <Outlet />
    </>
  )
}

export default Layout
