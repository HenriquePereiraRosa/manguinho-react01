import React, { memo } from 'react'
import Styles from './header-login-styles.scss'
import Logo from '../../images/logo/logo'
import LanguageSwitcherButton from '../../inputs/selector-i18n/selector-i18n'

const HeaderLogin: React.FC = (props) => {
  return (
    <header className={Styles.header}>
      <div>
        <Logo />
        <h1> H8 - Clean React</h1>
      </div>

      <div className={Styles['language-switcher-button']}>
        <LanguageSwitcherButton />
      </div>

    </header>
  )
}

export default memo(HeaderLogin)
