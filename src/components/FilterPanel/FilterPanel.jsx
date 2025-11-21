import React, { useState, useEffect } from "react";
import {
    categories,
    languages,
    seniorityLevels,
    skillsMap,
} from "../../data/filterData";
import "./FilterPanel.css";

export default function FilterPanel({ filters, onApply }) {
    const [selectedCategory, setSelectedCategory] = useState(filters.category ? [filters.category] : []);
    const [selectedLanguage, setSelectedLanguage] = useState(
        filters.language ? [decodeURIComponent(filters.language)] : []
    );
    const [selectedSeniority, setSelectedSeniority] = useState(filters.seniority || []);
    const [selectedSkills, setSelectedSkills] = useState(filters.skills || []);
    const [availableSkills, setAvailableSkills] = useState([]);
    const [salaryMin, setSalaryMin] = useState(filters.salary?.[0] ?? "");
    const [salaryMax, setSalaryMax] = useState(filters.salary?.[1] ?? "");

    const toggleSelection = (value, list, setter) => {
        setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    };

    const clearFilters = () => {
        setSelectedCategory([]);
        setSelectedLanguage([]);
        setSelectedSeniority([]);
        setSelectedSkills([]);
        setSalaryMin("");
        setSalaryMax("");
        setAvailableSkills([]);
    };

    useEffect(() => {
        if (selectedCategory.length > 0 && selectedLanguage.length > 0) {
            const langKey = languages[selectedLanguage[0]]?.skillsKey;
            const skills = skillsMap[langKey]?.[selectedCategory[0]] || [];
            setAvailableSkills(skills);
            setSelectedSkills((prev) => prev.filter((s) => skills.includes(s)));
        } else {
            setAvailableSkills([]);
            setSelectedSkills([]);
        }
    }, [selectedCategory, selectedLanguage]);

    const handleApply = () => {
        onApply({
            category: selectedCategory[0] || "",
            language: selectedLanguage[0] ? languages[selectedLanguage[0]].url : "",
            seniority: selectedSeniority,
            skills: selectedSkills,
            salary: [
                salaryMin !== "" ? Number(salaryMin) : null,
                salaryMax !== "" ? Number(salaryMax) : null,
            ],
        });
    };

    return (
        <div className="filter-panel-vertical">
            {/* CATEGORY */}
            <div className="filter-field">
                <p className="filter-title">Category</p>
                {categories.map((cat) => (
                    <label key={cat} className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={selectedCategory.includes(cat)}
                            onChange={() => toggleSelection(cat, selectedCategory, setSelectedCategory)}
                        />
                        <span
                            className="checkbox-square"
                            style={{
                                borderColor: selectedCategory.includes(cat) ? "#0062ff" : "#ccc",
                                background: selectedCategory.includes(cat) ? "#dbe5ff" : "#f5f5f9",
                            }}
                        ></span>
                        <span className="checkbox-label">{cat}</span>
                    </label>
                ))}
            </div>

            {/* LANGUAGE */}
            <div className="filter-field">
                <p className="filter-title">Language</p>
                {Object.keys(languages).map((key) => (
                    <label key={key} className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={selectedLanguage.includes(key)}
                            onChange={() => toggleSelection(key, selectedLanguage, setSelectedLanguage)}
                        />
                        <span
                            className="checkbox-square"
                            style={{
                                borderColor: selectedLanguage.includes(key) ? "#0062ff" : "#ccc",
                                background: selectedLanguage.includes(key) ? "#dbe5ff" : "#f5f5f9",
                            }}
                        ></span>
                        <span className="checkbox-label">{languages[key].display}</span>
                    </label>
                ))}
            </div>

            {/* SENIORITY */}
            <div className="filter-field">
                <p className="filter-title">Seniority</p>
                {seniorityLevels.map((level) => (
                    <label key={level} className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={selectedSeniority.includes(level)}
                            onChange={() => toggleSelection(level, selectedSeniority, setSelectedSeniority)}
                        />
                        <span
                            className="checkbox-square"
                            style={{
                                borderColor: selectedSeniority.includes(level) ? "#0062ff" : "#ccc",
                                background: selectedSeniority.includes(level) ? "#dbe5ff" : "#f5f5f9",
                            }}
                        ></span>
                        <span className="checkbox-label">{level}</span>
                    </label>
                ))}
            </div>

            {/* SKILLS */}
            {availableSkills.length > 0 && (
                <div className="filter-field">
                    <p className="filter-title">Skills</p>
                    {availableSkills.map((skill) => (
                        <label key={skill} className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedSkills.includes(skill)}
                                onChange={() => toggleSelection(skill, selectedSkills, setSelectedSkills)}
                            />
                            <span
                                className="checkbox-square"
                                style={{
                                    borderColor: selectedSkills.includes(skill) ? "#0062ff" : "#ccc",
                                    background: selectedSkills.includes(skill) ? "#dbe5ff" : "#f5f5f9",
                                }}
                            ></span>
                            <span className="checkbox-label">{skill}</span>
                        </label>
                    ))}
                </div>
            )}

            {/* SALARY */}
            <div className="filter-field">
                <p className="filter-title">Salary Range</p>
                <div className="salary-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value)}
                    />
                </div>
            </div>

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button className="apply-btn" onClick={handleApply}>
                    Apply
                </button>
                <button
                    className="apply-btn"
                    style={{ backgroundColor: "#ccc", color: "#000" }}
                    onClick={clearFilters}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
