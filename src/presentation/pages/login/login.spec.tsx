import React from 'react'
import {
  fireEvent,
  render,
  waitFor,
  type RenderResult
} from '@testing-library/react'
import Login from './login'
import { t } from 'i18next'
import faker from '@faker-js/faker'
import { ValidationStub } from '@/main/tests/mock-validation'
import {
  AuthenticationSpy,
  Helper,
  SaveAccessTokenMock
} from '@/main/tests'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { BrowserRouter } from 'react-router-dom'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { INPUT_SELECTOR_EMAIL, INPUT_SELECTOR_PWD } from '@/main/global/constants'

type SutTypes = {
  sut: RenderResult
  container: HTMLElement
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
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
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <BrowserRouter>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock} />
    </BrowserRouter >
  )
  const { container } = sut

  return {
    sut,
    container,
    validationStub,
    authenticationSpy,
    saveAccessTokenMock
  }
}

describe('Login Component', () => {
  // afterEach(cleanup)

  test('Should not render FormStatus errors on start', () => {
    const { sut } = makeSut()
    const inputStatuses = Array.from(sut.container.querySelectorAll('.input-status')) as HTMLElement[]
    expect(inputStatuses.length).toBe(0)

    Helper.testChildCount(sut, '.error-container', 0)
    Helper.testFieldStatus(sut, '.input-status', 0)
    Helper.testButtonIsDisabled(sut, '.button-submit', true)
    Helper.testErrorForInput(sut, 'input[type="email"]', 'error-message', '')
    Helper.testErrorForInput(sut, 'input[type="password"]', 'error-message', '')
  })

  test('Should call Validation with correct email value', () => {
    const { sut, validationStub } = makeSut()

    const emailStub = Helper.populateField(sut,
      'input[type="email"]',
      faker.internet.email())

    const inputStatuses = Array.from(sut.container.querySelectorAll('.input-status')) as HTMLElement[]
    const faCheckDiv0 = inputStatuses[0].querySelector('.fa-check')
    const faCheckDiv1 = inputStatuses[1]

    expect(validationStub.field).toBe('email')
    expect(validationStub.value).toBe(emailStub)
    expect(inputStatuses.length).toBeGreaterThan(0)

    expect(faCheckDiv0).not.toBeNull()
    expect(faCheckDiv1).toBeUndefined()
  })

  test('Should show email error message if Email Validation fails', () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { sut, validationStub } = makeSut({ errorMessage })

    const emailStub = Helper.populateField(sut, 'input[type="email"]', faker.internet.email())

    const inputStatuses = Array.from(sut.container.querySelectorAll('.input-status')) as HTMLElement[]
    const faCheckDiv0 = inputStatuses[0].querySelector('.fa-error')

    expect(validationStub.field).toBe('email')
    expect(validationStub.value).toBe(emailStub)
    expect(inputStatuses[0].title).toBe(t('error-msg-mandatory-field'))
    expect(faCheckDiv0).not.toBeNull()
  })

  test('Should call Validation with correct password value', () => {
    const { sut, validationStub } = makeSut()

    const pwdStub = Helper.populateField(sut, 'input[type="password"]', ' ')

    const inputStatuses = Array.from(sut.container.querySelectorAll('.input-status')) as HTMLElement[]
    const faCheckDiv1 = inputStatuses[0].querySelector('.fa-check')

    expect(validationStub.field).toBe('password')
    expect(validationStub.value).toBe(pwdStub)
    expect(faCheckDiv1).not.toBeNull()
  })

  test('Should show Password error message if Password Validation fails', () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { sut, validationStub } = makeSut({ errorMessage })

    const pwdStub = Helper.populateField(sut, 'input[type="password"]', ' ')

    Helper.testFieldStatus(sut, '.fa-error', 1)
    const inputStatuses = Array.from(sut.container.querySelectorAll('.input-status')) as HTMLElement[]

    expect(validationStub.field).toBe('password')
    expect(validationStub.value).toBe(pwdStub)
    expect(inputStatuses[0].title).toBe(t('error-msg-mandatory-field'))
  })

  test('Should enable Submit button if form is valid', async () => {
    const { sut } = makeSut()

    Helper.populateField(sut, INPUT_SELECTOR_EMAIL)
    Helper.populateField(sut, INPUT_SELECTOR_PWD)

    const btnSubmit = sut.container.querySelector('.button-submit') as HTMLButtonElement
    expect(btnSubmit.disabled).toBe(false)
  })

  test('Should show Spinner on submit', () => {
    const { sut } = makeSut()
    doSubmit(sut)
    const spinner = sut.container.querySelector('.loader') as HTMLButtonElement
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { emailStub, pwdStub } = doSubmit(sut)

    expect(authenticationSpy.params).toEqual({
      email: emailStub,
      password: pwdStub
    })
  })

  test('Should not be able to click btn Submit multiple times', async () => {
    const { sut, authenticationSpy } = makeSut()
    doSubmit(sut)
    doSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authenticaton if form is invalid', () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { sut, authenticationSpy } = makeSut({ errorMessage })
    doSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authenticaton fails', async () => {
    const error = new InvalidCredentialsError()
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'doAuth')
      .mockReturnValueOnce(Promise.reject(error))
    doSubmit(sut)

    await waitFor(async () => sut.container.querySelector('.error-container'))

    const formLoginStatus = sut.container.querySelector('.error-container') as HTMLElement
    expect(formLoginStatus.innerHTML).toContain(error.message)
  })

  test('Should call SaveAccessToken on Auth sucess', async () => {
    const {
      sut,
      authenticationSpy,
      saveAccessTokenMock
    } = makeSut()

    doSubmit(sut)

    await waitFor(async () => sut.container.querySelector('.form'))

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(location.pathname).toBe('/')
  })

  // TODO: check why the mock is not returning the error
  // test('Should present error if SaveAccessToken fails', async () => {
  //   const {
  //     sut,
  //     container,
  //     saveAccessTokenMock
  //   } = makeSut()
  //   const error = new InvalidCredentialsError()

  //   jest.spyOn(saveAccessTokenMock, 'save')
  //     .mockReturnValueOnce(Promise.reject(error))
  //   doSubmit(container)

  //   await waitFor(async () => container.querySelector('.error-container'))

  //   Helper.testElementText(sut, 'error-container', error.message)
  //   Helper.testChildCount(sut, 'error-container', 1)
  // })

  test('Should go to Signup page', async () => {
    const { container } = makeSut()
    const signupLink = container.querySelector('.signup') as HTMLElement

    fireEvent.click(signupLink)
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup')
  })

  test('Should present error if Authenticaton return void data', async () => {
    const error = new UnexpectedError()
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'doAuth')
      .mockReturnValueOnce(Promise.resolve({ accessToken: '' }))
    doSubmit(sut)

    await waitFor(async () => sut.container.querySelector('.error-container'))

    const formLoginStatus = sut.container.querySelector('.error-container') as HTMLElement
    expect(formLoginStatus.innerHTML).toContain(error.message)
  })
})

function populateEmailAndPwd(sut: RenderResult): { emailStub: string, pwdStub: string } {
  const emailStub = faker.internet.email()
  const pwdStub = faker.internet.password()
  Helper.populateField(sut, INPUT_SELECTOR_EMAIL, emailStub)
  Helper.populateField(sut, INPUT_SELECTOR_PWD, pwdStub)
  return { emailStub, pwdStub }
}

function doSubmit(sut: RenderResult): { emailStub: string, pwdStub: string } {
  const { emailStub, pwdStub } = populateEmailAndPwd(sut)
  const btnSubmit = sut.container.querySelector('.button-submit') as HTMLButtonElement
  fireEvent.click(btnSubmit)

  return { emailStub, pwdStub }
}
