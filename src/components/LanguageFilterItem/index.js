import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, setActiveLanguage, isActive} = props
  const {id, language} = languageFiltersData

  const onClickFilter = () => {
    setActiveLanguage(id)
  }

  const buttonClass = isActive ? 'activeLanguageButton' : 'language-button'

  return (
    <li className="filter-list-container">
      <button className={buttonClass} type="button" onClick={onClickFilter}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
