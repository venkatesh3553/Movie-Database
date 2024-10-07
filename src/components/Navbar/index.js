import './index.css'
import {Link, withRouter} from 'react-router-dom'
import SearchMoviesContext from '../../context/SearchMoviesContext'

const Navbar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value
        const onChangeHandler = event => onChangeSearchInput(event.target.value)
        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }
        return (
          <div className="">
            <input
              type="text"
              className="input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="search-button"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className="nav-conatiner">
      <div className="logo-container">
        <img
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
          className="logo"
          alt="logo"
        />
        <h1 className="heading">movieDB</h1>
      </div>
      <ul className="navbar-container">
        <Link to="/">
          <li className="nav-head">Popular</li>{' '}
        </Link>
        <Link to="/top-rated">
          <li className="nav-head">Top Rated</li>{' '}
        </Link>
        <Link to="/upcoming">
          <li className="nav-head">Upcoming</li>
        </Link>
        {renderSearchBar()}
      </ul>
    </nav>
  )
}
export default withRouter(Navbar)
