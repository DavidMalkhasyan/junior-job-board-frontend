import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="searchbar">
      <input
        type="text"
        className="searchbar__input"
        placeholder="Search for jobs or profiles..."
      />
    </div>
  );
}
