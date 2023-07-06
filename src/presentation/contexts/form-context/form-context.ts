import { createContext } from 'react'

const initialState: any = {
  isLoading: false,
  errorMessage: ''
}

export default createContext(initialState)
