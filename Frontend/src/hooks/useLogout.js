import { useAuthContext } from './useAuthContext'
import { useFeedbacksContext } from './useFeedbacksContext'
import { useAppointmentsContext } from './useappointmentsContext'
export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchFeedbacks } = useFeedbacksContext()
  const { dispatch: dispatchAppointments } = useAppointmentsContext()
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchFeedbacks({ type: 'SET_FEEDBACKS', payload: null })
    dispatchAppointments({ type: 'SET_APPOINTMENTS', payload: null })
  }

  return { logout }
}