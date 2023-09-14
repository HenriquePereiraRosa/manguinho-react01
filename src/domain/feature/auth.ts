import { type AccountModel } from '../model/account-model'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface IAuthentication {
  doAuth: (param: AuthenticationParams) => Promise<AccountModel | undefined>
}
