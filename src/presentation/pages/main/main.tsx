import React from 'react'
import Styles from './main-styles.scss'
import {
  Footer,
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

      <div className={Styles.form}>
        <h1 className={Styles['main-text']}>
          THIS IS THE MAIN PAGE
          <img className={Styles.img} src="/public/images/1920_kuehnenagelanchor.png" />
        </h1>

        <Link
          className={Styles.signup}
          to={loginUrl}
          onClick={goToLogin}>
          {t('login')}
        </Link>

      </div>

      <Footer />
    </div>
  )
}

export default Main
