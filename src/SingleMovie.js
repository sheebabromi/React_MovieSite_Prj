import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {

  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({show:false, msg:''});
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id])

  const fetchMovie = async(url) =>{
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if(data.Response === 'True'){
        setMovie(data);
        setError({show:false, msg:''})
      }
      else{
        setError({show:true, msg:data.Error})
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
 
  if(loading){
    return <div className="loading"></div>
  }
  if(error.show){
    return <div className='page-error'>
      <h2>{error.msg}</h2>
      <Link to='/'>Back to Movies</Link>
    </div>
  }

  const {Poster:poster, Title:title, Year:year, Plot:plot} = movie;
        return <section className='single-movie'>
        <img  src={poster} alt={title} style={{width:'400px', height:'400px'}} />
        <div className='single-movie-info'>
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to='/' className='btn'>Back to Movies</Link>
        </div>
      </section>
}

export default SingleMovie
