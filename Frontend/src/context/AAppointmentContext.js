import { createContext, useReducer } from 'react'

export const AAppointmentsContext = createContext()

export const appointmentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APPOINTMENTS':
      return { 
        appointments: action.payload 
      }
    case 'CREATE_APPOINTMENT':
      return { 
        appointments: [action.payload, ...state.appointments] 
      }
    case 'DELETE_APPOINTMENT':
      return { 
        appointments: state.appointments.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const AAppointmentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentsReducer, { 
    appointments: null
  })
  
  return (
    <AAppointmentsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AAppointmentsContext.Provider>
  )
}