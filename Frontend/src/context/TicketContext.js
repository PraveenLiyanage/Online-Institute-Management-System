import {createContext, useReducer} from 'react'

export const TicketsContext = createContext()


export const ticketsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TICKETS':
        return { 
          tickets: action.payload 
        }
      case 'CREATE_TICKET':
        return { 
          tickets: [action.payload, ...state.tickets] 
        }
      case 'DELETE_WORKOUT':
          return { 
            tickets: state.tickets.filter(w => w._id !== action.payload._id) 
          }
          
       case 'UPDATE_MODULE':
          return {
            ticket: state.ticket.map(ticket =>
              ticket._id === action.payload._id ? action.payload : ticket
            ),
          }
      default:
        return state
    }
  }


  export const TicketsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ticketsReducer, { 
      tickets: null
    })
    
    return (
        <TicketsContext.Provider value={{...state, dispatch }}>
        { children }
        </TicketsContext.Provider>
    )
  }
