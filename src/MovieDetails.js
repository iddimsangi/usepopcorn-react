import { useState, useEffect } from "react"
import StarRating from "./StarRating";
import Loader from "./Loader";
function MovieDetails({selectedId, KEY, onCloseDetails, onAddWatched,watched}) {
    const[selectedMovie, setSelectedMovie] = useState({});
    const[isLoading, setIsLoading] = useState(false);
    const[userRating, setUserRating] = useState(null);

    const isWatched = watched.map((movie) => movie.id === selectedId);
    console.log(isWatched);
    const{
        Poster,
        Title,
        Released,
        Runtime,
        Type,
        imdbRating,

    }=selectedMovie;
    const userRatingHandler = (rate) => {
        setUserRating(rate);
    }
    const onAddWatchedHandler = () =>{
        const newWatched = {
            Poster,
            Title,
            Runtime,
            userRating,
            imdbRating,
        }
        onAddWatched(newWatched);
        onCloseDetails();
    }
    useEffect(() => {
        const fetchSelected = async() => {
            setIsLoading(true);
            const resp = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const selectData = await resp.json();
            setSelectedMovie(selectData);
            console.log(selectData);
        }
        fetchSelected();
    },[selectedId]);
    console.log(selectedMovie);
    return (
     <section className="details_wrap">
     <span onClick={() => onCloseDetails()} className="btn-back">&larr;</span>
     {/* <p>`Selected Movie Details ID ${selectedId}`</p> */}
     <div className="detail_cont">
         <img src={`${Poster}`} alt="movie photo" className="img"/>
         <div className="details-overview">
             <h2>{Title}</h2>
             <h3>{`${Released} ${Runtime}`}</h3>
             <p>{Type}</p>
             <p>{`${imdbRating} IMDb rating`}</p>
         </div>
     </div>
    <div className="rating">
    <StarRating userRatingHandler={userRatingHandler} maxRatings={10}/>
   {userRating && <button onClick={onAddWatchedHandler} className="btn-add">+ Add</button>}
    </div>
 </section>
    )
}

export default MovieDetails
