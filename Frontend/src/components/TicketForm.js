import { useState } from "react";
import bgImg from '../assets/img11.png';
import '../SupportServices.css'

const TicketFrom = () => {

    const[sname, setName] = useState('')
    const[email, setEmail] = useState('')
    const[contNo, setContNo] = useState('')
    const[module, setModule] = useState('')
    const[inquiry, setInquiry] = useState('')
    const[message, setMessage] = useState('')
    const[error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ticket = {sname, email, contNo, module, inquiry, message}

        const response = await fetch('/api/ticket', {
            method: 'POST',
            body: JSON.stringify(ticket),
            headers:{'Content-Type': 'application/json'}
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setName('')
            setEmail('')
            setContNo('')
            setModule('')
            setInquiry('')
            setMessage('')
            setError(null)
            setEmptyFields([])
            console.log('New Ticket Added',json)
        }
    }

    return (
      <section>
        <div id="ticket-from">
          <div id="col-1">
            <h3>Welcome to Support Services</h3>
            <span>Please complete this form, and one of our agents will reply to you as soon as possible.</span>
    
            <form id="tfrom" onSubmit={handleSubmit}>
              <label htmlFor="name" className="name-label">SDT:Name</label>
              <input type="text" id="name" className={emptyFields.includes('Title') ? 'error' : ''} value={sname} onChange={(e) => setName(e.target.value)} />
    
              <label htmlFor="email" className="email-label">Email</label>
              <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    
              <label htmlFor="contactNo" className="contactNo-label">Contact Number</label>
              <input type="tel" id="contactNo" value={contNo} onChange={(e) => setContNo(e.target.value)} />
    
              <label htmlFor="module" className="module-label">Module</label>
              <input type="text" id="module" value={module} onChange={(e) => setModule(e.target.value)} />
    
              <label htmlFor="inquiry" className="inquiry-label">Request/Inquiry type</label>
              <select id="inquiry" value={inquiry} onChange={(e) => setInquiry(e.target.value)}>
                <option value="" disabled>Please select the most suitable option</option>
                <option value="I have a question about Registration">I have a question about Registration</option>
                <option value="I have a question about Examinations">I have a question about Examinations</option>
                <option value="I want to">I want to</option>
                <option value="Other">Other</option>
              </select>
    
              <label htmlFor="message" className="message-label">Message</label>
              <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
    
              <button type="submit" className="btn" id="submit-button">Submit Ticket</button>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
    
          <div id="col-2">
            <img src={bgImg} alt="" />
          </div>
        </div>
      </section>
    );
    
      
}

export default TicketFrom;
