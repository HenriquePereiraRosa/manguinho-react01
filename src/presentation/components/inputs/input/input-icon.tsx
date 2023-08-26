import React from 'react'
import { type InputProps } from '@/domain/props/InputProps'
import InputIconError from './input-icon-error'
import InputIconCheck from './input-icon-check'

const InputIcon: React.FC<InputProps> = (props: InputProps) => {
  const errormessage = props['error-message'] ?? ''

  return (
    <>
      {errormessage.trim() && (
        <InputIconError error-message={errormessage} />
      )}

      {!errormessage.trim() && props.value && (
        <InputIconCheck />
      )}
    </>
  )
}

export default InputIcon
