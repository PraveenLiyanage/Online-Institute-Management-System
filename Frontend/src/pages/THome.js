//not main only testing
import { useEffect, useState } from "react";

const THome = () => {
    const [tickets, setTickets] = useState(null)

    useEffect(()=>{
        const fetchTickets = async() => {
            const response = await fetch('http://localhost:4000/api/tickets')
            const json = await response.json()

            if(response.ok){
                setTickets(json)
            }
        }
        fetchTickets()
    }, [])

  return (
    
    <div className="ticket">
      <h2>Tickets</h2>
      <div className="tickets">
        
        {tickets && tickets.map((ticket) => <p key={ticket._id}>{ticket.sname}</p>)}
      </div>
    </div>
  );
};

export default THome