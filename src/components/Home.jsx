import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// Ensure the component name starts with an uppercase letter
import SearchTrails from './SearchTrails';

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/searchTrails">Search Trails</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;