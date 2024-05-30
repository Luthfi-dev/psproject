import React,{ useState , useEffect} from "react";
import ReactPaginate from 'react-paginate';

const Pagination =(props)=>{
  const handlePageClick = (event) => {
    props.changePage(event.selected);
  };
  return (
    <>
    <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
      <div className="dataTables_length">
        <label>
          <select  className="form-select form-select-sm form-select-solid" onChange={(e)=>{
            props.changeLength(e.target.value)
          }}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>
      <div className="dataTables_info text-muted"  aria-live="polite">Rows Per Page</div>
    </div>

    <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          containerClassName={'pagination pagination-outline'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          breakClassName={'page-item'}
          activeClassName={'active'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          breakLinkClassName={'page-link'}
          initialPage={0}
          pageCount={props.pagination.totalPage}
          onPageChange={handlePageClick}
        />
    </div>
    </>
  )
}
export default Pagination;