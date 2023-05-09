import { useState } from 'react'
import { useTimetablesContext } from '../hooks/useTimetableContext'
import '../timetable.css'
const TimetableForm = () => {
  const { dispatch } = useTimetablesContext()

  const [day, setDay] = useState('')
  const [time1, settime1] = useState('')
  const [time2, settime2] = useState('')
  const [time3, settime3] = useState('')
  const [time4, settime4] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const timetable = {day, time1, time2, time3, time4}
    
    const response = await fetch('/api/timetables', {
      method: 'POST',
      body: JSON.stringify(timetable),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setDay('')
      settime1('')
      settime2('')
      settime3('')
      settime4('')
      
      dispatch({type: 'CREATE_TIMETABLE', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Timetable</h3>

      <label>Timetable Day:</label>
      <input 
        type="text" 
        onChange={(e) => setDay(e.target.value)} 
        value={day}
        className={emptyFields.includes('day') ? 'error' : ''}
      />

      <label>Time 1(6.00 a.m. - 9.00 a.m) :</label>
      <input 
        type="text" 
        onChange={(e) => settime1(e.target.value)} 
        value={time1}
        className={emptyFields.includes('time1') ? 'error' : ''}
      />
  <label>Time 1(9.00 a.m. - 12.00 p.m) :</label>
      <input 
        type="text" 
        onChange={(e) => settime2(e.target.value)} 
        value={time2}
        className={emptyFields.includes('time2') ? 'error' : ''}
      />

<label>Time 3(12.00 a.m. - 3.00 p.m):</label>
      <input 
        type="text" 
        onChange={(e) => settime3(e.target.value)} 
        value={time3}
        className={emptyFields.includes('time3') ? 'error' : ''}
      />

<label>Time 4(3.00 p.m. - 6.00 p.m) :</label>
      <input 
        type="text" 
        onChange={(e) => settime4(e.target.value)} 
        value={time4}
        className={emptyFields.includes('time4') ? 'error' : ''}
      />

      <button>Add Timetable</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TimetableForm