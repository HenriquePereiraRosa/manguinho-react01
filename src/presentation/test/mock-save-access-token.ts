import { type ISaveAccessToken } from '../../domain/usecases/authentication/save-access-token'

export class SaveAccessTokenMock implements ISaveAccessToken {
  accessToken: string

  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
}
