import { createContext } from 'react'

type FormContextType = {
  isLoading: boolean
  errorMessage: string
}

const initialState: FormContextType = {
  isLoading: false,
  errorMessage: ''
}

export default createContext(initialState)
