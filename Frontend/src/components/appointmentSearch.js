/*import React, { useState } from "react";
import { useAppointmentsContext } from "../hooks/useappointmentsContext";
import AppointmentsDetails from "./appointmentDetails";

const AppointmentsSearchBar = () => {
  const { appointments, dispatch } = useAppointmentsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Add null check before calling filter
  const filteredAppointments = appointments
    ? appointments.filter((appointment) =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={clearSearch}>Clear</button>
      {filteredAppointments.map((appointment) => (
        // Render filtered appointments details using AppointmentsDetails component
        <AppointmentsDetails key={appointment._id} appointment={appointment} />
      ))}
      {filteredAppointments.length === 0 && <p>No appointments found.</p>}
    </div>
  );
};

export default AppointmentsSearchBar;*/
import React, { useState } from "react";
import jsPDF from "jspdf";
import { useAppointmentsContext } from "../hooks/useappointmentsContext";
import AppointmentsDetails from "./appointmentDetails";

const AppointmentsSearchBar = () => {
  const { appointments, dispatch } = useAppointmentsContext();
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
    appointments.forEach((appointment, index) => {
      const y = 10 + index * 40;
      doc.text(`Name: ${appointment.name}`, 10, y);
      doc.text(`Name: ${appointment.tname}`, 10, y+10);
      doc.text(`Date: ${appointment.date}`, 10, y + 20);
      
    });

    // Save the PDF as a file
    doc.save("appointments.pdf");
    
    };

  // Add null check before calling filter
  const filteredAppointments = appointments
    ? appointments.filter((appointment) =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="btn btn-primary" onClick={clearSearch}>Clear</button>
      &nbsp;&nbsp;
      <button className="btn btn-primary" onClick={handleGeneratePDF}>Generate PDF</button>
      {filteredAppointments.map((appointment) => (
        // Render filtered appointments details using AppointmentsDetails component
        <AppointmentsDetails
          key={appointment._id}
          appointment={appointment}
        />
      ))}
      {filteredAppointments.length === 0 && <p>No appointments found.</p>}
    </div>
  );
};

export default AppointmentsSearchBar;