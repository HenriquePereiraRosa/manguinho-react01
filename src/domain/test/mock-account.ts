import { faker } from '@faker-js/faker'
import { type AccountModel } from '../model/account-model'

export const mockAccountModel = (): AccountModel => ({
  accessToken: 'mocked_' + faker.datatype.uuid()
})
