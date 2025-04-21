import React from "react";
import { Link } from "react-router-dom";

const About:React.FC = () => {
    return (
        <div>
            <h2>About Page 📖</h2>
            <p>This is the about page. Click the link below to go to the home page.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default About;