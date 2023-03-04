import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

export default function RatingSelector({ onChange }) {
  return (
    <FormControl onChange={onChange}>
      <InputLabel variant="standard" htmlFor="rating-selector">
        Category
      </InputLabel>
      <NativeSelect
        defaultValue={1}
        onChange={onChange}
        inputProps={{
          name: "rating",
          id: "rating-selector"
        }}
      >
        <option value={"1"}>{1}</option>
        <option value={"2"}>{2}</option>
        <option value={"3"}>{3}</option>
        <option value={"4"}>{4}</option>
        <option value={"5"}>{5}</option>
        <option value={"6"}>{6}</option>
        <option value={"7"}>{7}</option>
        <option value={"8"}>{8}</option>
        <option value={"9"}>{9}</option>
        <option value={"10"}>{10}</option>
      </NativeSelect>
    </FormControl>
  );
}
