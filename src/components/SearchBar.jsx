import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './SearchBar.css'; // Impor file CSS khusus untuk SearchBar

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Cari disini..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

export default SearchBar;
