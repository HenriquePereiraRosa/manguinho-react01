import React from 'react'
import Styles from './input-styles.scss'
import { type InputProps } from '@/domain/props/InputProps'
import FaCircleError from '../../icons/fa-circle-error'

const InputIconError: React.FC<InputProps> = (props: InputProps) => {
  const errormessage = props['error-message'] ?? ''

  return (
    <span className={Styles['input-status']} title={errormessage}>
      <div className={Styles['fa-error']}>
        <FaCircleError width="1.5rem" />
      </div>
    </span>
  )
}

export default InputIconError
