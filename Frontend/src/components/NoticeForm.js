import { useState } from 'react'
import { useNoticesContext } from '../hooks/useNoticesContext'
import '../notice.css'
const NoticeForm = () => {
  const { dispatch } = useNoticesContext()

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const notice = {title, note, date}
    
    const response = await fetch('/api/notices', {
      method: 'POST',
      body: JSON.stringify(notice),
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
      setTitle('')
      setNote('')
      setDate('')
      
      dispatch({type: 'CREATE_NOTICE', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Notice</h3>

      <label>Notice Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Note :</label>
      <input 
        type="text" 
        onChange={(e) => setNote(e.target.value)} 
        value={note}
        className={emptyFields.includes('note') ? 'error' : ''}
      />
  <label>Published Date :</label>
      <input 
        type="text" 
        onChange={(e) => setDate(e.target.value)} 
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <button>Add Notice</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default NoticeForm