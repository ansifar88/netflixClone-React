import React ,{useEffect,useState}from 'react'
import Youtube from 'react-youtube'
import { API_KEY } from '../../constants/constants'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl} from '../../constants/constants'
function RowPost(props) {
  const [ movies, setMovies] = useState([])
  const [urlid,setUrlId] =useState('')
  useEffect(()=>{
    axios.get(props.url).then(response =>{
      console.log(response.data);
      setMovies(response.data.results)
    }).catch (err=>{
        alert("Not Available")
    })

  },[])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  const handleMovie =(id) =>{
    console.log(id);
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length !== 0){
        setUrlId(response.data.results[0])
      }
    })
  }
  return (
    <div className='row'>
      <h2 >{props.title}</h2>
      <div className="posters">
          {movies.map((movie)=>
        
         <img onClick={()=>handleMovie(movie.id)} className={props.isSmall ? 'smallPoster':'poster'} src={`${imageUrl+movie.backdrop_path}`} alt="poster" />
      )}
       
      </div>
     { urlid && <Youtube opts={opts} videoId={urlid.key}/>}
    </div>
  )
}

export default RowPost
