import React, { useContext } from "react";
import { Pagination } from '@mantine/core';

export default function PaginationSettings(props){

    return(
        <>
         <Pagination
            itemsPerPage={props.itemsPerPage}
            total={props.total}
            onChange={(newPage) => props.setCurrentPage(newPage)}
            withPagesCount
          />
        </>
    )
}