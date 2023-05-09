import { TimetablesContext } from "../context/TimetableContext"
import { useContext } from "react"

export const useTimetablesContext = () => {
  const context = useContext(TimetablesContext)

  if(!context) {
    throw Error('usetimetablesContext must be used inside an TimetablesContextProvider')
  }

  return context
}