import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import "./style.css"
export default function SelectDays({days,handleDaysChange,noPTag}) {

  return (
    <div className='select-days' >
      {!noPTag && <p>Price change in </p>}
        <Select  sx={{
            height:"2.5rem",
            width:"10rem",
        }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={days}
          onChange={handleDaysChange}
        >
          <MenuItem value={7}>7days </MenuItem>
          <MenuItem value={10}>10days</MenuItem>
          <MenuItem value={20}>20days</MenuItem>
          <MenuItem value={30}>30days</MenuItem>
          <MenuItem value={60}>60days</MenuItem>
          <MenuItem value={90}>90days</MenuItem>
          <MenuItem value={120}>120days</MenuItem>
          <MenuItem value={365}>1 year</MenuItem>
        </Select>

      
     
    </div>
  );
}
