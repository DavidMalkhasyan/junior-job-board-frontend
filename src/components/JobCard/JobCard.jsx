import "./JobCard.css";

export default function JobCard({ job }) {
  return (
    <div className="jobcard">
      <div className="jobcard__header">
        <div className="jobcard__logo">
          <img src="/" alt="CompanyLogo" />
        </div>

        <div className="jobcard__info">
          <h3 className="jobcard__title">{job.title}</h3>
          <p className="jobcard__location">{job.location}</p>
        </div>

        <button className="jobcard__menu">⋮</button>
      </div>

      <div className="jobcard__details">
        <p className="jobcard__grade">{job.grade}</p>
        <p className="jobcard__worktype">{job.workType.join(", ")}</p>
        <p className="jobcard__salary">
          {job.salaryRange.min} – {job.salaryRange.max}
        </p>
      </div>

      <p className="jobcard__description">{job.description}</p>

      <div className="jobcard__skills">
        {job.skills.map((skill) => (
          <span key={skill} className="jobcard__skill-item">{skill}</span>
        ))}
      </div>

      <div className="jobcard__footer">
        <p className="jobcard__date">{job.createdAt}</p>
        <img className="jobcard__save" src="/" alt="save" />
      </div>
    </div>
  );
}
