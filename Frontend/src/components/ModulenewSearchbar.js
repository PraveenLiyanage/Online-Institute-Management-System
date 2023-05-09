import React, { useState } from "react";
import { useModuleContext } from "../hooks/useModuleContext";
import ModuleDetails from "./Moduledetail";


const SearchBar = () => {
  const { module, dispatch } = useModuleContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
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
      
      {filteredModule.map((module) => (
        // Render filtered module details using ModuleDetails component
        <ModuleDetails key={module._id} module={module} />
      ))}
      {filteredModule.length === 0 && <p>No module found.</p>}
    </div>
  );
};

export default SearchBar;