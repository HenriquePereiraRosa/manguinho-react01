import React from 'react'
import Login from '@/presentation/pages/login/login'
import { makeRemoteAuth } from '../../usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './login-validation-fatory'
import { makeSaveAccessTokenLocal } from '../../usecases/save-access-token /local-save-access-token-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuth()}
      validation={makeLoginValidation()}
      saveAccessToken={makeSaveAccessTokenLocal()}
    />
  )
}
