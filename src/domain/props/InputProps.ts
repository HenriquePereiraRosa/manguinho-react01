import { type ElementType } from 'react'

export type InputProps = React.DetailedHTMLProps<React
  .InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  'error-message'?: string
}

export type InputIconComponentProps = {
  icon: ElementType
}
