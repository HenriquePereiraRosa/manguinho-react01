import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login Component', () => {
  test('Should not render FormStatus on start', () => {
    const { container } = render(<Login />)
    const sut = container.querySelector('.error-container')
    const btnSubmit = container.querySelector('.button-submit') as HTMLButtonElement

    expect(sut?.childElementCount).toBe(0)
    expect(btnSubmit.disabled).toBe(true)
  })
})
