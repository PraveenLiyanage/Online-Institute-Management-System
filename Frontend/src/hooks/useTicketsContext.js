import { TicketsContext } from "../context/TicketContext"
import { useContext } from "react"

export const useTicketsContext = () => {
  const context = useContext(TicketsContext)

  if(!context) {
    throw Error('useTicketContextContext must be used inside an TicketContextProvider')
  }

  return context
}