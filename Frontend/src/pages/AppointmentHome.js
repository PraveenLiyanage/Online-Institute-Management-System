import { useEffect }from 'react'
import { useAppointmentsContext } from "../hooks/useappointmentsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import AppointmentsSearchBar from '../components/appointmentSearch'
import AppointmentForm from '../components/appointmentForm'

const AppointmentHome = () => {
  const {appointments, dispatch} = useAppointmentsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('/api/appointments', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_APPOINTMENTS', payload: json})
      }
    }

    if (user) {
      fetchAppointments()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="appointments">
      <AppointmentsSearchBar />
      </div>
      <AppointmentForm />
    </div>
  )
}

export default AppointmentHome