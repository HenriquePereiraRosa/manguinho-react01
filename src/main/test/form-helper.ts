import { faker } from '@faker-js/faker'
import { type RenderResult, fireEvent } from '@testing-library/react'

export function populateField(container: HTMLElement, selector: string, value?: string): string {
  const fieldValueStub = value ?? faker.random.word()
  const resultField = container.querySelector(selector)
  if (!resultField) {
    console.error(container.innerHTML)
    throw Error('form-helper: rendered field not found')
  }

  fireEvent.input(resultField, { target: { value: fieldValueStub } })
  return fieldValueStub
}

export const checkIfElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.container.querySelector(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.container.querySelector(fieldName) as HTMLElement
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
  attributeName: string,
  expectedValue: any): void => {
  const input = sut.container.querySelector(selector) as HTMLInputElement
  const errorAttributeValue = input.getAttribute(attributeName)

  expect(errorAttributeValue).toBe(expectedValue)
}
