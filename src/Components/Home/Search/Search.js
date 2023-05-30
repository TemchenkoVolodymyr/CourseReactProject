import React, {useState} from 'react';

const Search = () => {

  let [search,setSearch] = useState("")

  const changeSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <input type="search" placeholder="search" value={search} onChange={changeSearch}/>
    </div>
  );
};

export default Search;