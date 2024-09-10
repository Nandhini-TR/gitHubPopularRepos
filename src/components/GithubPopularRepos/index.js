import Loader from 'react-loader-spinner'

import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repoItems: [],
    apiStatus: apiStatusConstants.initial,
    activeLanguage: 'ALL',
  }

  componentDidMount() {
    this.getRepoItems()
  }

  getRepoItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(item => ({
        name: item.name,
        id: item.id,
        issuesCount: item.issues_count,
        forksCount: item.forks_count,
        starsCount: item.stars_count,
        avatarUrl: item.avatar_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        repoItems: updatedData,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setActiveLanguage = id => {
    this.setState({activeLanguage: id}, this.getRepoItems)
  }

  renderLoadingPage = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepoItems = () => {
    const {repoItems} = this.state
    return (
      <ul className="ul-list">
        {repoItems.map(eachItem => (
          <RepositoryItem key={eachItem.id} repoItems={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailureItems = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <p>Something went wrong. Please try again.</p>
    </div>
  )

  render() {
    const {apiStatus, activeLanguage} = this.state

    let content
    switch (apiStatus) {
      case apiStatusConstants.success:
        content = this.renderRepoItems()
        break
      case apiStatusConstants.failure:
        content = this.renderFailureItems()
        break
      case apiStatusConstants.inProgress:
        content = this.renderLoadingPage()
        break
      default:
        content = null
    }

    return (
      <div className="app-container">
        <h1 className="app-heading">Popular</h1>
        <ul className="filter-ul-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              key={eachData.id}
              languageFiltersData={eachData}
              isActive={eachData.id === activeLanguage}
              setActiveLanguage={this.setActiveLanguage}
            />
          ))}
        </ul>
        {content}
      </div>
    )
  }
}

export default GithubPopularRepos
