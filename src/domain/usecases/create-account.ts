import { type AccountModel } from '../model/account-model'

export type IAccountCreationParams = {
  email: string
  name: string
  password: string
  passwordConfimation: string
}

export interface IAccountCreation {
  create: (param: IAccountCreationParams) => Promise<AccountModel | undefined>
}
