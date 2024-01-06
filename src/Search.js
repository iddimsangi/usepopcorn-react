import { useState, useEffect } from "react"

const KEY = "cb0e6f6d";
function Search({addMoviesHandler}) {
    const [query, setQuery] = useState("");
    useEffect(() => {
      const fetchMovies = async() => {
        try {
          const results = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
    
          if (!results.ok) {
            throw new Error("There is something wrong on fetching movies");
          }
          const data = await results.json();
          console.log(data.Search);
          addMoviesHandler(data.Search)
        } catch (error) {
          console.log(error);
        }
       
      }
      fetchMovies()
    }, [query])
    return (
        <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    )
}

export default Search
