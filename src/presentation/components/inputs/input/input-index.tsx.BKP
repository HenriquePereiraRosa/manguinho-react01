import React from 'react'
import FaCircleCheck from '../../icons/fa-circle-check'
import Styles from './input-styles.scss'
import { type InputProps } from '@/domain/props/InputProps'
import FaCircleError from '../../icons/fa-circle-error'

const Input: React.FC<InputProps> = (props: InputProps) => {
  const errormessage = props['error-message'] ?? ''

  return (
    <div className={Styles['input-container']}>
      <input {...props} onChange={props.onChange} />

      {errormessage.trim() && (
        <span className={Styles['input-status']} title={errormessage}>
          <div className={Styles['fa-error']}>
            <FaCircleError width="1.5rem" />
          </div>
        </span>
      )}

      {!errormessage.trim() && props.value && (
        <span className={Styles['input-status']} title={errormessage}>
          <div className={Styles['fa-check']}>
            <FaCircleCheck width="1.5rem" />
          </div>
        </span>
      )}
    </div>
  )
}

export default Input
