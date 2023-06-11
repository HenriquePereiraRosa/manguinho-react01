import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'
import { t } from 'i18next'
import { type InputProps } from '@/domain/props/InputProps'

describe('Login Component', () => {
  test('Should not render FormStatus on start', () => {
    const { container } = render(<Login />)
    const sut = container.querySelector('.error-container')
    const btnSubmit = container.querySelector('.button-submit') as HTMLButtonElement
    const inputEmail = container.querySelector('input[name="email"]') as InputProps
    const inputPassword = container.querySelector('input[name="password"]') as InputProps
    const inputStatuses = Array.from(container.querySelectorAll('.input-status')) as InputProps[]

    expect(sut?.childElementCount).toBe(0)
    expect(btnSubmit.disabled).toBe(true)
    expect(inputEmail.errormessage).toBe(undefined)
    expect(inputPassword.errormessage).toBe(undefined)
    expect(inputStatuses[0].title).toBe(t('error-msg-mandatory-field'))
    expect(inputStatuses[1].title).toBe(t('error-msg-mandatory-field'))
  })
})
