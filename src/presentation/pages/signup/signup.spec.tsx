import React from 'react'
import {
  type RenderResult,
  render,
  cleanup,
  fireEvent
} from '@testing-library/react'
import SignUp from './signup'
import { ValidationStub } from '@/main/test/mock-validation'
import {
  AccountCreationSpy,
  AuthenticationSpy,
  Helper,
  SaveAccessTokenMock
} from '@/main/test'
import { BrowserRouter } from 'react-router-dom'
import {
  CLASS_BTN_SELECTOR_SUBMIT,
  INPUT_SELECTOR_EMAIL,
  INPUT_SELECTOR_NAME,
  INPUT_SELECTOR_PWD,
  INPUT_SELECTOR_PWD_CONFIRM
} from '@/main/global/constants'
import faker from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
  container: HTMLElement
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
  accountCreationSpy: AccountCreationSpy
}

type PopulateParams = {
  name: string
  email: string
  password: string
  passwordConfimation: string
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
  const accountCreationSpy = new AccountCreationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <BrowserRouter>
      <SignUp
        validation={validationStub}
        accountCreation={accountCreationSpy} />
    </BrowserRouter >
  )
  const { container } = sut

  return {
    sut,
    container,
    validationStub,
    authenticationSpy,
    accountCreationSpy,
    saveAccessTokenMock
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should not render error-message inFormStatus on start', () => {
    const { sut, container } = makeSut()

    Helper.testChildCount(sut, '.error-container', 0)
    Helper.testFieldStatus(sut, '.input-status', 0)
    Helper.testButtonIsDisabled(sut, '.button-submit', true)
    Helper.testErrorForInput(sut, INPUT_SELECTOR_NAME, 'error-message', '')
    Helper.testErrorForInput(sut, INPUT_SELECTOR_EMAIL, 'error-message', '')
    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD, 'error-message', '')
    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD_CONFIRM, 'error-message', '')

    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]

    expect(inputStatuses.length).toBe(0)
  })

  test('Should show name error if Validation fails', async () => {
    const validationError = 'Any Error Message'
    const { sut, validationStub } = makeSut({ errorMessage: validationError })

    Helper.populateField(sut.container, INPUT_SELECTOR_NAME, 'John Doe')

    expect(validationStub.errorMessage).toBe(validationError)
    Helper.testErrorForInput(sut, INPUT_SELECTOR_NAME, 'error-message', validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = 'Any Error Message'
    const { sut, validationStub } = makeSut({ errorMessage: validationError })

    Helper.populateField(sut.container, INPUT_SELECTOR_EMAIL)

    expect(validationStub.errorMessage).toBe(validationError)
    Helper.testErrorForInput(sut, INPUT_SELECTOR_EMAIL, 'error-message', validationError)
  })

  test('Should show password error if Validation fails', async () => {
    const validationError = 'Any Error Message'
    const { sut, validationStub } = makeSut({ errorMessage: validationError })

    Helper.populateField(sut.container, INPUT_SELECTOR_PWD)

    expect(validationStub.errorMessage).toBe(validationError)
    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD, 'error-message', validationError)
  })

  test('Should show password-confirmation error if Validation fails', async () => {
    const validationError = 'Any Error Message'
    const { sut, validationStub } = makeSut({ errorMessage: validationError })

    Helper.populateField(sut.container, INPUT_SELECTOR_PWD_CONFIRM)

    expect(validationStub.errorMessage).toBe(validationError)
    Helper.testErrorForInput(sut, INPUT_SELECTOR_PWD_CONFIRM, 'error-message', validationError)
  })

  test('Should enable Submit button if form is valid', async () => {
    const { sut } = makeSut()

    populateAllFields(sut)

    Helper.checkIfElementExists(sut, CLASS_BTN_SELECTOR_SUBMIT)
  })

  test('Should show Spinner on valid Submit', async () => {
    const { sut } = makeSut()

    doValidSubmit(sut)
    Helper.checkIfElementExists(sut, '.loader')
  })

  test('Should call addAccount with correct values', async () => {
    const { sut, accountCreationSpy } = makeSut()

    const {
      nameStub,
      emailStub,
      pwdStub
    } = doValidSubmit(sut)

    expect(accountCreationSpy.params).toEqual({
      name: nameStub,
      email: emailStub,
      password: pwdStub,
      passwordConfimation: pwdStub
    })
  })
})

function populateAllFields(sut: RenderResult, values?: PopulateParams): void {
  const nameStub = values?.name ?? faker.internet.userName()
  const emailStub = values?.email ?? faker.internet.email()
  const pwdStub = values?.password ?? faker.internet.password()
  const pwdConfirmStub = values?.passwordConfimation ?? faker.internet.password()

  Helper.populateField(sut.container, INPUT_SELECTOR_NAME, nameStub)
  Helper.populateField(sut.container, INPUT_SELECTOR_EMAIL, emailStub)
  Helper.populateField(sut.container, INPUT_SELECTOR_PWD, pwdStub)
  Helper.populateField(sut.container, INPUT_SELECTOR_PWD_CONFIRM, pwdConfirmStub)
}

function doValidSubmit(sut: RenderResult): {
  nameStub
  emailStub
  pwdStub
  pwdConfirmStub
} {
  const nameStub = faker.internet.userName()
  const emailStub = faker.internet.email()
  const pwdStub = faker.internet.password()
  const pwdConfirmStub = pwdStub

  populateAllFields(sut, {
    name: nameStub,
    email: emailStub,
    password: pwdStub,
    passwordConfimation: pwdConfirmStub
  })

  const btnSubmit = sut.container.querySelector('.button-submit') as HTMLButtonElement
  fireEvent.click(btnSubmit)

  return {
    nameStub,
    emailStub,
    pwdStub,
    pwdConfirmStub
  }
}
