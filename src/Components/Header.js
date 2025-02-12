import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="bg-primary text-white p-3">
      <div className="container">
        <h1>My Application</h1>
        <nav>
          <Link to="/" className="text-white">Home</Link>
          {(currentPath === '/' || currentPath === '/create' || currentPath === '/update') && (
            <> | <Link to="/read" className="text-white">Read</Link></>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
