import { t } from 'i18next'

export class MaxLengthFieldError extends Error {
  constructor(
    private readonly maxLegth: number) {
    const errorMessage = t('error-msg-max-length') + String(maxLegth + 1)
    super(errorMessage)
    this.name = 'MaxLengthFieldError'
  }
}
