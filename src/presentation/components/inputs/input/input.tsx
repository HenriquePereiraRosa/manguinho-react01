import React from 'react'
import FaCircleCheck from '../../icons/fa-circle-check'
import Styles from './input-styles.scss'
import { t } from 'i18next'
import { type InputProps } from '@/domain/props/InputProps'

const Input: React.FC<InputProps> = (props: InputProps) => {
  const errormessage = props.errormessage ?? t('error-msg-mandatory-field') ?? ''

  return (
    <div className={Styles['input-container']}>
      <input {...props} />
      <span
        className={Styles['input-status']}
        title={errormessage}>
        <FaCircleCheck width="1.5rem" />
      </span>
    </div>
  )
}

export default Input
