import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CategorySelector({ onChange }) {
  // set default value
  const [category, setCategory] = useState("now_playing");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onChange(e);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value={"now_playing"}>Now Playing</MenuItem>
          <MenuItem value={"popular"}>Popular</MenuItem>
          <MenuItem value={"top_rated"}>Top Rated</MenuItem>
          <MenuItem value={"upcoming"}>Upcoming</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
