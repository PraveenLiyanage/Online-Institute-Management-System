
import { useTimetablesContext } from '../hooks/useTimetableContext'
import { useState } from "react"
import '../timetable.css'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TimetableDetails = ({ timetable }) => {
  const { dispatch } = useTimetablesContext()

  //update................

  const [updateMode, setUpdateMode] = useState(false)
  const [updatedday, setUpdatedday] = useState(timetable.day)
  const [updatedtime1, setUpdatedtime1] = useState(timetable.time1)
  const [updatedtime2, setUpdatedtime2] = useState(timetable.time2) 
  const[updatedtime3, setUpdatedtime3] = useState(timetable.time3)
  const[updatedtime4, setUpdatedtime4] = useState(timetable.time4)
  const handleUpdate = async () => {
    const updatedtimetable = { day: updatedday, time1: updatedtime1, time2: updatedtime2, time3:updatedtime3, time4:updatedtime4}
    const response = await fetch('/api/timetables/' + timetable._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedtimetable),
      headers: {
        'Content-Type': 'application/json',    
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_TIMETABLE', payload: json })
      setUpdateMode(false)
    }
  }

  const handleClick = async () => {
    const response = await fetch('/api/timetables/' + timetable._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TIMETABLE', payload: json})
    }
  }

  return (
    
    <div className="form">
      {updateMode ? (
        <div>
          <input
            type="text"
            onChange={(e) => setUpdatedday(e.target.value)}
            value={updatedday}
          />
          <input
            type="text"
            onChange={(e) => setUpdatedtime1(e.target.value)}
            value={updatedtime1}
          />
          <input
            type="text"
            onChange={(e) => setUpdatedtime2(e.target.value)}
            value={updatedtime2}
          />
           <input
            type="text"
            onChange={(e) => setUpdatedtime3(e.target.value)}
            value={updatedtime3}
          />
           <input
            type="text"
            onChange={(e) => setUpdatedtime4(e.target.value)}
            value={updatedtime4}
          />
          <button onClick={handleUpdate}>Update </button>
        </div>
      ) : (
        <table id ="t1">
  
  <tbody>
   
      <tr key={timetable.id}>
        <td id="tth1">{timetable.day}</td>
        <td id="tth2">{timetable.time1}</td>
        <td id="tth3">{timetable.time2}</td>
        <td id="tth5">{timetable.time3} </td>
        <td id="tth6">{timetable.time4} </td>
        <td id="tth4">
          <button className="material-symbols-outlined" onClick={handleClick}>
            delete
          </button>
          <button className="material-symbols-outlined" onClick={() => setUpdateMode(true)}>
            edit
          </button>
          <button className="material-symbols-outlined" onClick={handleClick}>
            send
          </button>
        </td>
      </tr>
  
  </tbody>
</table>

      )}
    </div>
  )
}

export default TimetableDetails
