import { faker } from '@faker-js/faker'
import {
  type IAuthenticationParams,
  type IAccountCreation,
  type IAccountCreationParams
} from '@/domain/usecases'
import { type AccountModel } from '@/domain/model/account-model'
import { mockAccountModel } from './mock-account'

export const mockCreateAccoutParams = (): IAccountCreationParams => {
  const password = faker.internet.password()

  return {
    email: faker.internet.email(),
    name: faker.name.findName(),
    password,
    passwordConfimation: password
  }
}

export class AccountCreationSpy implements IAccountCreation {
  params: IAuthenticationParams
  callsCount: number = 0
  account: AccountModel = mockAccountModel()

  async create(params: IAccountCreationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
