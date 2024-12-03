import React from 'react'
import {
  type RenderResult,
  render,
  fireEvent,
  screen,
  waitFor
} from '@testing-library/react'
import SignUp from './signup'
import {
  AccountCreationSpy,
  Helper,
  SaveAccessTokenMock
} from '@/main/tests'
import { BrowserRouter } from 'react-router-dom'
import {
  CLASS_BTN_SELECTOR_SUBMIT,
  INPUT_SELECTOR_EMAIL,
  INPUT_SELECTOR_NAME,
  INPUT_SELECTOR_PWD,
  INPUT_SELECTOR_PWD_CONFIRM
} from '@/main/global/constants'
import { InvalidCharsError, InvalidFieldError, MinLengthFieldError, FieldsNotEqualError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-fatory'
import { InvalidParametersError } from '@/domain/errors/invalid-perameters-error'
import { t } from 'i18next'

type SutTypes = {
  sut: RenderResult
  saveAccessTokenMock: SaveAccessTokenMock
  accountCreationSpy: AccountCreationSpy
}

type PopulateParams = {
  sut: RenderResult
  name?: string
  email?: string
  password?: string
  passwordConfimation?: string
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
  const accountCreationSpy = new AccountCreationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <BrowserRouter>
      <SignUp
        validation={makeSignUpValidation()}
        accountCreation={accountCreationSpy}
        saveAccessToken={saveAccessTokenMock} />
    </BrowserRouter >
  )

  return {
    sut,
    accountCreationSpy,
    saveAccessTokenMock
  }
}

