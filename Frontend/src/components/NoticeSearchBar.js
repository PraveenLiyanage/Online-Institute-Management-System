import React, { useState } from "react";
import { useNoticesContext } from "../hooks/useNoticesContext";
import NoticeDetails from "./NoticeDetails";
import jsPDF from "jspdf";
import "../notice.css";

const SearchBar = () => {
  const { notices, dispatch } = useNoticesContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Add null check before calling filter
  const filteredNotices = notices
    ? notices.filter((notice) =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [dispatch];

  //generatepdf
  const handleGeneratePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    notices.forEach((notice, index) => {
      const y = 10 + index * 40;
      doc.text(`Title: ${notice.title}`, 10, y);
      doc.text(`Note: ${notice.note}`, 10, y + 10);
    });

    // Save the PDF as a file
    doc.save("notices.pdf");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title"
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
      <th id="th1">Notice title</th>
      <th id="th2">Notice note</th>
      <th id="th3">Notice date</th>
      <th id="th4">Actions</th>
    </tr>
  </thead>
      </table>
      
        
          {filteredNotices.map((notice) => (
            // Render filtered notice details using NoticeDetails component
            <NoticeDetails key={notice._id} notice={notice} />
          ))}
        

      {filteredNotices.length === 0 && <p>No notice found.</p>}
    </div>
  );
};

export default SearchBar;



