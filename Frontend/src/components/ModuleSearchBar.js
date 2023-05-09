import React, { useState } from "react";
import { useModuleContext } from "../hooks/useModuleContext";
import ModuleDetails from "./ModuleDetails";
import jsPDF from "jspdf";
import logo from '../assets/logo.jpg';

const SearchBar = () => {
  const { module, dispatch } = useModuleContext();
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

    module.forEach((module, index) => {
      doc.setFontSize(12);
      const y = 30 + index * 30;
      doc.text(`Title: ${module.Title}`, 10, y+60);
      doc.text(`Description: ${module.Description}`, 10, y + 70);
      
    });
  
    // Add some decorations to the PDF
    doc.setFillColor(255, 255, 255);
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
    doc.rect(centerX - 50, 0, 100, 20, 'F');
    doc.setTextColor(0, 0, 255);
    doc.setFontSize(12);

  
  // Add an image to the PDF
const imgData = logo;
const imgWidth = 100;
const imgHeight = 100;
const imgX = centerX - imgWidth / 2; // Center the image horizontally
const imgY = 10; // Position the image below the text
doc.addImage(imgData, "JPEG", imgX, imgY, 105, 50);

const title = "Module Uploading Details Report";
const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
doc.rect(centerX - titleWidth / 20 - 0, imgY + imgHeight + 0, titleWidth + 0, 20, 'F');
doc.setTextColor(0, 0, 255);
doc.setFontSize(12);
doc.text(title, centerX - titleWidth / 2, 70);  // <-- Adjusted y-coordinate

// Save the PDF as a file
doc.save("module.pdf");

  };
  
  
  


  // Add null check before calling filter
  const filteredModule = module
    ? module.filter((module) =>
        module.Title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [dispatch];

  return (
    <div id ="Module_searchbar">
      <input
        type="text"
        placeholder="Search by Title"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button type="button" className="btn btn-secondary btn-sm"  onClick={clearSearch}>Clear</button>
      &nbsp;
      &nbsp;
      <button type="button" className="btn btn-primary btn-sm"  onClick={handleGeneratePDF}>Generate Report</button>
      {filteredModule.map((module) => (
        // Render filtered module details using ModuleDetails component
        <ModuleDetails key={module._id} module={module} />
      ))}
      {filteredModule.length === 0 && <p>No module found.</p>}
    </div>
  );
};

export default SearchBar;