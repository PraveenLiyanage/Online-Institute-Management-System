import {useModuleContext} from '../hooks/useModuleContext'
import { useState } from 'react'


// date fns


const ModuleDetails = ({module}) => {
    const {dispatch} = useModuleContext()

    const [updateMode, setUpdateMode] = useState(false)
    const [updatedtitle, setUpdatedtitle] = useState(module.Title)
    const [updateddescription, setUpdatedescription] = useState(module.Description)
   
  
    const handleUpdate = async () => {
      const updatedmodule = { Title: updatedtitle, Description: updateddescription}
      const response = await fetch('/api/module/' + module._id, {
        method: 'PATCH',
        body: JSON.stringify(updatedmodule),
        headers: {
          'Content-Type': 'application/json',
          
        }
      })
  
      const json = await response.json()
  
      if (response.ok) {
        dispatch({ type: 'UPDATE_MODULE', payload: json })
        setUpdateMode(false)
      }
    }
    
    const handleClick = async () => {
        const response = await fetch ('/api/module/' + module._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_MODULE', payload: json})
        }
    }


    return(
        <div id = "module-details">
           
           {updateMode ? (
        <div>
          <input
            type="text"
            onChange={(e) => setUpdatedtitle(e.target.value)}
            value={updatedtitle}
          />
          <input
            type="text"
            onChange={(e) => setUpdatedescription(e.target.value)}
            value={updateddescription}
          />

          <button className='material-symbols-outlined' onClick={handleUpdate}>Update</button>
        </div>
      ) : (

        <div>

            <h5>{module.Title}</h5>
            <p><strong>Description : </strong>{module.Description}</p>
            
            <button className = "material-symbols-outlined"onClick={() => setUpdateMode(true)}>Edit</button>
            <span className='material-symbols-outlined' onClick={handleClick}>Delete</span>

        </div>
    )
    
}

</div>
    )}

export default ModuleDetails