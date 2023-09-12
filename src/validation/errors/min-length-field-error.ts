import { t } from 'i18next'

export class MinLengthFieldError extends Error {
  constructor(private readonly minLength: number) {
    const errorMessage = t('error-msg-min-length') + String(minLength - 1)
    super(errorMessage)
    this.name = 'MinLengthFieldError'
  }
}
