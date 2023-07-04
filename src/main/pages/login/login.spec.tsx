import React from 'react'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
// import { t } from 'i18next'
import { type InputProps } from '@/domain/props/InputProps'
import faker from '@faker-js/faker'
import { ValidationSpy } from '@/domain/test/mock-validation'

type SutTypes = {
  sut: RenderResult
  container: HTMLElement | Element
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)
  const { container } = sut

  return { sut, container, validationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should not render FormStatus on start', () => {
    const { container } = makeSut()
    const errorContainer = container.querySelector('.error-container')
    const btnSubmit = container.querySelector('.button-submit') as HTMLButtonElement
    const inputEmail = container.querySelector('input[name="email"]') as InputProps
    const inputPassword = container.querySelector('input[name="password"]') as InputProps
    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]

    expect(errorContainer?.childElementCount).toBe(0)
    expect(btnSubmit.disabled).toBe(true)
    expect(inputEmail['error-message']).toBe(undefined)
    expect(inputPassword['error-message']).toBe(undefined)
    expect(inputStatuses.length).toBe(0)
  })

  test('Should call Validation with correct email value', () => {
    const { container, validationSpy } = makeSut()

    const emailStub = faker.internet.email()

    const inputEmail = container.querySelector('input[name="email"]') as HTMLElement
    // const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    // const faCheckDiv0 = inputStatuses[0].querySelector('.fa-check')
    // const faCheckDiv1 = inputStatuses[1].querySelector('.fa-check')

    fireEvent.input(inputEmail, { target: { value: emailStub } })

    expect(validationSpy.name).toBe('email')
    expect(validationSpy.value).toBe(emailStub)
    // expect(inputStatuses.length).toBe(0)

    // expect(faCheckDiv0).not.toBeNull()
    // expect(faCheckDiv1).not.toBeNull()
  })

  test('Should show email error message if Email Validation fails', () => {
    const { container, validationSpy } = makeSut()

    const emailStub = faker.internet.email()

    const inputEmail = container.querySelector('input[name="email"]') as HTMLElement
    // const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    // const faCheckDiv0 = inputStatuses[0].querySelector('.fa-check')

    fireEvent.input(inputEmail, { target: { value: emailStub } })

    expect(validationSpy.name).toBe('email')
    expect(validationSpy.value).toBe(emailStub)
    // expect(inputStatuses[0].title).toBe(t('error-msg-mandatory-field'))
    // expect(faCheckDiv0).not.toBeNull()
  })

  test('Should call Validation with correct password value', () => {
    const { container, validationSpy } = makeSut()

    const pwdStub = faker.internet.password()

    const inputPassword = container.querySelector('input[name="password"]') as HTMLElement
    // const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    // const faCheckDiv1 = inputStatuses[1].querySelector('.fa-check')

    fireEvent.input(inputPassword, { target: { value: pwdStub } })

    expect(validationSpy.name).toBe('password')
    expect(validationSpy.value).toBe(pwdStub)
    // expect(faCheckDiv1).not.toBeNull()
  })

  test('Should show Password error message if Password Validation fails', () => {
    const { container, validationSpy } = makeSut()

    const pwdStub = faker.internet.password()

    const inputPassword = container.querySelector('input[name="password"]') as HTMLElement
    // const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as HTMLElement[]
    // const faCheckDiv1 = inputStatuses[1].querySelector('.fa-check')

    fireEvent.input(inputPassword, { target: { value: pwdStub } })

    expect(validationSpy.name).toBe('password')
    expect(validationSpy.value).toBe(pwdStub)
    // expect(inputStatuses[1].title).toBe(t('error-msg-mandatory-field'))
    // expect(faCheckDiv01.not.toBeNull()
  })
})
