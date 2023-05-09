import { useState } from "react"
import { useAppointmentsContext } from "../hooks/useappointmentsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import Appointment_img from '../images/appoinments.jpg'
const AppointmentForm = () => {
  const { dispatch } = useAppointmentsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [tname, setTname] = useState('')
  const [date, setdate] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const appointment = {name, tname, date}

    const response = await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setTname('')
      setdate('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_APPOINTMENT', payload: json})
    }
  }

  return (
    <div className="card" id="feedbackcard">
      <img src={Appointment_img} class="card-img-top" alt="..." id="feedbackimg"></img>
      <div className="card-body">
    <form className="create" onSubmit={handleSubmit}>
      

      <label> Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Teacher name :</label>
      <input 
        type="text"
        onChange={(e) => setTname(e.target.value)}
        value={tname}
        className={emptyFields.includes('tname') ? 'error' : ''}
      />

      <label>date:</label>
      <input 
        type="date"
        onChange={(e) => setdate(e.target.value)}
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <button>Add Appointment</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
    </div>
  )
}

export default AppointmentForm