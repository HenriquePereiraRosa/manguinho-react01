import { type InputProps } from '@/domain/props/InputProps'
import { faker } from '@faker-js/faker'
import { type RenderResult, fireEvent } from '@testing-library/react'

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError: string = ''): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`)
  const field = sut.getByTestId(fieldName)
  const label = sut.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

export const testChildCount = (sut: RenderResult,
  className: string,
  count: number): void => {
  const errorContainer = sut.container.querySelector(className) as HTMLElement

  expect(errorContainer?.childElementCount).toBe(count)
}

export const testFieldStatus = (sut: RenderResult,
  className: string,
  expectedStatus: any): void => {
  const errorContainer = Array.from(sut.container.querySelectorAll(className)) as HTMLElement[]

  expect(errorContainer.length).toBe(expectedStatus)
}

export const testButtonIsDisabled = (sut: RenderResult,
  className: string,
  isDisabled: boolean): void => {
  const btnSubmit = sut.container.querySelector(className) as HTMLButtonElement

  expect(btnSubmit.disabled).toBe(isDisabled)
}

export const testErrorForInput = (sut: RenderResult,
  selector: string,
  expectedFieldClassName: string,
  expectStatus: any): void => {
  const input = sut.container.querySelector(selector) as InputProps

  expect(input[expectedFieldClassName]).toBe(expectStatus)
}

export function populateField(container: HTMLElement, selector: string, value?: string): string {
  const fieldValueStub = value ?? faker.random.word()
  const resultField = container.querySelector(selector) as HTMLElement
  fireEvent.input(resultField, { target: { value } })
  return fieldValueStub
}

export function populateEmailAndPwd(container: HTMLElement): { emailStub: string, pwdStub: string } {
  const emailStub = faker.internet.email()
  const pwdStub = faker.internet.password()
  populateField(container,'input[type="email"]', emailStub)
  populateField(container,'input[type="password"]', pwdStub)
  return { emailStub, pwdStub }
}

export function doSubmit(container: HTMLElement): { emailStub: string, pwdStub: string } {
  const { emailStub, pwdStub } = populateEmailAndPwd(container)
  const btnSubmit = container.querySelector('.button-submit') as HTMLButtonElement
  fireEvent.click(btnSubmit)

  return { emailStub, pwdStub }
}
