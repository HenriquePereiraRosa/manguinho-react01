import faker from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

const makesut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalAStoragedapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call LocalStorage with correct values', async () => {
    const sut = makesut()
    const key = faker.database.column()
    const value = faker.random.word()

    await sut.set(key, value)

    expect(localStorage.setItem)
      .toHaveBeenCalledWith(key, value)
  })
})
