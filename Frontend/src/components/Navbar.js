import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import nawamaga from '../images/nawamaga.png'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
      <img src={nawamaga}  alt="..."></img>
       
        <nav className= "navbar navbar-light" >
        <Link to="/Moduleview">Module user</Link>
        <Link to="/ModuleHome">Module admin</Link>
        <Link to="/TicketShow">Raise Ticket</Link>
        <Link to="/Studenttimetable"> timetable</Link>
        <Link to="/StudentNoticeHome"> Notice</Link>
        <Link to="/AppointmentHome">Appoinments</Link>
        <Link to="/FeedbackHome">Feedback</Link>
          {user && (
            <div>
              <span>{user.email}</span>
              <button class="btn btn-outline-danger" onClick={handleClick}>Log out</button>
              
              
            </div>
          )}
          {!user && (
            <div class id ="navlog">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar