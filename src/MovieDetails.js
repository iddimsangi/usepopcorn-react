import { useState, useEffect } from "react"
import StarRating from "./StarRating";
function MovieDetails({selectedId, KEY}) {
    const[selectedMovie, setSelectedMovie] = useState({});
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
            <StarRating maxRatings={10}/>
        </section>
    )
}

export default MovieDetails
