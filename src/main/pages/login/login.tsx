import React, { type ChangeEvent, useState } from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  FormLoginStatus,
  HeaderLogin,
  Input
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { useTranslation } from 'react-i18next'
import { type Validation } from '@/data/protocols/validation/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const { t } = useTranslation()
  const [formState] = useState({
    isLoading: false,
    errorMessage: ''
  })

  const placeholderEmail = t('email-place-holder') || ''
  const placeholderPwd = t('pwd-place-holder') || ''

  const [emailError, setEmailError] = useState<string>()
  const [pwdError, setPwdError] = useState<string>()

  const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmailError(validation.validate('email', event.target.value))
  }

  const handlePwdOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPwdError(validation.validate('password', event.target.value))
  }

  return (
    <div className={Styles.login}>
      <HeaderLogin />

      <FormContext.Provider value={formState} >
        <form className={Styles.form}>
          <h2>{t('login-title')}</h2>

          <Input
            type="email"
            name="email"
            placeholder={placeholderEmail}
            onChange={handleEmailOnChange}
            error-message={emailError} />

          <Input
            type="password"
            name="password"
            placeholder={placeholderPwd}
            onChange={handlePwdOnChange}
            error-message={pwdError} />

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
