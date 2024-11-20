import React, { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from "material-react-table";
import FarmOrderItemList from "./FarmOrderItemList";
import { Box, IconButton, MenuItem, Select, Tooltip } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyIcon from '@mui/icons-material/Key';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { FARM_PURCHASE_STATUS } from "../../../utils/Constant";

const dummyData = [{
    checkout_cut_off_time: "12hrs 0 mins 0 secs",
    po_date: '20/11/2024',
    po_number: 1213434,
    awb_number: "",
    inv_number: "",
    inv_date: "",
    total_price: "",
    status: "new_order",
    orderItemDetails: [

    ]
}]

function FarmOrderList() {


    const columns = useMemo(
        () => [
            {
                accessorKey: "checkout_cut_off_time",
                header: "Checkout Cut Off",
                enableEditing: false
            },
            {
                accessorKey: "po_date",
                header: "PO Date",
                enableEditing: false
            },
            {
                accessorKey: "po_number",
                header: "PO#",
                enableEditing: false
            },
            {
                accessorKey: "awb_number",
                header: "AWB#",
                enableEditing: true,
                muiEditTextFieldProps: ({ cell, row }) => ({
                    type: 'text',
                    required: true,
                    onBlur: async (event) => {
                        console.log(row.original)
                        console.log(event.currentTarget.value);
                    },
                }),
            },
            {
                accessorKey: "inv_number",
                header: "Inv#",
                enableEditing: true,
                muiEditTextFieldProps: ({ cell, row }) => ({
                    type: 'text',
                    required: true,
                    onBlur: async (event) => {
                        console.log(row.original)
                        console.log(event.currentTarget.value);
                    },
                }),
            },
            {
                accessorKey: "inv_date",
                header: "Inv Date",
                enableEditing: true,
                muiEditTextFieldProps: ({ cell, row }) => ({
                    type: 'text',
                    required: true,
                    onBlur: async (event) => {
                        console.log(row.original)
                        console.log(event.currentTarget.value);
                    },
                }),
            },
            {
                accessorKey: "total_price",
                header: "Total Price",
                enableEditing: false
            },
            {
                accessorKey: "status",
                header: "Status",
                enableEditing: false,
                Cell: ({ renderedCellValue, row }) => {
                    return (<>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            className={`dropdown ${(row.original.status?.toLowerCase())?.replace(/\s/g, '')} `}
                            style={{
                                minWidth: 100,
                            }}
                            value={row.original.status}
                        // onChange={(e) => handleUserStatusChange(row.original.id, e.target.value)}
                        >
                            {FARM_PURCHASE_STATUS.map((v, i) => (
                                <MenuItem key={i} value={v.value}>{v.label}</MenuItem>
                            ))}
                        </Select>
                    </>);
                }
            },
        ],
        []
    );

    const farmListTable = useMaterialReactTable({
        columns: columns,
        data: dummyData,
        editDisplayMode: 'table',
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: false,
        enableEditing: true,
        // editDisplayMode: 'row',
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
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Upload Invoice">
                    <IconButton onClick={() => alert(1)}>
                        <FileUploadOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Download Labels">
                    <IconButton onClick={() => alert(2)}>
                        <FileDownloadOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    });

    return (
        <>
            <MaterialReactTable table={farmListTable} />
        </>
    );
}

export default FarmOrderList;
