import { createContext, useReducer } from 'react'

export const AppointmentsContext = createContext()

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
      case 'UPDATE_APPOINTMENT':
        return {
          appointments: state.appointments.map(appointment =>
            appointment._id === action.payload._id ? action.payload : appointment
          ),
        }
    default:
      return state
  }
}

export const AppointmentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentsReducer, { 
    appointments: null
  })
  
  return (
    <AppointmentsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AppointmentsContext.Provider>
  )
}