import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
// import FilterPanel from "../../components/FilterPanel/FilterPanel";
import jobs from "../../data/jobsMock";
import JobCard from "../../components/JobCard/JobCard";
import "./Home.css";
export default function Home() {
    // ==========================
    // STATE DECLARATIONS
    // ==========================

    // activeSection: keeps track of which main menu section is selected
    // e.g., "home" for Find Jobs, "company" for Company, "resumes" for Find Resumes
    const [activeSection, setActiveSection] = useState("home");

    //searchTerm: stores the current search input from the user
    const [searchTerm, setSearchTerm] = useState("");

    // filters: stores all filter options selected by the user
    // location: current location filter
    // jobType: "full-time", "part-time", or "all"
    // experience: "junior", "mid", "senior", or "all"
    // const [filters, setFilters] = useState({
    //   category: "all",

    //   location: "",
    //   jobType: "all",
    //   experience: "all",
    // });                                                                     // Filter for future use

    // ==========================
    // HANDLER FUNCTIONS
    // ==========================

    // called when user clicks a menu item in Navbar
    const handleSectionChange = (section) => setActiveSection(section);

    // called when user types in the search bar
    const handleSearchChange = (term) => setSearchTerm(term);

    // called when user changes filter options in FilterPanel
    // merges new filters with previous state
    // const handleFilterChange = (newFilters) =>
    //   setFilters((prev) => ({ ...prev, ...newFilters }));                                        //Filter for future use

    // ==========================
    // RENDER
    // ==========================
    return (
        <div className="home">
            {/* Navbar: receives active section and callback to change it */}
            <Navbar
                active={activeSection}
                onChangeActive={handleSectionChange}
            />

            {/*SearchBar: controlled input for search*/}
            <div className="home__topbar">
                <button className="home__post-job-btn">Post job</button>
                <SearchBar value={searchTerm} onChange={handleSearchChange} />
                {/* FilterPanel: controlled component for filtering jobs
      <FilterPanel filters={filters} onChangeFilter={handleFilterChange} /> */}{" "}
                {/* Filter for future use*/}
            </div>

            <div className="home__content">
                <div className="home__filters">
                    <div>Filter</div>
                </div>
                
                <div className="home__jobs">
                    <div className="job-listings">
                        {jobs.map((job,i) => (
                            <JobCard key={i} job={job} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
