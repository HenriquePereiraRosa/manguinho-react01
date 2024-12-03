import { faker } from '@faker-js/faker'
import { SaveAccessTokenLocal } from './save-acces-token-local'
import { SetStorageSpy } from '@/main/tests'

describe('SaveAccessTokenLocal', () => {
  it('Should call setStorage() with correct value', async () => {
    const setStorage = new SetStorageSpy()
    const sut = new SaveAccessTokenLocal(setStorage)
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)

    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })
})
