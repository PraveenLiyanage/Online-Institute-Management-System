import { useEffect } from "react"
import { useTimetablesContext } from "../hooks/useTimetableContext"
import '../timetable.css'


// components
//import TimetableDetails from "../componenets/TimetableDetails"
import TimetableForm from "../components/timetableForm"
import SearchBar from "../components/timetableSearchBar"


const TimetableHome = () => {
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
      <SearchBar />
      <TimetableForm />
     
    
      
    </div>
    
  )
}

export default TimetableHome
