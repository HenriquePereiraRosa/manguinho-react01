import { AuthenticationParams } from "../feature/auth";
import { faker } from '@faker-js/faker'

export const mockAuthParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})