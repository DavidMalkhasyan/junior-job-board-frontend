import "./UserCard.css";

export default function UserCard({ user, onClick }) {
    const createdAt = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "";

    return (
        <div
            className="usercard"
            onClick={onClick ? () => onClick(user) : undefined}
        >
            <div className="usercard__header">
                <div className="usercard__header__left">
                    <div className="usercard__avatar">
                        <img
                            src={user.avatarUrl || "/assets/images/UserAvatar.svg"}
                            alt="User Avatar"
                        />
                    </div>
                    <div className="usercard__info">
                        <h3 className="usercard__name">{user.name} {user.lastname}</h3>
                        <p className="usercard__location">{user.location}</p>
                    </div>
                </div>

                <img
                    className="usercard__more"
                    src="/assets/images/3dots.svg"
                    alt="more"
                />
            </div>

            <div className="usercard__details">
                <p className="usercard__grade">{user.grade}</p>
                <p className="usercard__languages">
                    {Array.isArray(user.programmingLanguages) ? user.programmingLanguages.join(", ") : ""}
                </p>
            </div>

            <div className="usercard__skills">
                {Array.isArray(user.skills) &&
                    user.skills.map((skill, idx) => (
                        <span
                            key={`${user._id || user.id}-skill-${idx}`}
                            className="usercard__skill-item"
                        >
                            {skill}
                        </span>
                    ))}
            </div>

            <div className="usercard__footer">
                <p className="usercard__date">{createdAt}</p>
            </div>
        </div>
    );
}
