import { useState } from 'react'
import { useAFeedbacksContext } from '../hooks/AuseFeedbacksContext'

const FeedbackForm = () => {
  const { dispatch } = useAFeedbacksContext()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const feedback = {name, description, topic}
    
    const response = await fetch('/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(feedback),
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
      setDescription('')
      setTopic('')
      dispatch({type: 'CREATE_FEEDBACK', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Feedback</h3>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields && emptyFields.includes('name') ? 'error' : ''}

      />

      <label>Topic:</label>
      <input 
        type="text" 
        onChange={(e) => setTopic(e.target.value)} 
        value={topic}
        className={emptyFields && emptyFields.includes('topic') ? 'error' : ''}

      />

      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        //className={emptyFields.includes('description') ? 'error' : ''}
        className={emptyFields && emptyFields.includes('description') ? 'error' : ''}

      />

     

      <button>Add Feedback</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default FeedbackForm