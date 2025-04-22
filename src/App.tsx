// import React from "react";
// import AppRoutes from "./routes/AppRoutes";
// import { Link } from "react-router-dom";
// import "./App.css";

// const App: React.FC = () => {
//   return (
//     // <div>
//     //   <h1>My React App 🚀</h1>
//     //   <AppRoutes />
//     // </div>
//     <div>
//       {/* Navigation Bar */}
//       <nav className="nvbr">
//         <div className="logo_">MyApp 🚀</div>
//         <div className="nv-containr">
//           <ul className="nv-lnks">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/feedback">Feedback</Link></li>
//             <li><Link to="/list">List</Link></li>
//             <li><Link to="/chart">Chart</Link></li>
//             <li><Link to="/donut">Donut Chart</Link></li>
//             <li><Link to="/analytics">Analytics</Link></li>
//             <li><Link to="/lidkar_s">Survey</Link></li>
//             <li><Link to="/review">ViewRating</Link></li>
//             <li><Link to="/about">About</Link></li>
//           </ul>
//         </div>
//       </nav>

//       {/* Routes */}
//       <AppRoutes />
//     </div>

//   );
// };

// export default App;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on link click (for better UX on mobile)
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className={`nvbr${menuOpen ? " menu-open" : ""}`}>
        <div className="logo_">MyApp 🚀</div>
        {/* Hamburger Menu (visible on mobile) */}
        <input
          type="checkbox"
          id="nv-menu-toggle"
          className="nv-menu-toggle"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        />
        <label htmlFor="nv-menu-toggle" className="nv-hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className="nv-containr">
          <ul className="nv-lnks">
            <li>
              <Link to="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li>
              <Link to="/feedback" onClick={handleLinkClick}>Feedback</Link>
            </li>
            <li>
              <Link to="/list" onClick={handleLinkClick}>List</Link>
            </li>
            <li>
              <Link to="/chart" onClick={handleLinkClick}>Chart</Link>
            </li>
            <li>
              <Link to="/donut" onClick={handleLinkClick}>Donut_Chart</Link>
            </li>
            <li>
              <Link to="/analytics" onClick={handleLinkClick}>Analytics</Link>
            </li>
            <li>
              <Link to="/lidkar_s" onClick={handleLinkClick}>Survey</Link>
            </li>
            <li>
              <Link to="/review" onClick={handleLinkClick}>ViewRating</Link>
            </li>
            <li>
              <Link to="/about" onClick={handleLinkClick}>About</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Routes */}
      <div style={{ marginTop: "70px" }}>
        
         <AppRoutes /> 
      </div>
    </div>
  );
};

export default App;
