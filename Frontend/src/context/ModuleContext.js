import { createContext, useReducer } from "react";

export const ModuleContext = createContext()

export const moduleReducer = (state, action) => {
    switch(action.type){
        case 'SET_MODULES':
            return{
                module: action.payload
            }
        
        case 'CREATE_MODULE':
            return{
                module: [action.payload, ...state.module]
            }

        case 'UPDATE_MODULE':
        return {
        module: state.module.map(module =>
          module._id === action.payload._id ? action.payload : module
        ),
      }

        case 'DELETE_MODULE':
            return{
                module: state.module.filter((m) => m._id !== action.payload._id)
            }

        default:
            return state

    }
}

export const ModuleContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(moduleReducer, {
        module: null
    })

    return(
        <ModuleContext.Provider value={{...state, dispatch}}>
            {children}
        </ModuleContext.Provider>
    )
}