import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Slider from '../Slider'
import SearchMoviesContext from '../../context/SearchMoviesContext'
import './index.css'

const Search = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1 className="name">No results found.</h1>
      <img
        src=" https://static.vecteezy.com/system/resources/previews/002/723/693/original/no-results-found-illustration-nothing-in-the-box-concept-free-vector.jpg"
        className="error-img"
        alt="error"
      />
    </div>
  )

  const renderMoviesList = searchResponse => {
    const {results} = searchResponse
    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul className="home-container">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultViews = value => {
    const {searchResponse, apiStatus} = value
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value
        return (
          <div className="home-bg-container">
            <Navbar />
            <div className="route-page-body">
              {renderSearchResultViews(value)}
            </div>
            <Slider
              totalPages={searchResponse.totalPages}
              apiCallback={onTriggerSearchingQuery}
            />
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}
export default Search
