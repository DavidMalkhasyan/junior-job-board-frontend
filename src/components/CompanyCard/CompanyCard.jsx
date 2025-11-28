import "./CompanyCard.css";

export default function CompanyCard({ company, onClick }) {
    const createdAt = company.createdAt
        ? new Date(company.createdAt).toLocaleDateString()
        : "";

    return (
        <div
            className="companycard"
            onClick={onClick ? () => onClick(company) : undefined}
        >
            <div className="companycard__header">
                <div className="companycard__header__left">
                    <div className="companycard__logo">
                        <img
                            src={company.avatarUrl || "/assets/images/CompanyLogo.svg"}
                            alt="Company Logo"
                        />
                    </div>
                    <div className="companycard__info">
                        <h3 className="companycard__title">{company.name}</h3>
                        <p className="companycard__location">{company.location}</p>
                    </div>
                </div>

                <img
                    className="companycard__more"
                    src="/assets/images/3dots.svg"
                    alt="more"
                />
            </div>

            <div className="companycard__details">
                <p className="companycard__website">{company.website}</p>
            </div>

            <p className="companycard__description">{company.description}</p>

            <div className="companycard__footer">
                <p className="companycard__date">{createdAt}</p>
            </div>
        </div>
    );
}
