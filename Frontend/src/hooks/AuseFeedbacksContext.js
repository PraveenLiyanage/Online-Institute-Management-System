import { AFeedbacksContext } from "../context/AFeedbackContext"
import { useContext } from "react"

export const useAFeedbacksContext = () => {
  const context = useContext(AFeedbacksContext)

  if(!context) {
    throw Error('useAFeedbacksContext must be used inside an AFeedbacksContextProvider')
  }

  return context
}