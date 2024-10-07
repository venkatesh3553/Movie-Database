import './index.css'

const EachMovieDetailes = props => {
  const {list} = props
  const {
    name,
    adult,
    character,
    id,
    originalName,
    knownFforDepartment,
    popularity,
    profilePath,
  } = list

  return (
    <li className="detailes-container">
      <div className="profail-container">
        <img src={profilePath} alt={name} className="profail" />
      </div>
      <p className="name">
        <span className="span-name"> Name : </span>{' '}
        <span className="span-detailes">{name}</span>
      </p>
      <p className="name">
        <span className="span-name">Original Name : </span>{' '}
        <span className="span-detailes">{originalName}</span>
      </p>
      <p className="name">
        <span className="span-name"> Character : </span>{' '}
        <span className="span-detailes">{character}</span>
      </p>
      <p className="name">
        <span className="span-name"> Department : </span>{' '}
        <span className="span-detailes">{knownFforDepartment}</span>
      </p>
      <p className="name">
        <span className="span-name"> Popularity : </span>{' '}
        <span className="span-detailes">{popularity}</span>
      </p>
    </li>
  )
}
export default EachMovieDetailes
