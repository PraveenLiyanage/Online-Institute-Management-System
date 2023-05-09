import { useState } from 'react'
import { useAAppointmentsContext } from '../hooks/AuseAppointmentsContext'

const AppointmentForm = () => {
  const { dispatch } = useAAppointmentsContext()

  const [name, setName] = useState('')
  const [tname, setTname] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const appointment = {name, tname, date}
    
    const response = await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJmYmNkMDljYWIzMDY3ODQzNzI5OTQiLCJpYXQiOjE2ODI5NTM3ODQsImV4cCI6MTY4MzIxMjk4NH0.8-ItaExd1ucaeTG4Kb_88jAMtHWzgQGa3gMbWByvpfg"}`}
      }
    
    )
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setName('')
      setTname('')
      setDate('')
      dispatch({type: 'CREATE_APPOINTMENT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Appointment</h3>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields && emptyFields.includes('name') ? 'error' : ''}

      />

      <label>Teacher Name:</label>
      <input 
        type="text" 
        onChange={(e) => setTname(e.target.value)} 
        value={tname}
        //className={emptyFields.includes('tname') ? 'error' : ''}
        className={emptyFields && emptyFields.includes('tname') ? 'error' : ''}

      />

      <label>Date:</label>
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        value={date}
        className={emptyFields && emptyFields.includes('date') ? 'error' : ''}

      />
      <button>Add Appointment</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AppointmentForm