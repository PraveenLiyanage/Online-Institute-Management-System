
import { useState } from "react"
import { useAppointmentsContext } from '../hooks/useappointmentsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const AppointmentDetails = ({ appointment }) => {
  const { dispatch } = useAppointmentsContext()
  const { user } = useAuthContext()

  const [updateMode, setUpdateMode] = useState(false)
  const [updatedName, setUpdatedName] = useState(appointment.name)
  const [updatedTname, setUpdatedTname] = useState(appointment.tname)
  const [updatedDate, setUpdatedDate] = useState(appointment.date)

  const handleUpdate = async () => {
    if (!user) {
      return
    }

    

    const updatedAppointment = { name: updatedName, tname: updatedTname, date: updatedDate }

    const response = await fetch('/api/appointments/' + appointment._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedAppointment),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_APPOINTMENT', payload: json })
      setUpdateMode(false)
    }
  }
  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/appointments/' + appointment._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_APPOINTMENT', payload: json})
    }
  }

  return (
    <div className="appointment-details">
      {updateMode ? (
        <div>
          <input
            type="text"
            onChange={(e) => setUpdatedName(e.target.value)}
            value={updatedName}
          />
          <input
            type="text"
            onChange={(e) => setUpdatedTname(e.target.value)}
            value={updatedTname}
          />
          <input
            type="date"
            onChange={(e) => setUpdatedDate(e.target.value)}
            value={updatedDate}
          />
          <button onClick={handleUpdate}>Update Appointment</button>
        </div>
      ) : (
        <div>
          <h4>{appointment.name}</h4>
          <p><strong>Teacher Name: </strong>{appointment.tname}</p>
          <p><strong>Date: </strong>{appointment.date}</p>
          <p>{formatDistanceToNow(new Date(appointment.createdAt), { addSuffix: true })}</p>
          <button id="updatebutton" className="btn btn-primary" onClick={() => setUpdateMode(true)}>Update</button>
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
      )}
    </div>
  )
}

export default AppointmentDetails