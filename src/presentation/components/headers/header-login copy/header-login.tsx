import React, { memo } from 'react'
import Styles from './header-login-styles.scss'
import Logo from '../../images/logo/logo'

const HeaderLogin: React.FC = (props) => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1> H8 - Clean React</h1>
    </header>
  )
}

export default memo(HeaderLogin)
