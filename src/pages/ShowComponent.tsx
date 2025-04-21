import React from "react";
import { Link } from "react-router-dom";
import Service from "../Service/Service";
import "./ShowComponent.css"; // Import CSS

const ShowComponent: React.FC = () => {
    const { users, loading, error } = Service();

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="container">
            <h2>Component Page</h2>
            <p className="description">
                This is a component page. Click the links below to go to different pages.
            </p>
            
            {/* Navigation Links */}
            <div className="nav-links">
                <Link to="/">Go to Home Page</Link>
                <Link to="/about">Go to About Page</Link>
                <Link to="/feedback">Give Feedback</Link>
                <Link to="/component">Go to Component Page</Link>
            </div>

            {/* User Data Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                                </td>
                                <td>{user.phone}</td>
                                <td>
                                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                                        {user.website}
                                    </a>
                                </td>
                                <td>
                                    {user.company.name}, {user.company.catchPhrase}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowComponent;
