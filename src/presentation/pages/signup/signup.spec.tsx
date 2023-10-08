import React from 'react'
import {
  type RenderResult,
  render,
  cleanup,
  waitFor
} from '@testing-library/react'
import SignUp from './signup'
// import { t } from 'i18next'
// import faker from '@faker-js/faker'
import { ValidationStub } from '@/main/test/mock-validation'
import {
  AuthenticationSpy,
  Helper,
  SaveAccessTokenMock
} from '@/main/test'
import { BrowserRouter } from 'react-router-dom'

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
      <SignUp
        validation={validationStub} />
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

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should not render FormStatus on start', () => {
    const { sut, container } = makeSut()

    Helper.testChildCount(sut, '.error-container', 0)
    Helper.testFieldStatus(sut, '.input-status', 0)
    Helper.testButtonIsDisabled(sut, '.button-submit', true)
    Helper.testErrorForInput(sut, 'input[name="name"]', 'error-message', '')
    Helper.testErrorForInput(sut, 'input[type="email"]', 'error-message', '')
    Helper.testErrorForInput(sut, 'input[type="password"]', 'error-message', '')

    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]

    expect(inputStatuses.length).toBe(0)
  })

  test('Should show name error if Validation fails', async () => {
    const validationError = 'Any Error Message'
    const { sut, validationStub } = makeSut({ errorMessage: validationError })

    Helper.populateField(sut.container, 'input[name="name"]', 'John Doe')

    await waitFor(async () => sut.container.querySelector('input[name="name"]'))
    expect(validationStub.errorMessage).toBe(validationError)

    console.log(sut.container.innerHTML)
    Helper.testErrorForInput(sut, 'input[name="name"]', 'error-message', validationError)
  })
})