import React from 'react'
import {
  type RenderResult,
  render,
  cleanup,
  fireEvent,
  waitFor
} from '@testing-library/react'
import Login from './login'
import { t } from 'i18next'
import { type InputProps } from '@/domain/props/InputProps'
import faker from '@faker-js/faker'
import { ValidationStub } from '@/domain/test/mock-validation'
import { AuthenticationSpy } from '@/domain/test/mock-auth'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import 'jest-localstorage-mock'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  container: HTMLElement
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  errorMessage: string
}

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate
}))

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.errorMessage ?? ''

  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <BrowserRouter>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </BrowserRouter >
  )
  const { container } = sut

  return {
    sut,
    container,
    validationStub,
    authenticationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should not render FormStatus on start', () => {
    const { container } = makeSut()
    const errorContainer = container.querySelector('.error-container')
    const btnSubmit = container.querySelector('.button-submit') as HTMLButtonElement
    const inputEmail = container.querySelector('input[type="email"]') as InputProps
    const inputPassword = container.querySelector('input[type="password"]') as InputProps
    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]

    expect(errorContainer?.childElementCount).toBe(0)
    expect(btnSubmit.disabled).toBe(true)
    expect(inputEmail['error-message']).toBe(undefined)
    expect(inputPassword['error-message']).toBe(undefined)
    expect(inputStatuses.length).toBe(0)
  })

  test('Should call Validation with correct email value', () => {
    const { container, validationStub } = makeSut()

    const emailStub = populateEmail(container)

    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    const faCheckDiv0 = inputStatuses[0].querySelector('.fa-check')
    const faCheckDiv1 = inputStatuses[1]

    expect(validationStub.type).toBe('email')
    expect(validationStub.value).toBe(emailStub)
    expect(inputStatuses.length).toBeGreaterThan(0)

    expect(faCheckDiv0).not.toBeNull()
    expect(faCheckDiv1).toBeUndefined()
  })

  test('Should show email error message if Email Validation fails', () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { container, validationStub } = makeSut({ errorMessage })

    const emailStub = populateEmail(container)

    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    const faCheckDiv0 = inputStatuses[0].querySelector('.fa-error')

    expect(validationStub.type).toBe('email')
    expect(validationStub.value).toBe(emailStub)
    expect(inputStatuses[0].title).toBe(t('error-msg-mandatory-field'))
    expect(faCheckDiv0).not.toBeNull()
  })

  test('Should call Validation with correct password value', () => {
    const { container, validationStub } = makeSut()

    const pwdStub = populatePwd(container)

    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    const faCheckDiv1 = inputStatuses[0].querySelector('.fa-check')

    expect(validationStub.type).toBe('password')
    expect(validationStub.value).toBe(pwdStub)
    expect(faCheckDiv1).not.toBeNull()
  })

  test('Should show Password error message if Password Validation fails', () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { container, validationStub } = makeSut({ errorMessage })

    const pwdStub = populatePwd(container, ' ')

    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    const faErrorDiv1 = inputStatuses[0].querySelector('.fa-error')

    expect(validationStub.type).toBe('password')
    expect(validationStub.value).toBe(pwdStub)
    expect(inputStatuses[0].title).toBe(t('error-msg-mandatory-field'))
    expect(faErrorDiv1).not.toBeNull()
  })

  test('Should enable Submit button if form is valid', async () => {
    const { container, validationStub } = makeSut()
    validationStub.errorMessage = ''

    populateEmailAndPwd(container)

    const btnSubmit = container.querySelector('.button-submit') as HTMLButtonElement
    expect(btnSubmit.disabled).toBe(false)
  })

  test('Should show Spinner on submit', () => {
    const { container } = makeSut()
    doSubmit(container)
    const spinner = container.querySelector('.loader') as HTMLButtonElement
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', async () => {
    const { container, authenticationSpy } = makeSut()
    const { emailStub, pwdStub } = doSubmit(container)

    expect(authenticationSpy.params).toEqual({
      email: emailStub,
      password: pwdStub
    })
  })

  test('Should not be able to clicck btn Submit multiple times', async () => {
    const { container, authenticationSpy } = makeSut()
    doSubmit(container)
    doSubmit(container)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authenticaton if form is invalid', () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { container, authenticationSpy } = makeSut({ errorMessage })
    doSubmit(container)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authenticaton fails', async () => {
    const error = new InvalidCredentialsError()
    const { container, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'exec')
      .mockReturnValueOnce(Promise.reject(error))
    doSubmit(container)

    await waitFor(async () => container.querySelector('.error-container'))

    const formLoginStatus = container.querySelector('.error-container') as HTMLElement
    expect(formLoginStatus.innerHTML).toContain(error.message)
  })

  test('Should add "AccessToken" to local_storage on Auth sucess', async () => {
    const { container, authenticationSpy } = makeSut()
    doSubmit(container)

    await waitFor(async () => container.querySelector('.form'))

    expect(localStorage.setItem)
      .toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(location.pathname).toBe('/')
  })

  test('Should go to Signup page', async () => {
    const { container } = makeSut()
    const signupLink = container.querySelector('.signup') as HTMLElement

    fireEvent.click(signupLink)
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup')
  })
})

function doSubmit(container: HTMLElement): { emailStub: string, pwdStub: string } {
  const { emailStub, pwdStub } = populateEmailAndPwd(container)
  const btnSubmit = container.querySelector('.button-submit') as HTMLButtonElement
  fireEvent.click(btnSubmit)

  return { emailStub, pwdStub }
}

function populateEmailAndPwd(container: HTMLElement): { emailStub: string, pwdStub: string } {
  const emailStub = populateEmail(container)
  const pwdStub = populatePwd(container)
  return { emailStub, pwdStub }
}

function populatePwd(container: HTMLElement, pPwd?: string): string {
  const pwdStub = pPwd ?? faker.internet.password()
  const inputPassword = container.querySelector('input[type="password"]') as HTMLElement
  fireEvent.input(inputPassword, { target: { value: pwdStub } })
  return pwdStub
}

function populateEmail(container: HTMLElement, pEmail?: string): string {
  const emailStub = pEmail ?? faker.internet.email()
  const inputEmail = container.querySelector('input[type="email"]') as HTMLElement
  fireEvent.input(inputEmail, { target: { value: emailStub } })
  return emailStub
}
