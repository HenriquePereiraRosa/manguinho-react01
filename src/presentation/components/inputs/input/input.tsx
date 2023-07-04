import React from 'react'
import FaCircleCheck from '../../icons/fa-circle-check'
import Styles from './input-styles.scss'
import { t } from 'i18next'
import { type InputProps } from '@/domain/props/InputProps'

const Input: React.FC<InputProps> = (props: InputProps) => {
  const errormessage = props['error-message'] ?? t('error-msg-mandatory-field') ?? ''

  return (
    <div className={Styles['input-container']}>
      <input {...props}
        onChange={props.onChange} />
      <span
        className={Styles['input-status']}
        title={errormessage}>
        <div className={Styles['fa-check']}>
          <FaCircleCheck width="1.5rem" />
          {/* todo render this dinamically */}
        </div>
      </span>
    </div>
  )
}

export default Input
