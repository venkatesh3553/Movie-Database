import './index.css'
import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {movieDetails} = props
  const {title, posterPath, voteAverage, id} = movieDetails

  return (
    <li className="movie-card-container">
      <img className="img" alt={title} src={posterPath} />
      <h1 className="title">{title}</h1>
      <p className="voteAverage">Rating: {voteAverage}</p>
      <Link to={`/movie/${id}`}>
        <button type="button" className="details-button">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default MovieCard
