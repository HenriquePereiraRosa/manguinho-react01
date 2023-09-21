import { type IValidation } from '@/data/protocols/validation/validation'

export class ValidationStub implements IValidation {
  errorMessage: string
  type: string
  value: string

  validate (type: string, value: string): string {
    this.type = type
    this.value = value
    return this.errorMessage
  }
}
