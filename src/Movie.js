import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { json, checkStatus } from './utils';

export const Movie = () => {

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  
  let params = useParams(); 
   
  useEffect(() => {

    fetch(`https://www.omdbapi.com/?i=${params.movieId}&apikey=b7da8d63`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }

        if (data.Response === 'True') {
          setMovie(data);
          setError('');
        }
      })

      .catch((error) => {
        setError(error.message);
      })

  }, [])

  
  if (!movie) {
    return null;
  }

  const {
    Title,
    Year,
    Plot,
    Director,
    imdbRating,
    Poster,
  } = movie;

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-6">
          <h1 className="archivo-font">{Title}</h1>
          <ul className="list-unstyled archivo-font">
            <li>
              <p>Year: {Year}</p>
            </li>
            <li>
              <p>Director: {Director}</p>
            </li>
            <li>
              <p>Plot: {Plot}</p>
            </li>
            <li>
              <p>imdbRating: {imdbRating} / 10</p>
            </li>
          </ul>
        </div>
        <div className="col-6 mt-3">
          <img src={Poster} className="img-fluid" />
        </div>
      </div>
    </div>
  )
};