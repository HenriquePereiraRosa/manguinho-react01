import React from 'react'
import { type RenderResult, render, cleanup, fireEvent, act } from '@testing-library/react'
import Login from './login'
import { t } from 'i18next'
import { type InputProps } from '@/domain/props/InputProps'
import faker from '@faker-js/faker'
import { ValidationStub } from '@/domain/test/mock-validation'

type SutTypes = {
  sut: RenderResult
  container: HTMLElement | Element
  validationStub: ValidationStub
}

type SutParams = {
  errorMessage: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.errorMessage ?? ''
  const sut = render(<Login validation={validationStub} />)
  const { container } = sut

  return { sut, container, validationStub }
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

    const emailStub = faker.internet.email()

    const inputEmail = container.querySelector('input[type="email"]') as HTMLElement

    fireEvent.input(inputEmail, { target: { value: emailStub } })

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

    const emailStub = 'invalid_email' // WRONG EMAIL

    const inputEmail = container.querySelector('input[type="email"]') as HTMLElement

    fireEvent.input(inputEmail, { target: { value: emailStub } })

    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    const faCheckDiv0 = inputStatuses[0].querySelector('.fa-error')

    expect(validationStub.type).toBe('email')
    expect(validationStub.value).toBe(emailStub)
    expect(inputStatuses[0].title).toBe(t('error-msg-mandatory-field'))
    expect(faCheckDiv0).not.toBeNull()
  })

  test('Should call Validation with correct password value', () => {
    const { container, validationStub } = makeSut()

    const pwdStub = faker.internet.password()

    const inputPassword = container.querySelector('input[type="password"]') as HTMLElement

    fireEvent.input(inputPassword, { target: { value: pwdStub } })

    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    const faCheckDiv1 = inputStatuses[0].querySelector('.fa-check')

    expect(validationStub.type).toBe('password')
    expect(validationStub.value).toBe(pwdStub)
    expect(faCheckDiv1).not.toBeNull()
  })

  test('Should show Password error message if Password Validation fails', () => {
    const errorMessage = t('error-msg-mandatory-field')
    const { container, validationStub } = makeSut({ errorMessage })

    const pwdStub = ' '// WRONG PWD

    const inputPassword = container.querySelector('input[type="password"]') as HTMLElement

    fireEvent.input(inputPassword, { target: { value: pwdStub } })

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

    const emailStub = faker.internet.email()
    const pwdStub = faker.internet.password()

    act(() => {
      const inputEmail = container.querySelector('input[type="email"]') as HTMLElement
      const inputPassword = container.querySelector('input[type="password"]') as HTMLElement

      fireEvent.input(inputEmail, { target: { value: emailStub } })
      fireEvent.input(inputPassword, { target: { value: pwdStub } })
    })

    const btnSubmit = container.querySelector('.button-submit') as HTMLButtonElement
    expect(btnSubmit.disabled).toBe(false)
  })
})
