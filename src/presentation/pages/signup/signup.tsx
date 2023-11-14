import React, { type ChangeEvent, useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import {
  Footer,
  FormStatus,
  HeaderLogin,
  InputRoot
} from '@/presentation/components'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { type IValidation } from '@/data/protocols/validation/validation'
import { isEmpty } from '@/domain/util/string'
import { FormContext } from '@/presentation/contexts'
import {
  type ISaveAccessToken,
  type IAccountCreation
} from '@/domain/usecases'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import ButtonSubmit from '@/presentation/components/buttons/button-submit/button-submit'

type Props = {
  validation: IValidation
  accountCreation: IAccountCreation
  saveAccessToken: ISaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, accountCreation, saveAccessToken }: Props) => {
  const { t } = useTranslation()
  const mainPageUrl: string = '/'
  const loginPageUrl = '/login'
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
  }, [
    name,
    email,
    pwd,
    pwdConfirm
  ])

  const updateBtnStatus = (): void => {
    const isFormValid = !isEmpty(name) &&
      !isEmpty(email) &&
      !isEmpty(pwd) &&
      !isEmpty(pwdConfirm) &&
      isEmpty(nameError) &&
      isEmpty(emailError) &&
      isEmpty(pwdError) &&
      isEmpty(pwdConfirmError)

    setBtnDisabled(isFormValid)
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
    setPwdConfirmError(validation.validate('password-confirmation', [pwd, value]))
    setPwdConfirm(value)
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (formState.isLoading) return

    setFormState({ ...formState, isLoading: true })
    setBtnDisabled(true)

    accountCreation.create({
      name,
      email,
      password: pwd,
      passwordConfimation: pwdConfirm
    })
      .then(async (account) => {
        if (!!account && (account.accessToken.trim() !== '')) {
          saveAccessToken.save(account.accessToken)
          navigate(loginPageUrl)
        } else {
          throw new UnexpectedError()
        }
      })
      .catch((error) => {
        setFormState({
          isLoading: false,
          errorMessage: error.message
        })
      })
      .finally(() => {
        updateBtnStatus()
      })
  }

  const goToLogin = (): void => {
    navigate(loginPageUrl)
  }

  const goToMain = (): void => {
    navigate(mainPageUrl)
  }

  return (

    <div className={Styles.main}>
      <HeaderLogin />

      <div className={Styles.form}>
        <FormContext.Provider value={formState} >

          <div>
            <h1 className={Styles['main-text']}>
              SIGNUP PAGE: (UNDER CONSTRUCTION)
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
            name='password'
            placeholder={placeholderPwd}
            onChange={handlePwdOnChange}
            value={pwd}
            error-message={pwdError} />

          <InputRoot
            type="password"
            name='password-confirmation'
            placeholder={placeholderPwdConfirmation}
            onChange={handlePwdConfirmOnChange}
            value={pwdConfirm}
            error-message={pwdConfirmError} />

          <ButtonSubmit
            disabled={btnDisabled}
            onClick={handleSubmit}>
            {t('signup')}
          </ButtonSubmit>

          <Link
            className={Styles['login-link']}
            to={loginPageUrl}
            onClick={goToLogin}>
            {t('login')}
          </Link>

          <Link
            className={Styles['main-link']}
            to={mainPageUrl}
            onClick={goToMain}>
            MAIN PAGE
            {t('signup')}
          </Link>

          <FormStatus />
        </FormContext.Provider>
      </div>

      <Footer />
    </div >
  )
}

export default SignUp
