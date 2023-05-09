import { useEffect } from "react"
import { useAAppointmentsContext } from "../hooks/AuseAppointmentsContext"
import jsPDF from "jspdf";

// components
import AppointmentDetails from "../components/AappointmentDetails"
import AppointmentForm from "../components/AappointmentForm"
import { useAuthContext } from "../hooks/useAuthContext"

const AdminAppointmentHome = () => {
  const { appointments, dispatch } = useAAppointmentsContext()
  const {user} = useAuthContext()
  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('/api/appointments', {
        headers: {'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJmYmNkMDljYWIzMDY3ODQzNzI5OTQiLCJpYXQiOjE2ODMwMjMxNjgsImV4cCI6MTY4MzI4MjM2OH0.X2zYBAGp4_z-LEhBtAuM1PLniM9f427T9Of5R2hTtU0"}` && 
        `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMwZmI1NjQzOTdkNmU3YjA1M2E5MDMiLCJpYXQiOjE2ODI5NTg3NzksImV4cCI6MTY4MzIxNzk3OX0.F49b0cxW2WxIa33OXVwWKesFv0R9N8RTNtpvdgsOFns"}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_APPOINTMENTS', payload: json})
      }
    }

    fetchAppointments()
  }, [dispatch])
  const handleGeneratePDF = () => {

        
    // Create a new jsPDF instance
    const doc = new jsPDF();
    // Add content to the PDF
    appointments.forEach((appointment, index) => {
      const y = 10 + index * 40;
      doc.text(`Name: ${appointment.name}`, 10, y);
      doc.text(`Name: ${appointment.tname}`, 10, y+10);
      doc.text(`Date: ${appointment.date}`, 10, y + 20);
      
    });

    // Save the PDF as a file
    doc.save("ALL_appointments.pdf");
    
    };

  return (
    <div className="home">
      <div className="appointments">
      <button className="btn btn-primary" onClick={handleGeneratePDF}>Generate PDF</button>
        {appointments && appointments.map(appointment => (
          <AppointmentDetails appointment={appointment} key={appointment._id} />
        ))}
      </div>
      <AppointmentForm />
    </div>
  )
}

export default AdminAppointmentHome