import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

const Movie = (props) => {
  const {
    Title,
    Year,
    imdbID,
    Type,
    Poster,
  } = props.movie;

  return (
    <div className="row">
      <div className="col-4 col-md-2 col-lg-1 mb-3">
        <Link to={`/movie/${imdbID}/`}>
          <img src={Poster} className="img-fluid" />
        </Link>
      </div>
      <div className="col-8 col-md-10 col-lg-11 mb-3">
        <Link to={`/movie/${imdbID}/`}>
          <h4>{Title}</h4>
          <p className="sub-red">{Type} | {Year}</p>
        </Link>
      </div>
    </div>
  )
}

export const Home = (props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(searchTerm.trim());
    if (!searchTerm) {
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=b7da8d63`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }

        if (data.Response === 'True' && data.Search) {
          console.log(data);
          setResults(data.Search);
          setError('');
        }
      })
      .catch((error) => {
        setError(error.message);
      })
  }

  return (
    <div className="container">
      <h3 className="search-term-title"> {searchTerm} </h3>
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit} className="form-inline my-4">
            <input
              type="text"
              className="form-control mr-sm-2"
              placeholder="movie"
              value={searchTerm}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          {(() => {
            if (error) {
              return error;
            }
            return results.map((movie) => {
              return <Movie key={movie.imdbID} movie={movie} />;
            })
          })()}
        </div>
      </div>
    </div>
  )
};