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
import { Link, useNavigate } from 'react-router-dom'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import {
  type IAuthentication,
  type ISaveAccessToken
} from '@/domain/usecases'

type Props = {
  validation: IValidation
  authentication: IAuthentication
  saveAccessToken: ISaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
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

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (formState.isLoading) return

    setFormState({ ...formState, isLoading: true })
    setBtnDisabled(true)

    authentication.doAuth({ email, password: pwd })
      .then((account) => {
        if (!!account && (account.accessToken.trim() !== '')) {
          saveAccessToken.save(account.accessToken)
          navigate(mainPageUrl)
        } else {
          throw new UnexpectedError()
        }
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
            name="password"
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
