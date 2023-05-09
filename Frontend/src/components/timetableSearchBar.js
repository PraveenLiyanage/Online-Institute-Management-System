import React, { useState } from "react";
import { useTimetablesContext } from "../hooks/useTimetableContext";
import TimetableDetails from "./timetableDetails";
import jsPDF from "jspdf";
import "../timetable.css";

const SearchBar = () => {
  const { timetables, dispatch } = useTimetablesContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Add null check before calling filter
  const filteredTimetables = timetables
    ? timetables.filter((timetable) =>
        timetable.day.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [dispatch];

  //generatepdf
  const handleGeneratePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    timetables.forEach((timetable, index) => {
      const y = 10 + index * 60;
      doc.text(`Day: ${timetable.day}`, 10, y);
      doc.text(`6.00 a.m. - 9.00 a.m: ${timetable.time1}`, 10, y + 10);
      doc.text(`9.00 a.m. - 12.00 p.m: ${timetable.time2}`, 10, y + 20);
      doc.text(`12.00 a.m. - 3.00 p.m: ${timetable.time3}`, 10, y + 30);
      doc.text(`3.00 p.m. - 6.00 p.m: ${timetable.time4}`, 10, y + 40);
    });

    // Save the PDF as a file
    doc.save("timetables.pdf");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by day"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="searchbtn" onClick={clearSearch}>
        Clear
      </button>
      <span></span>

      <button className="pdfbtn" onClick={handleGeneratePDF}>
        Generate PDF
      </button>
      <table id ="t1">
      <thead>
    <tr>
      <th id="tth1">Timetable day</th>
      <th id="tth2">6.00 a.m. - 9.00 a.m</th>
      <th id="tth3">9.00 a.m. - 12.00 p.m</th>
      <th id="tth5">12.00 a.m. - 3.00 p.m</th>
      <th id="tth6">3.00 p.m. - 6.00 p.m</th>
      <th id="tth4">Actions</th>
    </tr>
  </thead>
      </table>
      
        
          {filteredTimetables.map((timetable) => (
            // Render filtered timetable details using TimetableDetails component
            <TimetableDetails key={timetable._id} timetable={timetable} />
          ))}
        

      {filteredTimetables.length === 0 && <p>No timetable found.</p>}
    </div>
  );
};

export default SearchBar;



