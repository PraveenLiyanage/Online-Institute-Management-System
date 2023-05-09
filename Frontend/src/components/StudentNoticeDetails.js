
import { useNoticesContext } from '../hooks/useNoticesContext'
import { useState } from "react"
import '../notice.css'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const StudentNoticeDetails = ({ notice }) => {
  const { dispatch } = useNoticesContext()

  //update................

  const [updateMode, setUpdateMode] = useState(false)
  const [updatedtitle, setUpdatedtitle] = useState(notice.title)
  const [updatednote, setUpdatednote] = useState(notice.note)
  const [updateddate, setUpdateddate] = useState(notice.date) 

  const handleUpdate = async () => {
    const updatednotice = { title: updatedtitle, note: updatednote, date: updateddate}
    const response = await fetch('/api/notices/' + notice._id, {
      method: 'PATCH',
      body: JSON.stringify(updatednotice),
      headers: {
        'Content-Type': 'application/json',    
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_NOTICE', payload: json })
      setUpdateMode(false)
    }
  }

  const handleClick = async () => {
    const response = await fetch('/api/notices/' + notice._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_NOTICE', payload: json})
    }
  }

  return (
    
    <div className="form">
      {updateMode ? (
        <div>
          <input
            type="text"
            onChange={(e) => setUpdatedtitle(e.target.value)}
            value={updatedtitle}
          />
          <input
            type="text"
            onChange={(e) => setUpdatednote(e.target.value)}
            value={updatednote}
          />
          <input
            type="text"
            onChange={(e) => setUpdateddate(e.target.value)}
            value={updateddate}
          />
          <button onClick={handleUpdate}>Update </button>
        </div>
      ) : (
        <table id ="t1">
  
  <tbody>
   
      <tr key={notice.id}>
        <td id="th1">{notice.title}</td>
        <td id="th2">{notice.note}</td>
        <td id="th3">{notice.date}</td>
        
      </tr>
  
  </tbody>
</table>

      )}
    </div>
  )
}

export default StudentNoticeDetails
