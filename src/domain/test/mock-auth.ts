import { type IAuthentication, type AuthenticationParams } from '../feature/auth'
import { faker } from '@faker-js/faker'
import { type AccountModel } from '../model/account-model'
import { mockAccountModel } from './mock-account'

export const mockAuthParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export class AuthenticationSpy implements IAuthentication {
  params: AuthenticationParams

  async exec (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(mockAccountModel())
  }
}
