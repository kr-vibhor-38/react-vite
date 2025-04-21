import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC =() => {
    return (
        <div>
            <h1>HOME PAGE 🏠</h1>
            <p>Welcome to the Home Page!</p>
            <Link to="/about">Go to About Page</Link>
            <Link to="/feedback">Give Feedback</Link>
            <Link to="/list"> Show_the_Data</Link>
            <Link to="/chart">   ChartPractice</Link>
            <Link to="/donut">    Donut Chart</Link>
            <Link to="/analytics">   Voting </Link>
        </div>
    );
};
export default Home;