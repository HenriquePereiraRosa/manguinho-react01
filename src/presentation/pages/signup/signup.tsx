import React, { type ChangeEvent, useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import {
  Footer,
  FormLoginStatus,
  HeaderLogin,
  InputRoot
} from '@/presentation/components'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { type IValidation } from '@/data/protocols/validation/validation'
import { isEmpty } from '@/domain/util/string'

type Props = {
  validation: IValidation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const { t } = useTranslation()
  const mainPageUrl: string = '/'
  const loginUrl = '/login'
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    isLoading: false,
    errorMessage: ''
  })

  const placeholderName = t('name-place-holder') || ''
  const placeholderEmail = t('email-place-holder') || ''
  const placeholderPwd = t('pwd-place-holder') || ''
  const placeholderPwdConfirmation = t('pwd-confirm-place-holder') || ''

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [pwdConfirm, setPwdConfirm] = useState<string>('')
  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [pwdError, setPwdError] = useState<string>('')
  const [pwdConfirmError, setPwdConfirmError] = useState<string>('')
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

  useEffect(() => {
    updateBtnStatus()
  }, [email, pwd])

  const updateBtnStatus = (): void => {
    if (!isEmpty(name) &&
      !isEmpty(email) &&
      !isEmpty(pwd) &&
      !isEmpty(pwdConfirm) &&
      isEmpty(nameError) &&
      isEmpty(emailError) &&
      isEmpty(pwdError) &&
      isEmpty(pwdConfirmError)) {
      setBtnDisabled(true)
      return
    }

    setBtnDisabled(false)
  }

  const handleNameOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setNameError(validation.validate('name', value))
    setName(value)
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

  const handlePwdConfirmOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setPwdConfirmError(validation.validate('password-confirmation', value))
    setPwdConfirm(value)
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (formState.isLoading) return

    setFormState({ ...formState, isLoading: true })
    setBtnDisabled(true)
  }

  const goToLogin = (): void => {
    navigate(loginUrl)
  }

  const goToMain = (): void => {
    navigate(mainPageUrl)
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

      <InputRoot
        type="text"
        name='name'
        placeholder={placeholderName}
        onChange={handleNameOnChange}
        value={name}
        error-message={nameError} />

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

      <InputRoot
        type="password"
        placeholder={placeholderPwdConfirmation}
        onChange={handlePwdConfirmOnChange}
        value={pwdConfirm}
        error-message={pwdConfirmError} />

      <button
        className={Styles['button-submit']}
        type="submit"
        disabled={!btnDisabled}
        onClick={handleSubmit} >
        {t('enter')}
      </button>

      <Link
        className={Styles.signup}
        to={loginUrl}
        onClick={goToLogin}>
        {t('login')}
      </Link>

      <Link
        className={Styles.signup}
        to={mainPageUrl}
        onClick={goToMain}>
        MAIN PAGE
        {t('signup')}
      </Link>

      <Footer />
    </div>
  )
}

export default SignUp
