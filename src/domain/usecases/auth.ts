import { type AccountModel } from '@/domain/model/account-model'

export type IAuthenticationParams = {
  email: string
  password: string
}

export interface IAuthentication {
  doAuth: (param: IAuthenticationParams) => Promise<AccountModel | undefined>
}
