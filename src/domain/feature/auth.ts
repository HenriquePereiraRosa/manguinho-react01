import { AccountModel } from '../model/account-model'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Auth {
  exec(param: AuthenticationParams): Promise<AccountModel>
}
