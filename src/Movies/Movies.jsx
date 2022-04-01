import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function Movies() {
  const KEY = "fdf53fc9e25920f6511f36838ef6568b";
  const [allMovies, setAllMovies] = useState([]);
  const [allTV, setTV] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/w500/"
  async function getMovies() {
    let { data } = await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=fdf53fc9e25920f6511f36838ef6568b");
    setAllMovies(data.results.splice(0, 10))
    console.log(allMovies);
  }
  async function getTV() {
    let { data } = await axios.get("https://api.themoviedb.org/3/trending/tv/day?api_key=fdf53fc9e25920f6511f36838ef6568b");
    setTV(data.results.splice(0, 10));
  }
  useEffect(() => {
    getMovies();
    getTV();
  }, [])


  return (
    <>
      <div className="row align-items-center mb-5">
        <div className="col-md-4">
          <h2 className='w-75'>Trending movies to watch now</h2>
        </div>
        {allMovies.map((movie, index) => (
          <div className="col-md-2" key={index}>
            <div className="item position-relative">
              <img src={baseURL + movie.poster_path} className='w-100' alt="" />
              <h4>{movie.title.substr(0, 10)}</h4>
              <span className='rating position-absolute top-0'>{movie.vote_average}</span>

            </div>
          </div>
        ))}
      </div>

      <div className="row align-items-center">
        <div className="col-md-4">
          <h2 className='w-75'>Trending TV to watch now</h2>
        </div>
        {allTV.map((movie, index) => (
          <div className="col-md-2" key={index}>
            <div className="item position-relative">
              <img src={baseURL + movie.poster_path} className='w-100' alt="" />
              <h4>{movie.name.substr(0, 10)}</h4>
              <span className='rating position-absolute top-0'>{movie.vote_average}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}