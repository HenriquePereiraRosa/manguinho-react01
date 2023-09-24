import { faker } from '@faker-js/faker'
import { type ICreateAccountParams } from '@/domain/usecases'

export const mockCreateAccoutParams = (): ICreateAccountParams => {
  const password = faker.internet.password()

  return {
    email: faker.internet.email(),
    name: faker.name.findName(),
    password,
    passwordConfimation: password
  }
}
