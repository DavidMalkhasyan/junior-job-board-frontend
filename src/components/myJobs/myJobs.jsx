import React, { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import api from "../../axiosConfig";
import "./myJobs.css";

const resolveCompanyId = () => {
    const storedUser = localStorage.getItem("Data");
    if (!storedUser) return null;

    try {
        const parsed = JSON.parse(storedUser);
        if (parsed?._id) {
            return parsed._id.$oid || parsed._id;
        }
    } catch (err) {
        console.error("Failed to parse company data from localStorage", err);
    }

    return null;
};

export default function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [companyId] = useState(() => resolveCompanyId());

    useEffect(() => {
        const fetchCompanyJobs = async () => {
            if (!companyId) {
                setError("Company ID not found.");
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/companies/${companyId}/jobs`);
                const rawData = Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(response.data?.jobs)
                      ? response.data.jobs
                      : [];
                const data = rawData.filter(Boolean);
                const normalizedJobs = data.map((job) => {
                    const formattedCreatedAt = job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "";
                    return {
                        ...job,
                        _id: job._id?.$oid || job._id,
                        workType: Array.isArray(job.workType)
                            ? job.workType
                            : [],
                        skills: Array.isArray(job.skills) ? job.skills : [],
                        requiredLanguages: Array.isArray(
                            job.requiredLanguages
                        )
                            ? job.requiredLanguages
                            : [],
                        createdAt: formattedCreatedAt,
                    };
                });
                setJobs(normalizedJobs);
            } catch (err) {
                console.error(err);
                setError("Unable to load jobs right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyJobs();
    }, [companyId]);

    const handleEdit = (job) => {
        // TODO: open edit modal for selected job
    };

    const handleDelete = (jobId) => {
        // TODO: trigger delete flow for the provided jobId
    };

    if (loading) {
        return <div className="myjobs__status">Loading your jobs...</div>;
    }

    if (error) {
        return (
            <div className="myjobs__status myjobs__status--error">{error}</div>
        );
    }

    if (!jobs.length) {
        return (
            <div className="myjobs__status">
                You have not posted any jobs yet.
            </div>
        );
    }

    return (
        <div className="myjobs">
            {jobs.map((job) => (
                <div className="myjobs__card" key={job._id}>
                    <JobCard
                        job={job}
                        actions={
                            <>
                                <button
                                    type="button"
                                    className="myjobs__button"
                                    onClick={() => handleEdit(job)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="myjobs__button myjobs__button--danger"
                                    onClick={() => handleDelete(job._id)}
                                >
                                    Delete
                                </button>
                            </>
                        }
                    />
                </div>
            ))}
        </div>
    );
}
