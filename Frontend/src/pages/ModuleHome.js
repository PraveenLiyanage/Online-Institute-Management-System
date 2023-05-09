import { useEffect } from 'react'
import { useModuleContext } from "../hooks/useModuleContext"

// Components
//import ModuleDetails from '../components/ModuleDetails'
import ModuleForm from '../components/ModuleForm'
import ModuleUpload from '../components/ModuleUpload'
import ModuleSearchBar from '../components/ModuleSearchBar'

const Home = () => {
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
            <ModuleForm />
            <ModuleUpload/>
        </div>
    )
}

export default Home