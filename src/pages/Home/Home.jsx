import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
// import FilterPanel from "../../components/FilterPanel/FilterPanel";
// import SearchBar from "../../components/SearchBar/SearchBar";
// import JobList from "../../components/JobList/JobList";

export default function Home() {
  // ==========================
  // STATE DECLARATIONS
  // ==========================

  // activeSection: keeps track of which main menu section is selected
  // e.g., "home" for Find Jobs, "company" for Company, "resumes" for Find Resumes
  const [activeSection, setActiveSection] = useState("home");

  // // searchTerm: stores the current search input from the user
  // const [searchTerm, setSearchTerm] = useState("");                       //for future use

  // filters: stores all filter options selected by the user
  // location: current location filter
  // jobType: "full-time", "part-time", or "all"
  // experience: "junior", "mid", "senior", or "all"
    // const [filters, setFilters] = useState({
    //   category: "all",
      
    //   location: "",
    //   jobType: "all",
    //   experience: "all",
    // });                                                                     // for future use

  // ==========================
  // HANDLER FUNCTIONS
  // ==========================

  // called when user clicks a menu item in Navbar
  const handleSectionChange = (section) => setActiveSection(section);

  // // called when user types in the search bar
  // const handleSearchChange = (term) => setSearchTerm(term);                                //for future use

  // called when user changes filter options in FilterPanel
  // merges new filters with previous state
  // const handleFilterChange = (newFilters) =>
  //   setFilters((prev) => ({ ...prev, ...newFilters }));                                        // for future use

  // ==========================
  // RENDER
  // ========================== 
  return (
    <div>
      {/* Navbar: receives active section and callback to change it */}
      <Navbar active={activeSection} onChangeActive={handleSectionChange} />

      {/* SearchBar: controlled input for search
      <SearchBar value={searchTerm} onChange={handleSearchChange} /> */} {/*for future use*/}

      {/* FilterPanel: controlled component for filtering jobs
      <FilterPanel filters={filters} onChangeFilter={handleFilterChange} /> */}                   {/*for future use*/}

      {/* JobList: displays jobs based on active section, search term, and filters */}
      {/* <JobList
        section={activeSection}
        search={searchTerm}                     //for future use
        filters={filters}
      /> */}
    </div>
  );
}
