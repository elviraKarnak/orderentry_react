import React, { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from "material-react-table";
import FarmOrderItemList from "./FarmOrderItemList";

function FarmOrderList() {


    const columns = useMemo(
        () => [
            {
                accessorKey: "po_date",
                header: "PO Date",
            },
            {
                accessorKey: "po_number",
                header: "PO#",
            },
            {
                accessorKey: "awb_number",
                header: "AWB#",
            },
            {
                accessorKey: "inv_number",
                header: "Inv#",
            },
            {
                accessorKey: "inv_date",
                header: "Inv Date",
            },
            {
                accessorKey: "total_price",
                header: "Total Price",
            },
            {
                accessorKey: "status",
                header: "Status",
            },
        ],
        []
    );

    const farmListTable = useMaterialReactTable({
        columns: columns,
        data: [],
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: false,
        // enableSelectAll: true,
        // selectAllMode: 'page',
        getRowId: (row) => row.id,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
            columnVisibility: {
                id: false,
            },
        },
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        muiSearchTextFieldProps: {
            size: "small",
            variant: "outlined",
        },
        muiPaginationProps: {
            color: "secondary",
            rowsPerPageOptions: [10, 20, 30],
            shape: "rounded",
            variant: "outlined",
        },
        state: {
            // isLoading: stagingInventoryIsLoading,
            // showAlertBanner: stagingInventoryisError,
            // showProgressBars: stagingInventoryIsFetching,
            // rowSelection: rowSelection,
            // chooseStatus: chooseStatus,
            // allSelectCheckboxSelect: allSelectCheckboxSelect
        },
        renderDetailPanel: ({ row }) => (
            <FarmOrderItemList row={row} />
        ),
    });

    return (
        <>
            <MaterialReactTable table={farmListTable} />
        </>
    );
}

export default FarmOrderList;
