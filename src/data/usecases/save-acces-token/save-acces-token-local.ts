import { type SetStorage } from '@/data/protocols/storage/set-storage'

export class SaveAccessTokenLocal implements SaveAccessTokenLocal {
  constructor(private readonly setStorage: SetStorage) { }

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}
