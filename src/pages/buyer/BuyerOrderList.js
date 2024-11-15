import React from 'react'
import DatePicker from 'react-datepicker';

import Header from '../../common/Header';

import { Link, useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton
} from 'material-react-table';
import Select from '@mui/material/Select';
import { fmiOrderSystemAppCustomerOrderList, fmiOrderSystemAppCustomerOrderStatusChange, fmiOrderSystemAppOrderDetailsList, fmiOrderSystemAppOrderItemStatusChange } from '../../utils/fetch';

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import moment from "moment";

import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
    lighten,
} from '@mui/material';

const disabledStatus = ["purchased", "canceled"];


function BuyerOrderList() {

    // const { userData } = useSelector(state => state.Auth);

    const [rowSelection, setRowSelection] = useState({});

    const navigate = useNavigate();

    const [FromDate, setFromDate] = useState(null);
    const [ToDate, setToDate] = useState(null);

    //data and fetching state
    const [data, setorderData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    //table state
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });


    const orderDefaultStatus = [
        { label: "New Order", value: "new_order" },
        { label: "Purchased", value: "purchased" },
        { label: "Canceled", value: "canceled" },
    ]

    const orderStatusChange = (id, status) => {
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
                // var status_selected_obj = orderDefaultStatus.filter((item) => item.label === e.target.value);
                // status_selected_obj = status_selected_obj[0];
                

                const payload = {
                    "orderItemId": [id],
                    "status_val": status
                };

                var response = await fmiOrderSystemAppOrderItemStatusChange(payload);

                Swal.fire({
                    text: "Order item status change successfully.",
                    icon: "success"
                });

                setRowSelection((prevSelection) => {
                    const updatedSelection = { ...prevSelection };
                    delete updatedSelection[id];
                    return updatedSelection;
                });

                getOrderList();

            }
        });
    };




    const columns = useMemo(
        () => [
            {
                accessorKey: 'order_date', //access nested data with dot notation
                header: 'Shipping Date',
            },
            {
                accessorKey: 'order_number',
                header: 'SO#',
            },
            {
                accessorKey: 'company',
                header: 'Company',
            },
            {
                accessorKey: 'productTitle',
                header: 'Product Description',
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'color',
                header: 'Color',
            },
            {
                accessorKey: 'sale_price',
                header: 'Sale Price',
            },
            {
                accessorKey: 'item_quantity',
                header: 'QTY',
            },
            {
                accessorKey: 'uom',
                header: 'UOM',
            },
            {
                accessorKey: 'total_price',
                header: 'Total',
            },
            {
                accessorKey: 'farm',
                header: 'Farm',
            },
            {
                accessorKey: 'cost_price',
                header: 'Cost',
            },
            {
                accessorKey: 'margin',
                header: 'Margin',
            },
            {
                accessorKey: 'order_item_status',
                header: 'Status',
                size: 150,
                Cell: ({ renderedCellValue, row }) => (

                    <>
                        {/* {console.log(row.original.item_tbl_id, " ", renderedCellValue, " :renderedCellValue")} */}

                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            className={`dropdown  ${(row.original.order_item_status?.toLowerCase())?.replace(/\s/g, '')} ${(disabledStatus.includes(row.original.order_item_status)) && "prevent_click"}`}
                            value={row.original.order_item_status}
                            onChange={e => orderStatusChange(row.original.item_tbl_id, e.target.value)}
                        >
                            {orderDefaultStatus.map((v, i) => (
                                <MenuItem key={i} value={v.value}>{v.label}</MenuItem>
                            ))}
                        </Select>
                    </>
                ),
            },
        ], []);

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableColumnPinning: true,
        enableGrouping: true,
        enableFacetedValues: true,
        enableRowActions: false,
        manualPagination: false,

        getRowId: (row) => row.item_tbl_id,
        enableRowSelection: (row) => !(disabledStatus.includes(row.original.order_item_status)),
        enableSelectAll: true,
        selectAllMode: 'page',
        onRowSelectionChange: setRowSelection,
        muiSelectCheckboxProps: ({ row }) => ({

            checked: rowSelection[row.id] || false,

            disabled: disabledStatus.includes(row.original.order_item_status),

            onChange: (event) => {

                if (event.target.checked) {

                    setRowSelection((prevSelection) => ({
                        ...prevSelection,
                        [row.id]: true,
                    }));

                } else {

                    setRowSelection((prevSelection) => {
                        const updatedSelection = { ...prevSelection };
                        delete updatedSelection[row.id];
                        return updatedSelection;
                    });

                }
            },
        }),
        muiTableBodyCellProps: ({ cell, row }) => ({
            ...(cell.column.id === "mrt-row-select" &&
                disabledStatus.includes(row.original.order_item_status) && {
                onClick: (e) => e.stopPropagation(),
            }),
        }),
        renderTopToolbar: ({ table }) => {


            const handleStatus = async (status) => {
                console.log("rowSelection: ", rowSelection)

                var temp_id_array = [];
                table.getSelectedRowModel().flatRows.map((row) => {
                    temp_id_array.push(row.original.item_tbl_id)
                });

                console.log(temp_id_array)

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

                        const payload = {
                            "orderItemId": temp_id_array,
                            "status_val": status
                        };

                        var response = await fmiOrderSystemAppOrderItemStatusChange(payload);

                        Swal.fire({
                            text: "Order item status change successfully.",
                            icon: "success"
                        });

                        getOrderList();

                    }
                });
            }

            return (
                <Box
                    sx={(theme) => ({
                        backgroundColor: lighten(theme.palette.background.default, 0.05),
                        display: 'flex',
                        gap: '0.5rem',
                        p: '8px',
                        justifyContent: 'space-between',
                    })}
                >
                    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <MRT_GlobalFilterTextField table={table} />
                        <MRT_ToggleFiltersButton table={table} />
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>


                            <Button
                                sx={{
                                    backgroundColor: "#a54ccb"
                                }}
                                disabled={!table.getIsSomeRowsSelected()}
                                onClick={() => handleStatus('purchased')}
                                variant="contained"
                            >
                                Purchased
                            </Button>


                            <Button
                                color="error"
                                disabled={!table.getIsSomeRowsSelected()}
                                onClick={() => handleStatus('cancelled')}
                                variant="contained"
                            >
                                Canceled
                            </Button>


                        </Box>
                    </Box>
                </Box>
            );
        },

        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
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
        state: {
            isLoading,
            showProgressBars: isLoading,
            rowSelection
        },
    });

    const getOrderList = async () => {

        setIsLoading(true);

        console.log("pagination.pageIndex ", pagination.pageIndex)
        console.log("pagination.pageSize ", pagination.pageSize)

        const payload = {
            "orderId": "",
            "category_name": "",
            "product_name": "",
            "farm_name": "",
            "customer_name": "",
            "search_order_status": "processing",
            "search_order_item_status": "",
            "order_from_date": "",
            "order_to_date": "",
            "page": "",
            "limit": ""
        };

        var response = await fmiOrderSystemAppOrderDetailsList(payload);
        //console.log(response)

        setorderData(response.results);
        // setRowCount(response.result.totalRecord);
        setIsLoading(false);

    }

    useEffect(() => {
        getOrderList();
        // console.log(orderData)
    }, []);


    return (
        <div>
            <Header title="Order List" />

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

export default BuyerOrderList