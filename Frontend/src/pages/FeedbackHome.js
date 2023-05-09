import { useEffect }from 'react'
import { useFeedbacksContext } from "../hooks/useFeedbacksContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
/*import FeedbackDetails from '../components/FeedbackDetails'*/
import FeedbackForm from '../components/FeedbackForm'
import FeedbackSearch from '../components/FeedbackSearch'

const FeedbackHome = () => {
  const {feedbacks, dispatch} = useFeedbacksContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedbacks', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_FEEDBACKS', payload: json})
      }
    }

    if (user) {
      fetchFeedbacks()
    }
  }, [dispatch, user])

  return (
    <div className="FeedbackHome">
      <div className="feedbacks">
        <FeedbackSearch />
        
      </div>
      <FeedbackForm />
    </div>
  )
}

export default FeedbackHome