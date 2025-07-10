import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="text-center">
    <h1 className="text-primary">Welcome to Freelance Platform</h1>
    <Link className="btn btn-primary m-2" to="/login">Login</Link>
    <Link className="btn btn-secondary" to="/register">Register</Link>
  </div>
);

export default Home;
