import React from 'react'
import Styles from './main-styles.scss'
import {
  Footer,
  FormLoginStatus,
  HeaderLogin
} from '@/presentation/components'
import { t } from 'i18next'
import { Link, useNavigate } from 'react-router-dom'

const Main: React.FC = () => {
  const loginUrl = '/login'

  const navigate = useNavigate()

  const goToLogin = (): void => {
    navigate(loginUrl)
  }

  return (

    <div className={Styles.main}>
      <HeaderLogin />
      <FormLoginStatus />

      <div>
        <h1 className={Styles['main-text']}>
          THIS IS THE MAIN PAGE: (IN CONSTRUICTION)
        </h1>
      </div>

      <Link
        className={Styles.signup}
        to={loginUrl}
        onClick={goToLogin}>
        {t('login')}
      </Link>

      <Footer />
    </div>
  )
}

export default Main
