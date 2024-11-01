import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the home page!</p>
      <Link to='/employee/list'>View Employee List</Link>
    </div>
  );
};

export default HomePage;
