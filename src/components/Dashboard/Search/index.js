import React, { useState } from 'react'
import "./style.css"
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

function Search({search,onSearchChange}) {

  return (
    <div className='search-flex'>
        <SearchRoundedIcon />
        <input type="text" value={search} onChange={(e)=>onSearchChange(e)} placeholder='search coin'/>
    </div>
  )
}

export default Search