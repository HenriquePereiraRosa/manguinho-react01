import { faker } from '@faker-js/faker';
import { AccountModel } from "../model/account-model";

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})