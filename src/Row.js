import React from 'react'
import { useEffect, useState } from 'react'
import axios from './axios'
import "./Row.css"
import YouTube from 'react-youtube' 
import  movieTrailer from 'movie-trailer'

function Row({title,fetchUrl,isLargeRow}) {
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'
    const [movies, setmovie] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('')
    useEffect(() => {
        async function fetchData() {
            const request =await axios.get(fetchUrl)
            setmovie(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])
    const handlerClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('')
        }else {
            console.log(`movie -> ${JSON.stringify(movie)}`)
            movieTrailer(movie?.title || '').then((url) =>{
                console.log(`url -> ${url}`)
                const urlParams = new URLSearchParams(new URL(url).searchParams)
                console.log(urlParams)
                setTrailerUrl(urlParams.get('v'))
            })
        }
    }
    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row_posters">
                {movies.map(movie => {
                    return <img onClick={()=>handlerClick(movie)} key={movie.id} className = {`row_poster ${isLargeRow && "row_largeposter"}`} src={`${baseImageUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                })}
            </div>
            {trailerUrl && <YouTube videoId ={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
