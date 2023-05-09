import React, { useState } from "react";
import { useTicketsContext } from "../hooks/useTicketsContext";
import TicketDetails from "./TicketDetails";
import '../SupportServices.css'
import jsPDF from "jspdf";


const SearchBar = () => {
  const { tickets, dispatch } = useTicketsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };


  const handleGeneratePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
   tickets.forEach((ticket, index) => {
  const y = 10 + index * 80;
  doc.text(`Student Name: ${ticket.sname}`, 10, y);
  doc.text(`Email: ${ticket.email}`, 10, y + 10);
  doc.text(`Contact number: ${ticket.contNo}`, 10, y + 20);
  doc.text(`Module: ${ticket.module}`, 10, y + 30);
  doc.text(`Request/ Inquiry type: ${ticket.inquiry}`, 10, y + 40);
  doc.text(`Message: ${ticket.message}`, 10, y + 50);
  doc.text(`Replay: ${ticket.adminReply}`, 20, y + 60);
});


    // Save the PDF as a file
    doc.save("tickets.pdf");
  }; 


  // Add null check before calling filter
  const filteredTicket = tickets
    ? tickets.filter((tickets) =>
    tickets.inquiry.toLowerCase().includes(searchTerm.toLowerCase())
    
      )
    : [dispatch];

  return (
    <div id="search-section" >
      
      <input 
        type="text"
        placeholder="Search by Request/ Inquiry type"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button type="button"  onClick={clearSearch}>Clear</button>
      &nbsp;
      
      <button  onClick={handleGeneratePDF}>Generate Report</button>
      
      {filteredTicket.map((ticket) => (
        // Render filtered feedback details using FeedbackDetails component
        <TicketDetails key={ticket._id} ticket={ticket} />
      ))}
      {filteredTicket.length === 0 && <p>Not found.</p>}
    </div>
  );
};

export default SearchBar;