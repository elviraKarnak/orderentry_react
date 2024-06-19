import React from 'react'
import DatePicker from 'react-datepicker';

import Header from '../../common/Header';

import { Link, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fmiOrderSystemAppCustomerOrderList, fmiOrderSystemAppCustomerOrderStatusChange, fmiOrderSystemAppOrderItemStatusChange } from '../../utils/fetch';

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import moment from "moment";



function BuyerOrderList() {

    // const { userData } = useSelector(state => state.Auth);

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

    const orderStatusChange = (id, e) => {
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
                console.log(e.target.value);

                const payload = {
                    "orderItemId": id,
                    "status_val": e.target.value
                };

                var response = await fmiOrderSystemAppOrderItemStatusChange(payload);

                Swal.fire({
                    text: "Order item status change successfully.",
                    icon: "success"
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
                        {console.log(row.original.id, renderedCellValue)}
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            className={`dropdown  ${(renderedCellValue.toLowerCase()).replace(/\s/g, '')} ${renderedCellValue !== "new_order" && "prevent_click"}`}
                            value={renderedCellValue}
                            onChange={e => orderStatusChange(row.original.item_tbl_id, e)}
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
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: false,
        enableRowSelection: true,
        manualPagination: false,
        initialState: {
            showColumnFilters: true,
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
        },
    });

    const getOrderList = async () => {

        setIsLoading(true);

        console.log("pagination.pageIndex ", pagination.pageIndex)
        console.log("pagination.pageSize ", pagination.pageSize)

        const payload = {
            "customerId": "",
            "search_status": "",
            "order_from_date": "",
            "order_to_date": "",
            "page": "",
            "limit": "",
        };

        var response = await fmiOrderSystemAppCustomerOrderList(payload);
        //console.log(response)

        setorderData(response.result.results);
        setRowCount(response.result.totalRecord);
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