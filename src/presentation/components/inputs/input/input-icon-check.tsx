import React from 'react'
import FaCircleCheck from '../../icons/fa-circle-check'
import Styles from './input-styles.scss'
import { type InputProps } from '@/domain/props/InputProps'

const InputIconCheck: React.FC<InputProps> = (props: InputProps) => {
  return (
    <span
      data-testid="input-icon-check"
      className={Styles['input-status']}>
      <div className={Styles['fa-check']}>
        <FaCircleCheck width="1.5rem" />
      </div>
    </span>
  )
}

export default InputIconCheck
