import { useEffect } from 'react'
import { useModuleContext } from "../hooks/useModuleContext"

// Components
//import ModuleDetails from '../components/ModuleDetails'

import ModuleUpload from '../components/Uploadvideo'
import ModuleSearchBar from '../components/ModulenewSearchbar'

const Moduleview = () => {
    const {dispatch}= useModuleContext()

    useEffect(() => {
        const fetchModules = async() => {
            const response = await fetch('/api/module')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_MODULES', payload: json})
            }
        }

        fetchModules()
    }, [dispatch])

    return (
        <div className = "home">
            <ModuleSearchBar/>
            
            <ModuleUpload/>
        </div>
    )
}

export default Moduleview 