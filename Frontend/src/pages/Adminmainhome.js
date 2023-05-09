import nawamaga from '../images/nawamaga.png'
import { useAuthContext } from "../hooks/useAuthContext"
import feedback_img from '../images/feedbackimg.jpg'
import Appointment_img from '../images/appoinments.jpg'
import notice_img from '../images/Notice.jpg'
import time_img from '../images/timetable.jpeg'
import { Link } from 'react-router-dom'

const AdminMainhome = () => {
  const { user } = useAuthContext()

  return (
    <div>
      <div className="card" id="homecard">
        <img src={nawamaga} className="card-img-top" alt="..." />
        <h2>Administor Dashboard</h2>
      </div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col">
            <div className="card" id="adminhomecard1">
            <img src={feedback_img} class="card-img-top" alt="..." id="feedbackimg">
          </img>
              <div className="card-body">
                <h5 className="card-title">All Feedbacks</h5>
                <Link to="/AdminFeedbackHome" className="btn btn-primary">Feedback</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" id="adminhomecard2">
            <img src={Appointment_img} class="card-img-top" alt="..." id="feedbackimg"></img>
              <div className="card-body">
                <h5 className="card-title">All Appointments</h5>
                <Link to="/AdminAppointmentHome" className="btn btn-primary">Appointments</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" id="adminhomecard3">
            <img src={time_img } class="card-img-top" alt="..." ></img>
              <div className="card-body">
                <h5 className="card-title">Create  Notice</h5>
                <a href="/NoticeHome" className="btn btn-primary">Notices</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
  <div className="row mt-3">
    <div className="col">
      <div className="card" id="adminhomecard1">
        <img src={time_img} class="card-img-top" alt="..." id="feedbackimg"></img>
        <div className="card-body">
          <h5 className="card-title">Time table</h5>
          <Link to="/TimetableHome" className="btn btn-primary">Timetable</Link>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card" id="adminhomecard2">
        <img src={Appointment_img} class="card-img-top" alt="..." id="feedbackimg"></img>
        <div className="card-body">
          <h5 className="card-title">All Appointments</h5>
          <Link to="/AdminAppointmentHome" className="btn btn-primary">Appointments</Link>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card" id="adminhomecard3">
        <img src={notice_img} class="card-img-top" alt="..." ></img>
        <div className="card-body">
          <h5 className="card-title">Create  Notice</h5>
          <a href="/NoticeHome" className="btn btn-primary">Notices</a>
        </div>
      </div>
    </div>
  </div>
  
  
</div>

    </div>
  )
}

export default AdminMainhome
