import { useState, useEffect } from "react"
import StarRating from "./StarRating";
import Loader from "./Loader";
function MovieDetails({selectedId, KEY, onCloseWatch}) {
    const[selectedMovie, setSelectedMovie] = useState({});
    const[isLoading, setIsLoading] = useState(false);
    const{
        Poster,
        Title,
        Released,
        Runtime,
        Type,
        imdbRating,

    }=selectedMovie;
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
     <span onClick={() => onCloseWatch()} className="btn-back">&larr;</span>
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
    <StarRating maxRatings={10}/>
    <button className="btn-add">+ Add</button>
    </div>
 </section>
    )
}

export default MovieDetails
