import React from 'react'
import Styles from './input-styles.scss'
import { type InputProps } from '@/domain/props/InputProps'
import InputIcon from './input-icon'

const InputRoot: React.FC<InputProps> = (props: InputProps) => {
  const errormessage = props['error-message'] ?? ''

  return (
    <div className={Styles['input-container']}>
      <input {...props} onChange={props.onChange} />
      <InputIcon {...props} error-message={errormessage} />
    </div>
  )
}

export default InputRoot
