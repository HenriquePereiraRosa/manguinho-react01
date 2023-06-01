import React from 'react'
import { render } from '@testing-library/react'
import { FormLoginStatus } from '@/presentation/components'

describe('Login Component', () => {
  test('Should not render FormStatus on start', () => {
    const { container } = render(<FormLoginStatus />)
    const sut = container.querySelector('.error-container')

    expect(sut?.childElementCount).toBe(0)
  })
})
