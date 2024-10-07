import {Component} from 'react'
import Loader from 'react-loader-spinner'
import EachMovieDetailes from '../EachMovieDetailes'
import Navbar from '../Navbar'

class MovieDetails extends Component {
  state = {list: [], isLoding: true}

  componentDidMount() {
    this.getMovie()
  }

  getUpdatedData = responseData => ({
    cast: responseData.cast.map(eachItem => ({
      name: eachItem.name,
      adult: eachItem.adult,
      character: eachItem.character,
      id: eachItem.id,
      originalName: eachItem.original_name,
      knownFforDepartment: eachItem.known_for_department,
      popularity: eachItem.popularity,
      profilePath: `https://image.tmdb.org/t/p/w500${eachItem.profile_path}`,
    })),
  })

  getMovie = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = 'aeba013e59e1288462ede88398dbba14'
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    const newList = this.getUpdatedData(data)
    this.setState({list: newList, isLoding: false})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="gold" />
    </div>
  )

  render() {
    const {list, isLoding} = this.state
    const {cast} = list
    // console.log(list)

    return (
      <div className="home-bg-container">
        <Navbar />
        <h1 className="head">Movie Details</h1>
        {isLoding ? (
          this.renderLoadingView()
        ) : (
          <ul className="home-container">
            {cast.map(eachItem => (
              <EachMovieDetailes list={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default MovieDetails
