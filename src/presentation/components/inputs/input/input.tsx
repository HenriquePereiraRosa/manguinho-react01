import React from 'react'
import Styles from './input-styles.scss'
import FaCircleCheck from '../../icons/fa-circle-check'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles['input-container']}>
      <input {...props} />
      <span className={Styles['input-status']}><FaCircleCheck width="1.5rem" /></span>
    </div>
  )
}

export default Input
