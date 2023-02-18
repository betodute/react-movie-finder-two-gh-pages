import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Home } from './Home';
import { Movie } from './Movie';
import "./style.css";

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {

  return (
  <Router>
    <Link to="/">
      <nav>
        <h3 className="main-headline">Movie Finder</h3>
      </nav>
    </Link>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/movie/:movieId" element={<Movie />}/>
      <Route element={NotFound} />
    </Routes>  
  </Router>    
  );
};

export default App;
