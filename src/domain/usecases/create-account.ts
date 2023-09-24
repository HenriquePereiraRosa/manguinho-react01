import { type AccountModel } from '../model/account-model'

export type TCreateAccountParams = {
  email: string
  name: string
  password: string
  passwordConfimation: string
}

export interface ICreateAccount {
  create: (param: TCreateAccountParams) => Promise<AccountModel | undefined>
}
