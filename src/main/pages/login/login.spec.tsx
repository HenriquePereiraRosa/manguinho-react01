import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import Login from './login'
import { t } from 'i18next'
import { type InputProps } from '@/domain/props/InputProps'

type SutTypes = {
  sut: RenderResult
  container: HTMLElement | Element
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  const { container } = sut
  return { sut, container }
}

describe('Login Component', () => {
  test('Should not render FormStatus on start', () => {
    const { container } = makeSut()
    const errorContainer = container.querySelector('.error-container')
    const btnSubmit = container.querySelector('.button-submit') as HTMLButtonElement
    const inputEmail = container.querySelector('input[name="email"]') as InputProps
    const inputPassword = container.querySelector('input[name="password"]') as InputProps
    const inputStatuses = Array.from(container.querySelectorAll('.input-status'))
    const faCheckDiv0 = inputStatuses[0].querySelector('.fa-check')
    const faCheckDiv1 = inputStatuses[1].querySelector('.fa-check')

    expect(errorContainer?.childElementCount).toBe(0)
    expect(btnSubmit.disabled).toBe(true)
    expect(inputEmail['error-message']).toBe(undefined)
    expect(inputPassword['error-message']).toBe(undefined)
    expect(inputStatuses[0].title).toBe(t('error-msg-mandatory-field'))
    expect(inputStatuses[1].title).toBe(t('error-msg-mandatory-field'))

    expect(faCheckDiv0).not.toBeNull()
    expect(faCheckDiv1).not.toBeNull()
  })
})
