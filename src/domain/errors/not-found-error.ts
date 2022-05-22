export class NotFoundError extends Error {
  constructor() {
    super('Resource Not Found.')
    this.name = 'NotFoundError'
  }
}