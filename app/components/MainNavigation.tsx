import { NavLink } from "@remix-run/react";

// NavLink has the active property that gets accessed in main.css
// you can see what page you're on
function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/notes">My Notes</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
