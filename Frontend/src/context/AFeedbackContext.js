import { createContext, useReducer } from 'react'

export const AFeedbacksContext = createContext()

export const feedbacksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FEEDBACKS':
      return { 
        feedbacks: action.payload 
      }
    case 'CREATE_FEEDBACK':
      return { 
        feedbacks: [action.payload, ...state.feedbacks] 
      }
    case 'DELETE_FEEDBACK':
      return { 
        feedbacks: state.feedbacks.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const AFeedbacksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(feedbacksReducer, { 
    feedbacks: null
  })
  
  return (
    <AFeedbacksContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AFeedbacksContext.Provider>
  )
}