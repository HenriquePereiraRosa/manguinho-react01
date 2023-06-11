import React from 'react'
import Styles from './button-i18n-styles.scss'
import i18n from '@/infra/i18n/i18n'

const onClickFn = (): void => {
  i18n.changeLanguage('fr')
    .catch(error => {
      console.error('Error occurred while changing language:', error)
    })
}

const LanguageSwitcherButton: React.FC = () => {
  return (
    <button className={Styles.button}
      onClick={onClickFn}>Switch to French</button>
  )
}

export default LanguageSwitcherButton
