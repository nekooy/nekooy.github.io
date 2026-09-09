import { createContext } from 'react'

export const CurrentModalContext = createContext<{
  dismiss: () => void
}>({
  dismiss: () => {},
})
