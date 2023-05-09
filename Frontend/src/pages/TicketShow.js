import { useEffect } from "react";
import { useTicketsContext } from "../hooks/useTicketsContext"
import '../SupportServices.css'

// components
import TicketFrom from "../components/TicketForm";
//import TicketDetails from "../components/TicketDetails";
import SearchBar from "../components/TicketSearchBar"



const TicketShow = () => {
  const { dispatch } = useTicketsContext()

  
    useEffect(()=>{
        const fetchTickets = async() => {
            const response = await fetch('/api/ticket')
            const json = await response.json()

            if(response.ok){
              dispatch({type: 'SET_TICKETS', payload: json})
            }
        }
        fetchTickets()
    }, )

  return (
    <div className="ticket">
      <TicketFrom/>
      <h2>My Tickets  </h2> 
      <div className="tickets">

      <SearchBar/>
        
      </div>
      
    </div>
  );
};

export default TicketShow