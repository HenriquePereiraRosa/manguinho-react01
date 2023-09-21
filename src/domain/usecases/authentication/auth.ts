import { type AccountModel } from '../../model/account-model'

export type TAuthenticationParams = {
  email: string
  password: string
}

export interface IAuthentication {
  doAuth: (param: TAuthenticationParams) => Promise<AccountModel | undefined>
}
