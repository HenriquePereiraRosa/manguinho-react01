import React from 'react'
import FaCircleCheck from '../../icons/fa-circle-check'
import Styles from './input-styles.scss'
import { type InputProps } from '@/domain/props/InputProps'

const InputIconCheck: React.FC<InputProps> = (props: InputProps) => {
  const errormessage = props['error-message'] ?? ''

  return (
    <span className={Styles['input-status']} title={errormessage}>
      <div className={Styles['fa-check']}>
        <FaCircleCheck width="1.5rem" />
      </div>
    </span>
  )
}

export default InputIconCheck
