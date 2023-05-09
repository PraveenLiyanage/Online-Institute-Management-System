/*import { useFeedbacksContext } from '../hooks/useFeedbacksContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const FeedbackDetails = ({ feedback }) => {
  const { dispatch } = useFeedbacksContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/feedbacks/' + feedback._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_FEEDBACK', payload: json})
    }
  }

  return (
    <div className="feedback-details">
      <h4>{feedback.name}</h4>
      <p><strong>Topic/Reason: </strong>{feedback.topic}</p>
      <p><strong>Description: </strong>{feedback.description}</p>
      <p>{formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}</p>
      <button class="btn btn-outline-primary" id="updatebutton"> Update</button>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default FeedbackDetails*/
import { useState } from "react"
import { useFeedbacksContext } from '../hooks/useFeedbacksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const FeedbackDetails = ({ feedback }) => {
  const { dispatch } = useFeedbacksContext()
  const { user } = useAuthContext()

  const [updateMode, setUpdateMode] = useState(false)
  const [updatedName, setUpdatedName] = useState(feedback.name)
  const [updatedTopic, setUpdatedTopic] = useState(feedback.topic)
  const [updatedDescription, setUpdatedDescription] = useState(feedback.description)

  const handleUpdate = async () => {
    if (!user) {
      return
    }

    

    const updatedFeedback = { name: updatedName, topic: updatedTopic, description: updatedDescription }

    const response = await fetch('/api/feedbacks/' + feedback._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedFeedback),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_FEEDBACK', payload: json })
      setUpdateMode(false)
    }
  }
  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/feedbacks/' + feedback._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_FEEDBACK', payload: json})
    }
  }

  return (
    <div className="feedback-details">
      {updateMode ? (
        <div>
          <input
            type="text"
            onChange={(e) => setUpdatedName(e.target.value)}
            value={updatedName}
          />
          <input
            type="text"
            onChange={(e) => setUpdatedTopic(e.target.value)}
            value={updatedTopic}
          />
          <input
            type="text"
            onChange={(e) => setUpdatedDescription(e.target.value)}
            value={updatedDescription}
          />
          <button onClick={handleUpdate}>Update Feedback</button>
        </div>
      ) : (
        <div>
          <h4>{feedback.name}</h4>
          <p><strong>Topic/Reason: </strong>{feedback.topic}</p>
          <p><strong>Description: </strong>{feedback.description}</p>
          <p>{formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}</p>
          <button id="updatebutton" className="btn btn-primary" onClick={() => setUpdateMode(true)}>Update</button>
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
      )}
    </div>
  )
}

export default FeedbackDetails
