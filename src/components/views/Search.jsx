import React from "react";
import { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSearchBy } from "../../features/druidSlice";

const Search = () => {
  const dispatch = useDispatch();
  const searchBy = useSelector(state =>state.druid.searchBy);
  const search = useSelector(state =>{
    return state.druid.search});
  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value))
  }

  useEffect(() => {
    dispatch(setSearch(""))
  }, [searchBy, dispatch]);

  return (
    <div>
      <input type="text" placeholder="Search" className="searchContainer" onChange={handleSearch}/>
     {/*
      <select name="serachBy" className="searchBy"
        onChange={(e)=>{dispatch(setSearchBy(e.target.value))}}
        >
          <option value="" hidden>filter Search</option>
          <option value="project">by project name</option>
          <option value="customer">by customer</option>
          <option value="developer">by developer</option>
          <option value="engine">by engine</option>
        </select>
    */}
    </div>
  );
};

export default Search;
