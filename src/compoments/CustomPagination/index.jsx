import React from 'react'
import Pagination from "react-js-pagination";

function Index(props) {

    // console.log(props)

    return (

        <Pagination
            activePage={props.othersOption.activePage}
            itemsCountPerPage={props.othersOption.itemsCountPerPage}
            totalItemsCount={props.othersOption.totalItemsCount}
            pageRangeDisplayed={props.othersOption.pageRangeDisplayed}
            onChange={props.handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
        />

    )
}

export default Index