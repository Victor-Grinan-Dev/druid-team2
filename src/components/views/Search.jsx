import React from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSearchBy } from "../../features/druidSlice";

const Search = () => {
  const dispatch = useDispatch();
 
  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value))
  }

  return (
    <div>
      <input type="text" placeholder="Search" className="searchContainer" onChange={handleSearch}/>
      <select name="serachBy" className="searchBy"
      onChange={(e)=>{dispatch(setSearchBy(e.target.value))}}
      >
        <option value="customer">by customer</option>
        <option value="developer">by developer</option>
        <option value="project">by project</option>
        <option value="engine">by engine</option>
      </select>
    </div>
  );
};

export default Search;
