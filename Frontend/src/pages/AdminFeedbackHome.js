import { useEffect } from "react"
import { useAFeedbacksContext } from "../hooks/AuseFeedbacksContext"
import jsPDF from "jspdf";

// components
import FeedbackDetails from "../components/AfeedbackDetails"
import FeedbackForm from "../components/AfeedbackForm"
import { useAuthContext } from "../hooks/useAuthContext"

const AdminFeedbackHome = () => {
  const { feedbacks, dispatch } = useAFeedbacksContext()
  const {user} = useAuthContext()
  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedbacks', {
        headers: {'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJmYmNkMDljYWIzMDY3ODQzNzI5OTQiLCJpYXQiOjE2ODMwMjMxNjgsImV4cCI6MTY4MzI4MjM2OH0.X2zYBAGp4_z-LEhBtAuM1PLniM9f427T9Of5R2hTtU0"}` && 
        `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMwZmI1NjQzOTdkNmU3YjA1M2E5MDMiLCJpYXQiOjE2ODI5NTg3NzksImV4cCI6MTY4MzIxNzk3OX0.F49b0cxW2WxIa33OXVwWKesFv0R9N8RTNtpvdgsOFns"}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_FEEDBACKS', payload: json})
      }
    }

    fetchFeedbacks()
  }, [dispatch])
  const handleGeneratePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    feedbacks.forEach((feedback, index) => {
      const y = 10 + index * 40;
      doc.text(`Name: ${feedback.name}`, 10, y);
      doc.text(`Topic/Reason: ${feedback.topic}`, 10, y + 10);
      doc.text(`Description: ${feedback.description}`, 10, y + 20);
    });

    // Save the PDF as a file
    doc.save("ALL_feedbacks.pdf");
  };

  return (
    <div className="home">
      <div className="feedbacks">
      <button className="btn btn-primary" onClick={handleGeneratePDF}>Generate PDF</button>
        {feedbacks && feedbacks.map(feedback => (
          <FeedbackDetails feedback={feedback} key={feedback._id} />
        ))}
      </div>
      <FeedbackForm />
    </div>
  )
}

export default AdminFeedbackHome