import { Link } from 'react-router-dom';

import { AppRouter } from './AppRouter';

export function App() {
  return (
    <div className="app-shell">
      <nav className="app-sidebar">
        <div className="app-sidebar__brand">AI Delivery Planner</div>
        <Link to="/">Dashboard</Link>
        <Link to="/deliveries">Deliveries</Link>
        <Link to="/drivers">Drivers</Link>
        <Link to="/routes">Routes</Link>
        <Link to="/login">Login</Link>
      </nav>
      <main className="app-content">
        <AppRouter />
      </main>
    </div>
  );
}
