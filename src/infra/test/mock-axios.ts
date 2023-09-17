import faker from '@faker-js/faker'
import axios from 'axios'

export const mockHttpResponse = (): any => ({
  data: faker.random.words(5),
  status: faker.random.numeric(5)
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
