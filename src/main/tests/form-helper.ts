import { faker } from '@faker-js/faker'
import { type RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { screen } from '@testing-library/react'
import { black } from 'ansis'

export const getByTestId = (sut: RenderResult, elementId: string): any => {
  const element = screen.queryByTestId(elementId)
  return element
}

export function populateField(sut: RenderResult, selector: string, value?: string): string {
  const fieldValueStub = value ?? faker.random.word()
  const resultField = sut.container.querySelector(selector)
  if (!resultField) {
    console.log(black.bgYellow(`Element [${selector}] not found in`),
      black.bgGreenBright(`[${sut.container.innerHTML}]`))
    throw new Error('form-helper: rendered field not found  -> SELECTOR: ' + selector)
  }

  fireEvent.input(resultField, { target: { value: fieldValueStub } })
  return fieldValueStub
}

export function populateFieldById(sut: RenderResult, elementId: string, value?: string): string {
  const fieldValueStub = value ?? faker.random.word()
  const resultField = getByTestId(sut, elementId)

  if (!resultField) {
    console.log(black.bgYellow(`Element [${elementId}] not found in`),
      black.bgGreenBright(`[${sut.container.innerHTML}]`))
    throw new Error('form-helper: rendered field not found  -> ELEMENT_ID: ' + elementId)
  }

  fireEvent.input(resultField, { target: { value: fieldValueStub } })
  return fieldValueStub
}

export const checkThatElementExists = (sut: RenderResult, selector: string): void => {
  const el = sut.container.querySelector(selector)
  expect(el).toBeTruthy()
}

export const checkThatElementExistsById = (sut: RenderResult, elementId: string): void => {
  const el = getByTestId(sut, elementId)
  expect(el).toBeTruthy()
}

export const checkThatElementDoesNotExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.container.querySelector(fieldName)
  expect(el).toBeNull()
}

export const checkThatElementDoesNotExistsById = (sut: RenderResult, elementId: string): void => {
  const el = getByTestId(sut, elementId)
  expect(el).toBeNull()
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.container.querySelector(fieldName) as HTMLElement
  expect(el.textContent).toBe(text)
}

export const testElementTextById = (sut: RenderResult, elementId: string, text: string): void => {
  const el = getByTestId(sut, elementId) as HTMLElement
  expect(el.textContent).toBe(text)
}

export const testChildCount = (sut: RenderResult,
  className: string,
  count: number): void => {
  const errorContainer = sut.container.querySelector(className) as HTMLElement

  expect(errorContainer?.childElementCount).toBe(count)
}

export const testChildCountById = (sut: RenderResult,
  elementId: string,
  count: number): void => {
  const errorContainer = getByTestId(sut, elementId) as HTMLElement

  expect(errorContainer?.childElementCount).toBe(count)
}

export const testFieldStatus = (sut: RenderResult,
  className: string,
  expectedStatus: any): void => {
  const errorContainer = Array.from(sut.container.querySelectorAll(className)) as HTMLElement[]

  expect(errorContainer?.length).toBe(expectedStatus)
}

export const testFieldStatusById = (sut: RenderResult,
  elementId: string,
  expectedStatus: any): void => {
  const errorContainer = getByTestId(sut, elementId) as HTMLElement[]

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

export const testErrorForInputById = (sut: RenderResult,
  elementId: string,
  attributeName: string,
  expectedValue: any): void => {
  const input = getByTestId(sut, elementId) as HTMLInputElement
  const errorAttributeValue = input.getAttribute(attributeName)

  expect(errorAttributeValue).toBe(expectedValue)
}

export const testErrorForElement = async (sut: RenderResult,
  selector: string,
  expectedValue: any): Promise<void> => {
  const element = sut.container.querySelector(selector) as HTMLInputElement

  await waitFor(async () => sut.container.querySelector('.error-container'))

  expect(element.innerHTML).toContain(expectedValue)
}
