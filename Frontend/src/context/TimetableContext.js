import { createContext, useReducer } from 'react'

export const TimetablesContext = createContext()

export const timetablesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TIMETABLES':
        return { 
          timetables: action.payload 
        }
      case 'CREATE_TIMETABLE':
        return { 
          timetables: [action.payload, ...state.timetables] 
        }

        case 'UPDATE_TIMETABLE':
      return {
        timetables: state.timetables.map(timetable =>
          timetable._id === action.payload._id ? action.payload : timetable
        ),
      }
      case 'DELETE_TIMETABLE':
        return{
          timetables: state.timetables.filter(n => n._id !== action.payload._id) 
        
        }
      default:
        return state
    }
  }
export const TimetablesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(timetablesReducer, { 
      timetables: null
    })
    
    return (
      <TimetablesContext.Provider value={{ ...state, dispatch }}>
        { children }
      </TimetablesContext.Provider>
    )
  }
