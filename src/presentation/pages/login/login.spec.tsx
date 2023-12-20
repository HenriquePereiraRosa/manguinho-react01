import React from 'react'
import {
  fireEvent,
  render,
  screen,
  type RenderResult,
  waitFor
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
import { ELEMENT_ID_EMAIL, ELEMENT_ID_PWD } from '@/main/global/constants'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-fatory'
import { InvalidFieldError, MinLengthFieldError } from '@/validation/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type PopulParams = {
  sut: RenderResult
  email?: string
  password?: string
}

type PopulResParams = {
  email?: string
  password?: string
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
        validation={makeLoginValidation()}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock} />
    </BrowserRouter >
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

describe('Login Component', () => {
  test('Should not render FormStatus errors on start', () => {
    const { sut } = makeSut()
    const inputStatuses = screen.queryAllByTestId('input-icon-error')
    expect(inputStatuses.length).toBe(0)

    Helper.testChildCountById(sut, 'error-container', 0)
    Helper.checkThatElementDoesNotExistsById(sut, 'input-icon-check')
    Helper.checkThatElementDoesNotExistsById(sut, 'input-icon-error')
    Helper.testButtonIsDisabled(sut, '.button-submit', true)
    Helper.testErrorForInputById(sut, ELEMENT_ID_EMAIL, 'error-message', '')
    Helper.testErrorForInputById(sut, ELEMENT_ID_PWD, 'error-message', '')
  })

  test('Should show email error message if Email Validation fails', () => {
    const validationError = new InvalidFieldError().message
    const { sut } = makeSut()

    Helper.populateFieldById(sut, ELEMENT_ID_EMAIL, 'invalid.email@server')

    Helper.checkThatElementExistsById(sut, 'input-icon-error')
    Helper.testErrorForInputById(sut, ELEMENT_ID_EMAIL, 'error-message', validationError)
  })

  test('Should show Password error message if Password is lesser than Min', () => {
    const validationError = new MinLengthFieldError(5).message
    const { sut } = makeSut()

    Helper.populateFieldById(sut, ELEMENT_ID_PWD, '123')

    Helper.checkThatElementExistsById(sut, 'input-icon-error')
    Helper.testErrorForInputById(sut, ELEMENT_ID_PWD, 'error-message', validationError)
  })

  test('Should enable Submit button if form is valid', async () => {
    const { sut } = makeSut()

    Helper.populateFieldById(sut, ELEMENT_ID_EMAIL, faker.internet.email())
    Helper.populateFieldById(sut, ELEMENT_ID_PWD, faker.internet.password())

    await waitFor(() => {
      const btnSubmit = sut.container.querySelector('.button-submit') as HTMLButtonElement
      expect(btnSubmit.disabled).toBeFalsy()
    })
  })

  test('Should show Spinner on submit', async () => {
    const { sut } = makeSut()

    doSubmit({ sut })

    await waitFor(() => {
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeTruthy()
    })
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { email, password } = doSubmit({ sut })

    await waitFor(() => {
      expect(authenticationSpy.params).toEqual({
        email,
        password
      })
    })
  })

  test('Should not be able to click btn Submit multiple times', () => {
    const { sut, authenticationSpy } = makeSut()
    doSubmit({ sut })
    doSubmit({ sut })

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authenticaton if form is invalid', async () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { sut, authenticationSpy } = makeSut({ errorMessage })
    const invalidEmail = 'email.server.com'
    const invalidPwd = '123'
    doSubmit({
      sut,
      email: invalidEmail,
      password: invalidPwd
    })

    await waitFor(() => {
      expect(authenticationSpy.callsCount).toBe(0)
    })
  })

  test('Should present error if Authenticaton fails', async () => {
    const error = new InvalidCredentialsError()
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'doAuth')
      .mockReturnValueOnce(Promise.reject(error))
    doSubmit({ sut })

    await waitFor(() => {
      const formLoginStatus = sut.container.querySelector('.error-container') as HTMLElement
      expect(formLoginStatus.innerHTML).toContain(error.message)
    })
  })

  test('Should call SaveAccessToken on Auth sucess', async () => {
    const {
      sut,
      authenticationSpy,
      saveAccessTokenMock
    } = makeSut()

    doSubmit({ sut })

    await waitFor(() => {
      expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
      expect(location.pathname).toBe('/')
    })
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(saveAccessTokenMock, 'save')
      .mockReturnValueOnce(Promise.reject(error))
    doSubmit({ sut })

    await waitFor(() => {
      Helper.testElementTextById(sut, 'error-container', error.message)
      Helper.testChildCountById(sut, 'error-container', 1)
    })
  })

  test('Should go to Signup page', async () => {
    const { sut } = makeSut()
    const signupLink = sut.container.querySelector('.signup') as HTMLElement

    fireEvent.click(signupLink)
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup')
  })

  test('Should present error if Authenticaton return void data', async () => {
    const error = new UnexpectedError()
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'doAuth')
      .mockReturnValueOnce(Promise.resolve({ accessToken: '' }))
    doSubmit({ sut })

    await waitFor(() => {
      const formLoginStatus = sut.container.querySelector('.error-container') as HTMLElement
      expect(formLoginStatus.innerHTML).toContain(error.message)
    })
  })
})

function populateEmailAndPwd(params: PopulParams): PopulResParams {
  const emailStub = params.email ?? faker.internet.email()
  const pwdStub = params.password ?? faker.internet.password()
  Helper.populateFieldById(params.sut, ELEMENT_ID_EMAIL, emailStub)
  Helper.populateFieldById(params.sut, ELEMENT_ID_PWD, pwdStub)
  return { email: emailStub, password: pwdStub }
}

function doSubmit(params: PopulParams): PopulResParams {
  const { email, password } = populateEmailAndPwd(params)
  const btnSubmit = params.sut.container.querySelector('.button-submit') as HTMLButtonElement
  fireEvent.click(btnSubmit)

  return { email, password }
}
