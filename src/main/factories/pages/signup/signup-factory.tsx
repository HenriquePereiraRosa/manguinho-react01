import React from 'react'
import Signup from '@/presentation/pages/signup/signup'
import { makeSignUpValidation } from './signup-validation-fatory'

export const makeSignUp: React.FC = () => {
  return (
    <Signup
      validation={makeSignUpValidation()}
    />
  )
}
