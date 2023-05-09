import { useAFeedbacksContext } from '../hooks/AuseFeedbacksContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const FeedbackDetails = ({ feedback }) => {
  const { dispatch } = useAFeedbacksContext()

  const handleClick = async () => {
    const response = await fetch('/api/feedbacks/' + feedback._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_FEEDBACK', payload: json})
    }
  }

  return (
    <div className="all-feedbacks">
    <div className="feedback-details">
      <h4>{feedback.name}</h4>
      <p><strong>topic: </strong>{feedback.description}</p>
      <p><strong>description </strong>{feedback.topic}</p>
      <p>{formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
    </div>
  )
}

export default FeedbackDetails