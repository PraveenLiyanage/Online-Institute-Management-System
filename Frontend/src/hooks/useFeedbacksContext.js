import { FeedbacksContext } from "../context/FeedbackContext"
import { useContext } from "react"

export const useFeedbacksContext = () => {
  const context = useContext(FeedbacksContext)

  if(!context) {
    throw Error('useFeedbacksContext must be used inside an FeedbacksContextProvider')
  }

  return context
}