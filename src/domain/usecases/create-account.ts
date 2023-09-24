import { type AccountModel } from '../model/account-model'

export type ICreateAccountParams = {
  email: string
  name: string
  password: string
  passwordConfimation: string
}

export interface ICreateAccount {
  create: (param: ICreateAccountParams) => Promise<AccountModel | undefined>
}
