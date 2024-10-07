import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Slider from '../Slider'

import './index.css'

class TopRated extends Component {
  state = {
    isLoading: true,
    topRatedMovieList: [],
  }

  componentDidMount() {
    this.getTopRatedMoviesList()
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

  getTopRatedMoviesList = async (page = 1) => {
    const API_KEY = 'aeba013e59e1288462ede88398dbba14'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, topRatedMovieList: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {topRatedMovieList} = this.state
    const {results} = topRatedMovieList
    return (
      <>
        <h1 className="head">TopRated Movies</h1>
        <ul className="home-container">
          {results.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading, topRatedMovieList} = this.state
    return (
      <div className="home-bg-container">
        {' '}
        <Navbar />
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Slider
          totalPages={topRatedMovieList.totalPages}
          apiCallback={this.getTopRatedMoviesList}
        />
      </div>
    )
  }
}
export default TopRated
