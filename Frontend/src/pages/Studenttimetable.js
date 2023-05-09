import { useEffect } from "react"
import { useTimetablesContext } from "../hooks/useTimetableContext"
import '../timetable.css'


// components
import StudenttimetableSearchbar from "../components/StudenttimetableSearchbar"



const Studenttimetable = () => {
  const { timetables, dispatch } = useTimetablesContext()

  useEffect(() => {
    const fetchTimetables = async () => {
      const response = await fetch('/api/timetables')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TIMETABLES', payload: json})
      }
    }

    fetchTimetables()
  }, [dispatch])

  return (
    <div className="home">
      <StudenttimetableSearchbar />
      
     
    
      
    </div>
    
  )
}

export default Studenttimetable
