import nawamaga from '../images/nawamaga.png'
import feedback_img from '../images/feedbackimg.jpg'
import Appointment_img from '../images/appoinments.jpg'
import notice_img from '../images/Notice.jpg'
import { useAuthContext } from "../hooks/useAuthContext"
const Mainhome = () =>{
    const {user} = useAuthContext()


    return(
        <div className="card" id ="homecard">
        <img src={nawamaga} class="card-img-top" alt="...">
      </img>
      <h2> ONLINE INSTITUTE</h2>
      <div className="card" id="studhome">
      <img src={feedback_img} class="card-img-top" alt="..."></img>
      </div>
      <div className="card" id="studhome">
      <img src={Appointment_img} class="card-img-top" alt="..."></img>
      </div>
      <div className="card" id="studhome">
      <img src={notice_img} class="card-img-top" alt="..."></img>
      </div>
      <div className="card" id="studhome">
      <img src={nawamaga} class="card-img-top" alt="..."></img>
      </div>
        </div>

    )
}
export default Mainhome

