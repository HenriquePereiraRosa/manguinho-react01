import { type Validation } from '@/data/protocols/validation/validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  type: string
  value: string

  validate (type: string, value: string): string {
    this.type = type
    this.value = value
    return this.errorMessage
  }
}
