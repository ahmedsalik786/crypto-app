import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "./style.css"; // Make sure to import your CSS file

export default function TogglePriceType({ priceType, handlePriceTypeChange }) {
  return (
    <ToggleButtonGroup
      value={priceType}
      exclusive
      onChange={handlePriceTypeChange}
      aria-label="text alignment"
      className="light-toggle-group" // Add the class here
    >
      <ToggleButton value="prices">Prices</ToggleButton>
      <ToggleButton value="total_volumes">Total Volumes</ToggleButton>
      <ToggleButton value="market_caps"> Market Caps </ToggleButton>
    </ToggleButtonGroup>
  );
}
