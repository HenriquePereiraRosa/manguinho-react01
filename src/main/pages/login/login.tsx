import React, { useState } from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  FormLoginStatus,
  HeaderLogin,
  Input
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { useTranslation } from 'react-i18next'

const Login: React.FC = () => {
  const { t } = useTranslation()
  const [formState] = useState({
    isLoading: false,
    errorMessage: ''
  })

  const placeholderEmail = t('email-place-holder') || ''
  const placeholderPwd = t('pwd-place-holder') || ''

  return (
    <div className={Styles.login}>
      <HeaderLogin />

      <FormContext.Provider value={formState} >
        <form className={Styles.form}>
          <h2>{t('login-title')}</h2>

          <Input
            type="email"
            name="email"
            placeholder={placeholderEmail}/>
          <Input
            type="password"
            name="password"
            placeholder={placeholderPwd}/>

          <button
            className={Styles['button-submit']}
            type="submit"
            disabled>{t('enter')}</button>

          <span className={Styles.link}>{t('subscribe')}</span>

          <FormLoginStatus />

        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
