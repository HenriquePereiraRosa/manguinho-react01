import React from 'react'
import {
  type RenderResult,
  render,
  cleanup,
  fireEvent,
  waitFor
} from '@testing-library/react'
import SignUp from './signup'
import { ValidationStub } from '@/main/test/mock-validation'
import {
  AccountCreationSpy,
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
import { t } from 'i18next'
import { InvalidParametersError } from '@/domain/errors/invalid-perameters-error'
import { act } from 'react-dom/test-utils'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
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

  const accountCreationSpy = new AccountCreationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <BrowserRouter>
      <SignUp
        validation={validationStub}
        accountCreation={accountCreationSpy}
        saveAccessToken={saveAccessTokenMock} />
    </BrowserRouter >
  )

  return {
    sut,
    validationStub,
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

  test('Should call AccountCreation with correct values', async () => {
    const { sut, accountCreationSpy } = makeSut()

    const {
      nameStub,
      emailStub,
      pwdStub
    } = await doValidSubmit(sut)

    expect(accountCreationSpy.params).toEqual({
      name: nameStub,
      email: emailStub,
      password: pwdStub,
      passwordConfimation: pwdStub
    })
  })

  test('Should not be able to click btn Submit multiple times', async () => {
    const { sut, accountCreationSpy } = makeSut()
    doValidSubmit(sut)
    doValidSubmit(sut)
    doValidSubmit(sut)

    expect(accountCreationSpy.callsCount).toBe(1)
  })

  test('Should not call AccountCreation if form is invalid', () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { sut, accountCreationSpy } = makeSut({ errorMessage })
    doValidSubmit(sut)

    expect(accountCreationSpy.callsCount).toBe(0)
  })

  test('Should present error if AccountCreation fails', async () => {
    const error = new InvalidParametersError()
    const { sut, accountCreationSpy } = makeSut()
    jest.spyOn(accountCreationSpy, 'create')
      .mockReturnValueOnce(Promise.reject(error))
    doValidSubmit(sut)

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

  test('Should LogIn on AccountCreation sucess', async () => {
    const { sut, accountCreationSpy, saveAccessTokenMock } = makeSut()

    act(async () => {
      await doValidSubmit(sut)

      expect(saveAccessTokenMock.accessToken).toBe(accountCreationSpy.account.accessToken)
      expect(location.pathname).toBe('/')
    })
  })

  // TODO: check why the mock is not returning the error
  // test('Should present error if SaveAccessToken fails', async () => {
  //   const {
  //     sut,
  //     saveAccessTokenMock
  //   } = makeSut()
  //   const error = new InvalidCredentialsError()

  //   jest.spyOn(saveAccessTokenMock, 'save')
  //     .mockReturnValueOnce(Promise.reject(error))

  //   // act(async () => {
  //     await doValidSubmit(sut)

  //     Helper.testElementText(sut, 'error-container', error.message)
  //     Helper.testChildCount(sut, 'error-container', 1)
  //   // })
  // })

  // test('Should go to Signup page', async () => {
  //   const { container } = makeSut()
  //   const signupLink = container.querySelector('.signup') as HTMLElement

  //   fireEvent.click(signupLink)
  //   expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup')
  // })

  // test('Should present error if Authenticaton return void data', async () => {
  //   const error = new UnexpectedError()
  //   const { container, authenticationSpy } = makeSut()
  //   jest.spyOn(authenticationSpy, 'doAuth')
  //     .mockReturnValueOnce(Promise.resolve({ accessToken: '' }))
  //   doSubmit(container)

  //   await waitFor(async () => container.querySelector('.error-container'))

  //   const formLoginStatus = container.querySelector('.error-container') as HTMLElement
  //   expect(formLoginStatus.innerHTML).toContain(error.message)
  // })
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

async function doValidSubmit(sut: RenderResult): Promise<{
  nameStub
  emailStub
  pwdStub
  pwdConfirmStub
}> {
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

  await waitFor(() => sut.container.querySelector('.form'))

  return {
    nameStub,
    emailStub,
    pwdStub,
    pwdConfirmStub
  }
}
