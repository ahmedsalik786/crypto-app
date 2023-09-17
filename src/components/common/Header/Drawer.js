import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Button from "../Button";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton className="drawer-icon" onClick={() => setOpen(true)}>
        <MenuRoundedIcon />
      </IconButton>
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div className="drawer-div">
        <Link to="/">
          <p className="link">Home </p>
        </Link>
        <Link to="/compare">
          <p className="link">Compare</p>
        </Link>
        <Link to="/watchlist">
          <p className="link">WatchList</p>
        </Link>
        <Link to="/dashboard">
          <Button 
          text={"Dashboard"} 
          onClick={()=>console.log("Login")}
          outlined={true} />
        </Link>
        </div>
      </Drawer>
    </div>
  );
}
