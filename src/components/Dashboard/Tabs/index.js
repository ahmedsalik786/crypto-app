import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { useState } from 'react';
import Grid from '../Grid';
import "./style.css";
import List from '../List';


export default function TabsComponent({coins}) {
  const [value, setValue] = useState("Grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const theme=createTheme({
  palette:{
    primary:{
      main:"#ff0000",
    },
  },
})

  const style={
    color:"var(--white)",
    width:"50vh",
    fontSize:"1.2rem",
    fontWeight:"bold",
    fontFamily:"Inter",
    textTransform:"capitalize",  

  };

  return (
    <ThemeProvider  theme={theme} >
      <TabContext value={value}>
        <div position="static">
          <TabList onChange={handleChange} variant='fullWidth'>
            <Tab label="Grid" value="Grid"  sx={style}/>
            <Tab label="List" value="List" sx={style} />   
          </TabList>
        </div>
        <TabPanel value="Grid">
          <div className='grid-flex'>
            {coins.map((coin,id)=>{
              return <Grid coin={coin} key={id}/>
            })}
          </div>
        </TabPanel>
        <TabPanel value="List">
        <table className='list-table'>
            {coins.map((coin,id)=>{
              return   <List coin={coin} key={id}/>
            })}
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
