import { AppointmentsContext } from "../context/appointmentContext"
import { useContext } from "react"

export const useAppointmentsContext = () => {
  const context = useContext(AppointmentsContext)

  if(!context) {
    throw Error('useAppointmentsContext must be used inside an AppointmentsContextProvider')
  }

  return context
}