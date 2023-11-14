import { ValidationBuilder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().name().min(3).max(100).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
    ...ValidationBuilder.field('password-confirmation').required().sameAs('password').build()
  ])
}
