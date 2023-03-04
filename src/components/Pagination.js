import React from "react";
import CategorySelector from "./CategorySelector";
import Button from "@mui/material/Button";

const Pagination = (props) => {
  return (
    <div className="pagination">
      <div style={{ visibility: "hidden" }} id="emptyPadding">
        Padding
      </div>
      <div id="pageControl">
        <Button variant="outlined" id="prevBtn" onClick={props.onClick}>
          Prev
        </Button>
        <label id="pageNumber">{`${props.currentPage}/${props.totalPage}`}</label>
        <Button variant="outlined" id="nextBtn" onClick={props.onClick}>
          Next
        </Button>
      </div>
      <div>
        <CategorySelector onChange={props.onChange} />
      </div>
    </div>
  );
};

export default Pagination;
