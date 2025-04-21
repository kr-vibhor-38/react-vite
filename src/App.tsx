import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Link } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    // <div>
    //   <h1>My React App 🚀</h1>
    //   <AppRoutes />
    // </div>
    <div>
      {/* Navigation Bar */}
      <nav className="nvbr">
        <div className="logo_">MyApp 🚀</div>
        <div className="nv-containr">
          <ul className="nv-lnks">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/list">List</Link></li>
            <li><Link to="/chart">Chart</Link></li>
            <li><Link to="/donut">Donut Chart</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/lidkar_s">Survey</Link></li>
            <li><Link to="/review">ViewRating</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </nav>

      {/* Routes */}
      <AppRoutes />
    </div>

  );
};

export default App;