import React, { type ChangeEvent, useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  FormLoginStatus,
  HeaderLogin,
  InputRoot
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { useTranslation } from 'react-i18next'
import { type IValidation } from '@/data/protocols/validation/validation'
import { isEmpty } from '@/domain/util/string'
import { type IAuthentication } from '@/domain/feature/auth'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  validation: IValidation
  authentication: IAuthentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({
    isLoading: false,
    errorMessage: ''
  })

  const navigate = useNavigate()
  const mainPageUrl: string = '/'
  const signUpUrl: string = '/signup'

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

  const updateBtnStatus = (): void => {
    if (!isEmpty(email) &&
      !isEmpty(pwd) &&
      isEmpty(emailError) &&
      isEmpty(pwdError)) {
      setBtnDisabled(true)
      return
    }

    setBtnDisabled(false)
  }

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

  const handleSubmit = (): void => {
    if (formState.isLoading) return

    setBtnDisabled(true)
    setFormState({ ...formState, isLoading: true })
    authentication.exec({ email, password: pwd })
      .then((account) => {
        localStorage.setItem('accessToken', account.accessToken)
        navigate(mainPageUrl)
      })
      .catch((error) => {
        setFormState({
          isLoading: false,
          errorMessage: error.message
        })
        setBtnDisabled(false)
      })
  }

  const goToSignUp = (): void => {
    navigate(signUpUrl)
  }

  return (

    <div className={Styles.login}>
      <HeaderLogin />

      <FormContext.Provider value={formState} >
        <form className={Styles.form}>
          <h2>{t('login-title')}</h2>

          <InputRoot
            type="email"
            placeholder={placeholderEmail}
            onChange={handleEmailOnChange}
            value={email}
            error-message={emailError} />

          <InputRoot
            type="password"
            placeholder={placeholderPwd}
            onChange={handlePwdOnChange}
            value={pwd}
            error-message={pwdError} />

          <button
            className={Styles['button-submit']}
            type="submit"
            disabled={!btnDisabled}
            onClick={handleSubmit} >
            {t('enter')}
          </button>

          <Link
            className={Styles.signup}
            to={signUpUrl}
            onClick={goToSignUp}>
            {t('signup')}
          </Link>

          <FormLoginStatus />

        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
