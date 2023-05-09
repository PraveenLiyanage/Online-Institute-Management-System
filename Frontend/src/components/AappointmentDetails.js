import { useAAppointmentsContext } from '../hooks/AuseAppointmentsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const AppointmentDetails = ({ appointment }) => {
  const { dispatch } = useAAppointmentsContext()

  const handleClick = async () => {
    const response = await fetch('/api/appointments/' + appointment._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_APPOINTMENT', payload: json})
    }
  }

  return (
    <div className="appointment-details">
      <h4>{appointment.name}</h4>
      <p><strong>teacher name </strong>{appointment.tname}</p>
      <p><strong>date: </strong>{appointment.date}</p>
      <p>{formatDistanceToNow(new Date(appointment.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default AppointmentDetails