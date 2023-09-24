import { type IAuthentication, type TAuthenticationParams } from '../../domain/usecases'
import { faker } from '@faker-js/faker'
import { type AccountModel } from '../../domain/model/account-model'
import { mockAccountModel } from './mock-account'

export const mockAuthParams = (): TAuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export class AuthenticationSpy implements IAuthentication {
  params: TAuthenticationParams
  callsCount: number = 0
  account: AccountModel = mockAccountModel()

  async doAuth (params: TAuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
