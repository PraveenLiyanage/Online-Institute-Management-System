import { useEffect } from "react"
import { useNoticesContext } from "../hooks/useNoticesContext"
import '../notice.css'


// components
//import NoticeDetails from "../componenets/NoticeDetails"

import StudentNoticeSearchBar from "../components/StudentNoticeSearchBar"


const StudentNoticeHome = () => {
  const { notices, dispatch } = useNoticesContext()

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await fetch('/api/notices')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_NOTICES', payload: json})
      }
    }

    fetchNotices()
  }, [dispatch])

  return (
    <div className="home">
      <StudentNoticeSearchBar />
     
    
      
    </div>
    
  )
}

export default StudentNoticeHome