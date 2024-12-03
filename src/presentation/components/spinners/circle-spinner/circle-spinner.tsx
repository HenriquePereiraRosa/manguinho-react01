import React from 'react'
import Styles from './circle-spinner-styles.scss'

interface CircleSpinnerProps {
  className?: string
}

const CircleSpinner: React.FC<CircleSpinnerProps> = (props) => {
  return (
    <div
      data-testid="spinner">
      <span className={[props.className, Styles.loader].join(' ')}></span>
    </div>
  )
}

export default CircleSpinner
