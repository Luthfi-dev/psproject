import React,{ useState , useEffect} from "react";
import ReactPaginate from 'react-paginate';

const Pagination =({props, onChange})=>{
  const handlePageClick = (event) => {
    onChange(event.selected+1)
  };
  return (
    <div className={'d-flex justify-content-md-end'}>
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
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          breakLinkClassName={'page-link'}
          pageCount={props?.pagination?.totalPage ? parseInt(props?.pagination?.totalPage) : 0}
          onPageChange={handlePageClick}
        />
    </div>
  )
}
export default Pagination;