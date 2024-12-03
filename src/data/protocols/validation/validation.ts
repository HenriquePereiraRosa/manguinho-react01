export interface IValidation {
  validate: (field: string, value: string | string[]) => string
}
