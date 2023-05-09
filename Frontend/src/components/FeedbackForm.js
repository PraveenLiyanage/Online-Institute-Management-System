import { useState } from "react"
import { useFeedbacksContext } from "../hooks/useFeedbacksContext"
import { useAuthContext } from '../hooks/useAuthContext'
import feedback_img from '../images/feedbackimg.jpg'
const FeedbackForm = () => {
  const { dispatch } = useFeedbacksContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const feedback = {name, topic, description}

    const response = await fetch('/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(feedback),
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
      setTopic('')
      setDescription('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_FEEDBACK', payload: json})
    }
  }

  return (
    <div className="card" id="feedbackcard">
      <img src={feedback_img} class="card-img-top" alt="..." id="feedbackimg">
      </img>
    <div className="card-body">
    <form className="create" onSubmit={handleSubmit}>
      

      <label>Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Topic/Reason:</label>
      <input 
        type="text"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        className={emptyFields.includes('topic') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <button class="btn btn-outline-primary">Add Feedback</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
    </div>
  )
}

export default FeedbackForm