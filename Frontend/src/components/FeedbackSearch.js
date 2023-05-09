import React, { useState } from "react";
import jsPDF from "jspdf";
import FeedbackDetails from "./FeedbackDetails";
import { useFeedbacksContext } from "../hooks/useFeedbacksContext";

const FeedbackSearchBar = () => {
  const { feedbacks, dispatch } = useFeedbacksContext();
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
    feedbacks.forEach((feedback, index) => {
      const y = 10 + index * 40;
      doc.text(`Name: ${feedback.name}`, 10, y);
      doc.text(`Topic/Reason: ${feedback.topic}`, 10, y + 10);
      doc.text(`Description: ${feedback.description}`, 10, y + 20);
    });

    // Save the PDF as a file
    doc.save("feedbacks.pdf");
  };

  // Add null check before calling filter
  const filteredFeedbacks = feedbacks
    ? feedbacks.filter((feedback) =>
        feedback.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      {filteredFeedbacks.map((feedback) => (
        // Render filtered feedback details using FeedbackDetails component
        <FeedbackDetails key={feedback._id} feedback={feedback} />
      ))}
      {filteredFeedbacks.length === 0 && <p>No feedback found.</p>}
    </div>
  );
};

export default FeedbackSearchBar;



