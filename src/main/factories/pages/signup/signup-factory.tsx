import React from 'react'
import Signup from '@/presentation/pages/signup/signup'
import { makeSignUpValidation } from './signup-validation-fatory'
import { makeAccountCreation } from '../../usecases/account-creation/account-creation-factory'
import { makeSaveAccessTokenLocal } from '../../usecases/save-access-token /local-save-access-token-factory'

export const makeSignUp: React.FC = () => {
  return (
    <Signup
      validation={makeSignUpValidation()}
      accountCreation={makeAccountCreation()}
      saveAccessToken={makeSaveAccessTokenLocal()}
    />
  )
}
