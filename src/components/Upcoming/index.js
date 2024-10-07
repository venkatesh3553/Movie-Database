import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Slider from '../Slider'

import './index.css'

class Upcoming extends Component {
  state = {
    isLoading: true,
    upcomingMovieList: [],
  }

  componentDidMount() {
    this.getUpcomingMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getUpcomingMoviesResponse = async (page = 1) => {
    const API_KEY = 'aeba013e59e1288462ede88398dbba14'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, upcomingMovieList: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {upcomingMovieList} = this.state
    const {results} = upcomingMovieList

    return (
      <>
        <h1 className="head">Upcoming Movies</h1>
        <ul className="home-container">
          {results.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading, upcomingMovieList} = this.state
    // console.log(upcomingMovieList)
    return (
      <div className="home-bg-container">
        <Navbar />
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Slider
          totalPages={upcomingMovieList.totalPages}
          apiCallback={this.getUpcomingMoviesResponse}
        />
      </div>
    )
  }
}
export default Upcoming
