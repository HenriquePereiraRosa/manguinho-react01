import React from 'react'
import Styles from './selector-i18n-styles.scss'
import { useTranslation } from 'react-i18next'

const LanguageSwitcherButton: React.FC = () => {
  const { i18n } = useTranslation()
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedLanguage = event.target.value
    i18n.changeLanguage(selectedLanguage)
  }

  return (
      <select
        className={Styles.container}
        onChange={changeLanguage}
        defaultValue={i18n.language}>

        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
  )
}

export default LanguageSwitcherButton
