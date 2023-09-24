import { type AccountModel } from '@/domain/model/account-model'

export type TAuthenticationParams = {
  email: string
  password: string
}

export interface IAuthentication {
  doAuth: (param: TAuthenticationParams) => Promise<AccountModel | undefined>
}
