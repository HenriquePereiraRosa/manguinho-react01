import { type AccountModel } from '../model/account-model'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface IAuthentication {
  exec: (param: AuthenticationParams) => Promise<AccountModel>
}
