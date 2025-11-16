import React, { useState, useEffect, useMemo } from "react";
import { categories, languages, seniorityLevels, skillsMap } from "../../data/filterData";

export default function FilterPanel({ filters, onChangeFilter, jobList }) {
  const [selectedCategory, setSelectedCategory] = useState(filters.category || "");
  const [selectedLanguage, setSelectedLanguage] = useState(filters.language[0] || "");
  const [selectedSeniority, setSelectedSeniority] = useState(filters.seniority || []);
  const [selectedSkills, setSelectedSkills] = useState(filters.skills || []);
  const [availableSkills, setAvailableSkills] = useState([]);

  useEffect(() => {
    if (selectedLanguage && selectedCategory) {
      const skillsForSelection = skillsMap[selectedLanguage]?.[selectedCategory];
      setAvailableSkills(Array.isArray(skillsForSelection) ? skillsForSelection : []);
      setSelectedSkills(prev =>
        prev.filter(skill => Array.isArray(skillsForSelection) ? skillsForSelection.includes(skill) : false)
      );
    } else {
      setAvailableSkills([]);
      setSelectedSkills([]);
    }
  }, [selectedLanguage, selectedCategory]);

  const getCounts = (items, field) => {
    const counts = {};
    if (!jobList || jobList.length === 0) return counts;
    items.forEach(item => {
      counts[item] = jobList.filter(job => {
        if (field === "language") return job.requiredLanguages?.includes(item);
        if (field === "category") return job.category?.includes(item);
        if (field === "seniority") return job.grade === item;
        if (field === "skills") return job.skills?.includes(item);
        return false;
      }).length;
    });
    return counts;
  };

  const categoryCounts = useMemo(() => getCounts(categories, "category"), [jobList]);
  const languageCounts = useMemo(() => getCounts(languages, "language"), [jobList]);
  const seniorityCounts = useMemo(() => getCounts(seniorityLevels, "seniority"), [jobList]);
  const skillsCounts = useMemo(() => getCounts(availableSkills, "skills"), [jobList, availableSkills]);

  const toggleSelection = (value, stateArray, setState) => {
    if (stateArray.includes(value)) {
      setState(stateArray.filter(v => v !== value));
    } else {
      setState([...stateArray, value]);
    }
  };

  const handleApply = () => {
    onChangeFilter({
      category: selectedCategory,
      language: selectedLanguage ? [selectedLanguage] : [],
      seniority: selectedSeniority,
      skills: selectedSkills
    });
  };

  const renderCheckboxGroup = (items, selected, setSelected, counts) => (
    <div className="filter-options">
      {items &&
        items.length > 0 &&
        items.map((item, idx) => (
          <label key={`${item}-${idx}`} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => toggleSelection(item, selected, setSelected)}
            />
            <span className="checkbox-square"></span>
            <span className="checkbox-label">
              {item} ({counts[item] || 0})
            </span>
          </label>
        ))}
    </div>
  );

  return (
    <div className="filter-panel">
      {/* Category */}
      <div className="filter-field">
        <p className="filter-title">Category</p>
        <div className="filter-options">
          {categories.map((cat, idx) => (
            <label key={`cat-${cat}-${idx}`} className="filter-checkbox">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
              />
              <span className="checkbox-square"></span>
              <span className="checkbox-label">{cat} ({categoryCounts[cat] || 0})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="filter-field">
        <p className="filter-title">Language</p>
        <div className="filter-options">
          {languages.map((lang, idx) => (
            <label key={`lang-${lang}-${idx}`} className="filter-checkbox">
              <input
                type="radio"
                name="language"
                checked={selectedLanguage === lang}
                onChange={() => setSelectedLanguage(lang)}
              />
              <span className="checkbox-square"></span>
              <span className="checkbox-label">{lang} ({languageCounts[lang] || 0})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Seniority */}
      <div className="filter-field">
        <p className="filter-title">Seniority</p>
        {renderCheckboxGroup(seniorityLevels, selectedSeniority, setSelectedSeniority, seniorityCounts)}
      </div>

      {/* Skills */}
      {availableSkills.length > 0 && (
        <div className="filter-field">
          <p className="filter-title">Skills</p>
          {renderCheckboxGroup(availableSkills, selectedSkills, setSelectedSkills, skillsCounts)}
        </div>
      )}

      <button className="filter-apply-btn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
}
