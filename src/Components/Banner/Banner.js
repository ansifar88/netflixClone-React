import React, { useEffect, useState} from 'react' 
import { API_KEY , imageUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'
function Banner() {
  const [movie,setMovie] = useState()
  useEffect(()=>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[4]);
      setMovie(response.data.results[4])
    })
  },[])
  return (
    <div 
    style={{backgroundImage:`url(${movie ? imageUrl+ movie.backdrop_path: "" })`}}
    className='banner'>
      <div className='content'>
        <h1 className='title'> {  movie ? movie.title : "" }</h1>
        <div className='buttons'>
            <button className='botton'>Play</button>
            <button className='botton'>My list</button>

        </div>
        <h1 className='description'>{movie ? movie.overview : ""}</h1>
      </div>
       <div className="fadebottom"></div>
    </div>
  )
}

export default Banner
