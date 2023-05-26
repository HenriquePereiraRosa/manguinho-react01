export class InvalidParametersError extends Error {
  constructor () {
    super('Invalid Parameters. Correct them and try again.')
    this.name = 'InvalidParametersError'
  }
}
