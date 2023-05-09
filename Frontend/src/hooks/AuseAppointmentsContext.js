import { AAppointmentsContext } from "../context/AAppointmentContext"
import { useContext } from "react"

export const useAAppointmentsContext = () => {
  const context = useContext(AAppointmentsContext)

  if(!context) {
    throw Error('useAAppointmentsContext must be used inside an AAppointmentsContextProvider')
  }

  return context
}