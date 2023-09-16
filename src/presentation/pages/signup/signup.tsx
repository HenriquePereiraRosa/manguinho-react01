import React from 'react'
import Styles from './signup-styles.scss'
import {
  Footer,
  FormLoginStatus,
  HeaderLogin
} from '@/presentation/components'
import { t } from 'i18next'
import { Link, useNavigate } from 'react-router-dom'

const SignUp: React.FC = () => {
  const mainUrl = '/'
  const loginUrl = '/login'

  const navigate = useNavigate()

  const goToLogin = (): void => {
    navigate(loginUrl)
  }

  const goToMain = (): void => {
    navigate(mainUrl)
  }

  return (

    <div className={Styles.main}>
      <HeaderLogin />
      <FormLoginStatus />

      <div>
        <h1 className={Styles['main-text']}>
          SIGNUP PAGE: (IN CONSTRUICTION)
        </h1>
      </div>

      <Link
        className={Styles.signup}
        to={loginUrl}
        onClick={goToLogin}>
        {t('login')}
      </Link>

      <Link
        className={Styles.signup}
        to={mainUrl}
        onClick={goToMain}>
        MAIN PAGE
      </Link>

      <Footer />
    </div>
  )
}

export default SignUp
