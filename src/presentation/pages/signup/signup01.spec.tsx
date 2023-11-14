import React from 'react'
import {
  type RenderResult,
  render,
  cleanup
} from '@testing-library/react'
import SignUp from './signup'
import {
  AccountCreationSpy,
  Helper,
  SaveAccessTokenMock
} from '@/main/test'
import { BrowserRouter } from 'react-router-dom'
import {
  INPUT_SELECTOR_EMAIL,
  INPUT_SELECTOR_NAME,
  INPUT_SELECTOR_PWD,
  INPUT_SELECTOR_PWD_CONFIRM
} from '@/main/global/constants'
import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-fatory'
import { type ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { FieldsNotEqualError, InvalidCharsError, InvalidFieldError, MinLengthFieldError } from '@/validation/errors'

type SutTypes = {
  sut: RenderResult
  validations: ValidationComposite
  saveAccessTokenMock: SaveAccessTokenMock
  accountCreationSpy: AccountCreationSpy
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
  const validations = makeSignUpValidation()

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
    validations,
    accountCreationSpy,
    saveAccessTokenMock
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

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

    Helper.testErrorForInput(sut, INPUT_SELECTOR_EMAIL, 'error-message', validationError)
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
})
