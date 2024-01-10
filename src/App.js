import { useState, useEffect } from "react";
import NavHeader from "./NavHeader";
import Main from "./Main";
import MoviesBox from "./MoviesBox";
import Logo from "./Logo";
import Search from "./Search";
import MoviesResults from "./MoviesResults";
import MoviesList from "./MoviesList";
import MoviesSummary from "./MoviesSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import MovieDetails from "./MovieDetails";
import Loader from "./Loader";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const KEY = "cb0e6f6d";
export default function App() {
  const [movies, setMovies] = useState([]);
  const[selectedId, setSelectedId]=useState(null);
  const [watched, setWatched] = useState(() =>{
    const storedWatched = localStorage.getItem("watched");
    return JSON.parse(storedWatched);
  });
  const[isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const[error, setError] = useState("");
  const addMoviesHandler = (receivedMovies) => {
    setMovies(receivedMovies);
  }

const selectIdHandler = (id) => {
  setSelectedId((selectedId) => id === selectedId ? null : id);
}

const onCloseDetails = () => {
  setSelectedId(null);
}
const onAddWatched = (watchedMovie) => {
  setWatched((watched) => [watchedMovie, ...watched])
}
useEffect(() => {
  localStorage.setItem("watched", JSON.stringify(watched));
},[watched]);
useEffect(() => {
  const fetchMovies = async() => {
    try {
      setError("")
      setIsLoading(true);
      const results = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

      if (!results.ok) {
        throw new Error("There is something wrong on fetching movies");
      }
      const data = await results.json();
      console.log(data.Search);
      setIsLoading(false);
      addMoviesHandler(data.Search)
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
   
  }
  fetchMovies()
}, [query])
console.log(selectedId);
  return (
    <>
      <NavHeader>
        <Logo />
        <Search query={query} setQuery={setQuery}  addMoviesHandler={addMoviesHandler} />
        <MoviesResults movies={movies} />
      </NavHeader>
      <Main>
        <MoviesBox>
          {isLoading && <Loader/>}
          {!isLoading && !error &&(<MoviesList movies={movies} selectIdHandler={selectIdHandler} />)}
        </MoviesBox>
        <MoviesBox>
       {selectedId ? <MovieDetails onAddWatched={onAddWatched} watched={watched} onCloseDetails={onCloseDetails} KEY={KEY} selectedId={selectedId}/>:
         <>
          <MoviesSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
         </>}
        </MoviesBox>
      </Main>
    </>
  );
}
