import React from "react";
import { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import './Banner.css'

function Banner() {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  const [movies, setmovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      // console.log(request)
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movies);
  function truncate(str,n){
      return str?.length > n ? str.substr(0,n-1)+'....' : str
  }
  return (
    <header className = "banner" style = {{
        backgroundSize : 'cover',
        backgroundImage : `url(${baseImageUrl}${movies?.poster_path})`,
        backgroundPosition:'center center'
    }}>
      <div className = "banner_content">
        <h1 className = "banner_title">{movies?.title || movies?.name || movies?.original_name}</h1>
        <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
            {truncate(movies?.overview,200)}
        </h1>
        {/* {fetchUrl} */}
      </div>
      <div className="banner_fadebottom"></div>
    </header>
  );
}

export default Banner;