describe('SignUp Component', () => {
  test('Should not render error-message inFormStatus on start', () => {
    const { sut } = makeSut()

    Helper.testChildCount(sut, '.error-container', 0)
    Helper.testFieldStatus(sut, '.input-status', 0)
    Helper.testButtonIsDisabled(sut, '.button-submit', true)
    Helper.testErrorForInput(sut, INPUT_SELECTOR_NAME, 'error-message', '')
    Helper.testErrorForInput(sut, INPUT_SELECTOR_EMAIL, 'error-message', '')
    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD, 'error-message', '')
    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD_CONFIRM, 'error-message', '')

    const inputStatuses = Array.from(sut.container.querySelectorAll('.input-status')) as HTMLElement[]

    expect(inputStatuses.length).toBe(0)
  })

  test('Should not render error-message inFormStatus on start', () => {
    const { sut } = makeSut()

    Helper.testChildCount(sut, '.error-container', 0)
    Helper.testFieldStatus(sut, '.input-status', 0)
    Helper.testButtonIsDisabled(sut, '.button-submit', true)
    Helper.testErrorForInput(sut, INPUT_SELECTOR_NAME, 'error-message', '')
    Helper.testErrorForInput(sut, INPUT_SELECTOR_EMAIL, 'error-message', '')
    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD, 'error-message', '')
    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD_CONFIRM, 'error-message', '')

    const inputStatuses = Array.from(sut.container.querySelectorAll('.input-status')) as HTMLElement[]

    expect(inputStatuses.length).toBe(0)
  })

  test('Should show name error if Validation fails', async () => {
    const validationError = new InvalidCharsError().message
    const { sut } = makeSut()

    Helper.populateField(sut, INPUT_SELECTOR_NAME, 'Jo*')

    Helper.testErrorForInput(sut, INPUT_SELECTOR_NAME, 'error-message', validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = new InvalidFieldError().message
    const { sut } = makeSut()

    Helper.populateField(sut, INPUT_SELECTOR_EMAIL, 'invalid.email@server')

    await waitFor(() => {
      Helper.testErrorForInput(sut, INPUT_SELECTOR_EMAIL, 'error-message', validationError)
    })
  })

  test('Should show password error if Validation fails', async () => {
    const minLength = 5
    const validationError = new MinLengthFieldError(minLength).message
    const { sut } = makeSut()

    Helper.populateField(sut, INPUT_SELECTOR_PWD, '123')

    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD, 'error-message', validationError)
  })

  test('Should show password-confirmation error if Validation fails', async () => {
    const validationError = new FieldsNotEqualError().message
    const { sut } = makeSut()

    Helper.populateField(sut, INPUT_SELECTOR_PWD)
    Helper.populateField(sut, INPUT_SELECTOR_PWD_CONFIRM)

    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD_CONFIRM, 'error-message', validationError)
  })

  test('Should enable Submit button if form is valid', async () => {
    const { sut } = makeSut()

    populateAllFields({ sut })

    await waitFor(() => {
      Helper.checkThatElementExists(sut, CLASS_BTN_SELECTOR_SUBMIT)
    })
  })

  test('Should show Spinner on submit', async () => {
    const { sut } = makeSut()

    doSubmit({ sut })

    await waitFor(async () => sut.container.querySelector('.form'))

    await waitFor(() => {
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeTruthy()
    })
  })

  test('Should call AccountCreation with correct values', async () => {
    const { sut, accountCreationSpy } = makeSut()

    const {
      name,
      email,
      password
    } = doSubmit({ sut })

    await waitFor(() => {
      expect(accountCreationSpy.params).toEqual({
        name,
        email,
        password,
        passwordConfimation: password
      })
    })
  })

  test('Should not be able to click btn Submit multiple times', async () => {
    const { sut, accountCreationSpy } = makeSut()
    doSubmit({ sut })
    doSubmit({ sut })
    doSubmit({ sut })

    await waitFor(() => {
      expect(accountCreationSpy.callsCount).toBe(1)
    })
  })

  test('Should not call AccountCreation if form is invalid', async () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { sut, accountCreationSpy } = makeSut({ errorMessage })
    const email = 'invalid.email.server.com'
    doSubmit({ sut, email })

    await waitFor(() => {
      expect(accountCreationSpy.callsCount).toBe(0)
    })
  })

  test('Should present error if AccountCreation fails', async () => {
    const error = new InvalidParametersError()
    const { sut, accountCreationSpy } = makeSut()
    jest.spyOn(accountCreationSpy, 'create')
      .mockReturnValueOnce(Promise.reject(error))
    doSubmit({ sut })

    Helper.testErrorForElement(sut, '.error-container', error.message)
    Helper.testChildCount(sut, '.error-container', 1)
  })

  test('Should go to Login page', async () => {
    const { sut } = makeSut()
    const loginLink = sut.container.querySelector('.login-link') as HTMLElement

    fireEvent.click(loginLink)
    expect(mockedUsedNavigate.mock.lastCall).toContain('/login')
  })

  test('Should go to Main page', async () => {
    const { sut } = makeSut()
    const loginLink = sut.container.querySelector('.main-link') as HTMLElement

    fireEvent.click(loginLink)
    expect(mockedUsedNavigate.mock.lastCall).toContain('/')
  })
})

function populateAllFields(params: PopulateParams): PopulateParams {
  const name = params?.name ?? faker.name.findName()
  const email = params?.email ?? faker.internet.email()
  const password = params?.password ?? faker.internet.password()
  const passwordConfimation = params?.passwordConfimation ?? password

  Helper.populateField(params.sut, INPUT_SELECTOR_NAME, name)
  Helper.populateField(params.sut, INPUT_SELECTOR_EMAIL, email)
  Helper.populateField(params.sut, INPUT_SELECTOR_PWD, password)
  Helper.populateField(params.sut, INPUT_SELECTOR_PWD_CONFIRM, passwordConfimation)

  return { sut: params.sut, name, email, password, passwordConfimation }
}

function doSubmit(params: PopulateParams): PopulateParams {
  const { name, email, password, passwordConfimation } = populateAllFields(params)

  const btnSubmit = params.sut.container.querySelector('.button-submit') as HTMLButtonElement
  fireEvent.click(btnSubmit)

  return {
    sut: params.sut,
    name,
    email,
    password,
    passwordConfimation
  }
}
