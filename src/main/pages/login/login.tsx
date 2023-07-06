import React, { type ChangeEvent, useState, useEffect } from 'react'
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
import { isEmpty } from '@/domain/util/string'

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

  const [email, setEmail] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [pwdError, setPwdError] = useState<string>('')
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

  useEffect(() => {
    updateBtnStatus()
  }, [email, pwd])

  const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setEmailError(validation.validate('email', value))
    setEmail(value)
  }

  const handlePwdOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setPwdError(validation.validate('password', value))
    setPwd(value)
  }

  const updateBtnStatus = (): void => {
    if (!isEmpty(email) &&
      !isEmpty(pwd) &&
      isEmpty(emailError) &&
      isEmpty(pwdError)) {
      setBtnDisabled(true)
      console.log('::-> emailError, pwdError : ', emailError, pwdError)
      return
    }

    setBtnDisabled(false)
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
            value={email}
            error-message={emailError} />

          <Input
            type="password"
            name="password"
            placeholder={placeholderPwd}
            onChange={handlePwdOnChange}
            value={pwd}
            error-message={pwdError} />

          <button
            className={Styles['button-submit']}
            type="submit"
            disabled={!btnDisabled} >
            {t('enter')}
          </button>

          <span className={Styles.link}>{t('subscribe')}</span>

          <FormLoginStatus />

        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
