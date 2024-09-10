import './index.css'

const RepositoryItem = props => {
  const {repoItems} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoItems

  return (
    <li className="list-container">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="name">{name}</h1>
      <div className="counts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars-image"
        />
        <p className="count-description">{starsCount} stars</p>
      </div>
      <div className="counts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars-image"
        />
        <p className="count-description">{forksCount} forks</p>
      </div>
      <div className="counts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="stars-image"
        />
        <p className="count-description">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
