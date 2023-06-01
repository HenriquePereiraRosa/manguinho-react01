import { createContext } from 'react'

export type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const initialState: StateProps = {
  isLoading: false,
  errorMessage: ''
}

export default createContext(initialState)
