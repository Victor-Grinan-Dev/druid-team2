import React from "react";

const Search = () => {
  return (
    <div>
      <input type="text" placeholder="Search" className="searchContainer" />
      <select name="serachBy" className="searchBy">
        <option value="customer">by customer</option>
        <option value="developer">by developer</option>
        <option value="project">by project</option>
      </select>
    </div>
  );
};

export default Search;
