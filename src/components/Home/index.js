import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Slider from '../Slider'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    movieList: [],
  }

  componentDidMount() {
    this.getMovieList()
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

  getMovieList = async (page = 1) => {
    const API_KEY = 'aeba013e59e1288462ede88398dbba14'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, movieList: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {movieList} = this.state
    const {results} = movieList
    return (
      <>
        <h1 className="head">Popular Movies</h1>
        <ul className="home-container ">
          {results.map(movie => (
            <MovieCard movieDetails={movie} key={movie.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading, movieList} = this.state
    // console.log(movieList.results)
    return (
      <div className="home-bg-container">
        <Navbar />
        <div className=" ">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Slider
          totalPages={movieList.totalPages}
          apiCallback={this.getMovieList}
        />
      </div>
    )
  }
}
export default Home
// ccbp submit RJSCPO4LIO
