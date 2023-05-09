import { createContext, useReducer } from 'react'

export const NoticesContext = createContext()

export const noticesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_NOTICES':
        return { 
          notices: action.payload 
        }
      case 'CREATE_NOTICE':
        return { 
          notices: [action.payload, ...state.notices] 
        }

        case 'UPDATE_NOTICE':
      return {
        notices: state.notices.map(notice =>
          notice._id === action.payload._id ? action.payload : notice
        ),
      }
      case 'DELETE_NOTICE':
        return{
          notices: state.notices.filter(n => n._id !== action.payload._id) 
        
        }
      default:
        return state
    }
  }
export const NoticesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(noticesReducer, { 
      notices: null
    })
    
    return (
      <NoticesContext.Provider value={{ ...state, dispatch }}>
        { children }
      </NoticesContext.Provider>
    )
  }
