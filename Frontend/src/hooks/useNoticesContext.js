import { NoticesContext } from "../context/NoticeContext"
import { useContext } from "react"

export const useNoticesContext = () => {
  const context = useContext(NoticesContext)

  if(!context) {
    throw Error('usenoticesContext must be used inside an NoticesContextProvider')
  }

  return context
}