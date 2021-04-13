import React, { useState } from "react";
import MovieCard from "./movieCard";

export default function SearchMovies() {
  //states- input query, movies
  const [query, setQuery] = useState("");
  //create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState([]);

  const [year, setYear] = useState();

  const searchMovies = async e => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false&year=${year}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="label" id="year">
          1960
        </span>
        <input
          type="range"
          min="1900"
          max="2021"
          value={year}
          onChange={e => {
            setYear(e.target.value);
            document.getElementById("year").innerHTML = e.target.value;
          }}
          className="range"
        />
        <button disabled={query.length < 1} className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter(movie => movie.poster_path)
          .map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}
