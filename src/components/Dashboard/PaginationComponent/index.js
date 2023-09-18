import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import "./style.css"

function PaginationComponent({ page, handlePageChange }) {
    return (
      <div
        className="pagination-div"
        style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
      >
        <Pagination
          count={10}
          page={page}
          onChange={(e,value)=>handlePageChange(e, value)}
          sx={{
            color: "#fff",
            "& .Mui-selected , .Mui-selected:hover": {
              backgroundColor: "var(--grey) !important",
              color: "var(--white) !important",
              borderColor: "var(--white) !important",
            },
  
            "& .MuiPaginationItem-ellipsis": {
              border: "0px solid var(--grey) !important",
            },
            "& .MuiPaginationItem-text": {
              color: "var(--white)",
              border: "1px solid #333",
            },
          }}
        />
      </div>
    );
  }
  
  export default PaginationComponent;