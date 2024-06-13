import React from 'react'
import Header from '../../common/Header';

import {useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { SatagingInventoryData } from '../../utils/Constant';
import Swal from 'sweetalert2'


function SatagingInventory() {


    //data and fetching state
    const [data, setorderData] = useState(SatagingInventoryData);
    const [isLoading, setIsLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    //table state
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const orderDefaultStatus = [
        { label: "Received", value: "received" },
        { label: "Pending", value: "pending" },
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const orderStatusChange = (id, e) => {
        console.log(id, e.target.value);

        Swal.fire({
            title: "Are you sure?",
            text: "You wan't to change order status!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5936eb",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {

                if (result.isConfirmed) {
                  const newData = data.map(item =>
                    item.id === id ? { ...item, status: e.target.value } : item
                  );
                  setorderData(newData);

                Swal.fire({
                    text: "Order status change successfully.",
                    icon: "success"
                });
            }

        });
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'awb',
                header: 'AWB#',
            },
            {
                accessorKey: 'farm',
                header: 'Farm',
            },
            {
                accessorKey: 'po',
                header: 'PO#',
            },
            {
                accessorKey: 'arrival',
                header: 'Arrival Date',
            },
            {
                accessorKey: 'boxes',
                header: 'Boxes',
            },
            {
                accessorKey: 'total',
                header: 'Total',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
                Cell: ({ renderedCellValue, row }) => (

                    <>
                        {/* {console.log(, renderedCellValue)} */}
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            className={`dropdown  ${renderedCellValue === "New order" ? "saved" : renderedCellValue.toLowerCase()}`}
                            value={renderedCellValue}
                            onChange={e => orderStatusChange(row.original.id, e)}
                        >
                            {orderDefaultStatus.map((v, i) => (
                                <MenuItem key={row.original.id} value={v.value}>{v.label}</MenuItem>
                            ))}
                        </Select>
                    </>
                ),
            },
        ], [orderDefaultStatus, orderStatusChange]);

    const table = useMaterialReactTable({
        columns,
        data:data,
        enableColumnFilterModes: false,
        enableColumnOrdering: false,
        enableGrouping: false,
        enableColumnPinning: false,
        enableFacetedValues: false,
        enableRowActions: false,
        enableRowSelection: true,
        manualPagination: false,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
            //   columnPinning: {
            //     left: ['mrt-row-expand', 'mrt-row-select'],
            //     right: ['mrt-row-actions'],
            //   },
        },
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
        },
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30],
            shape: 'rounded',
            variant: 'outlined',
        },
        onPaginationChange: setPagination,
        rowCount,
        state: {
            pagination,
            isLoading
        },
    });

    return (
        <div className='staginginventory_wrap'>
          <Header title='Staging Inventory'/>
            <div className="header_button_wrap">
            <Button className="sihb_add sihb_button" variant="contained">Add</Button>
            <Button className="sihb_transfer sihb_button" variant="contained">Transfer</Button>
            <Button className="sihb_received sihb_button" variant="contained">Received</Button>
            </div>
            <div classNameName="data_table-head">
                <div className="container-fluid">
                    <div className="view_order_table">
                        <MaterialReactTable table={table} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SatagingInventory