import React from 'react'
import DatePicker from 'react-datepicker';


import { Link, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fmiOrderSystemAppCustomerOrderList, fmiOrderSystemAppCustomerOrderStatusChange } from '../../utils/fetch';

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import moment from "moment";



export function BuyerOrderList() {

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

    // const orderDefaultStatus = ['Saved', 'Processing', 'Purchased', 'Confirmed', 'Printed', 'Canceled']
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const orderDefaultStatus = [
        { label: "New order", value: "1" },
        { label: "Processing", value: "2" },
        { label: "Purchased", value: "3" },
        { label: "Confirmed", value: "4" },
        { label: "Printed", value: "5" },
        { label: "Canceled", value: "6" },
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const orderStatusChange = (id, e) => {
        // console.log(id, e.target.value);

        // const newData = data.map(item =>
        //   item.id === id ? { ...item, status: e.target.value } : item
        // );
        // setorderData(newData);

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
                var status_selected_obj = orderDefaultStatus.filter((item) => item.label === e.target.value);
                status_selected_obj = status_selected_obj[0];
                console.log(status_selected_obj);


                const payload = {
                    "Id": id,
                    "status_val": status_selected_obj.value
                };

                var response = await fmiOrderSystemAppCustomerOrderStatusChange(payload);

                Swal.fire({
                    text: "Order status change successfully.",
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
                accessorKey: 'so',
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
                accessorKey: 'order_status',
                header: 'Status',
                size: 150,
                Cell: ({ renderedCellValue, row }) => (

                    <>
                        {console.log(row.original.id, renderedCellValue)}
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            className={`dropdown  ${renderedCellValue === "New order" ? "saved" : renderedCellValue.toLowerCase()}`}
                            value={renderedCellValue}
                            onChange={e => orderStatusChange(row.original.item_tbl_id, e)}
                        >
                            {orderDefaultStatus.map((v, i) => (
                                <MenuItem key={i} value={v.label}>{v.label}</MenuItem>
                            ))}
                        </Select>
                    </>
                ),
            },
        ], [orderDefaultStatus, orderStatusChange]);






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
        manualPagination: true,
        initialState: {
            showColumnFilters: true,
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





    const getOrderList = async () => {

        setIsLoading(true);

        console.log("pagination.pageIndex ", pagination.pageIndex)
        console.log("pagination.pageSize ", pagination.pageSize)

        const payload = {
            "customer_name": "",
            "search_status": "",
            "order_from_date": FromDate !== null ? moment(FromDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)').format('YYYY-MM-DD') : "",
            "order_to_date": ToDate !== null ? moment(ToDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)').format('YYYY-MM-DD') : "",
            "orderId": "",
            "customerId": 2,
            "page": (pagination.pageIndex + 1),
            "limit": pagination.pageSize
        };

        var response = await fmiOrderSystemAppCustomerOrderList(payload);

        // var newData = response.results.map((item) => ({
        //     id: item.order_id,
        //     orderDate: item.order_date,
        //     orderNumber: `#${item.order_number}`,

        //     customerName: item.customer_name,
        //     price: `$${item.amount}`,
        //     status: item.order_status
        // }))

        console.log(response)

        setorderData(response.result.results);
        setRowCount(response.result.totalRecord);
        // setPagination({ ...pagination, pageIndex: pagination.pageIndex })

        // console.log("first ",response)
        setIsLoading(false);

    }


    const handleFromDateChange = (dates) => {
        // const [start, end] = dates;
        // setStartDate(start);
        // setEndDate(end);

        setFromDate(dates);

        console.log("dates ", dates)

        // // Filter data based on selected date range
        // const filteredData = tableData.filter(item => {
        //   const itemDate = new Date(item.date); // Assuming 'date' is the date field in your data
        //   return (!start || itemDate >= start) && (!end || itemDate <= end);
        // });

        // // Update table with filtered data
        // setTableData(filteredData);
    };


    const handleToDateChange = (dates) => {
        // const [start, end] = dates;
        // setStartDate(start);
        // setEndDate(end);

        setToDate(dates);

        console.log("dates ", dates)

        // // Filter data based on selected date range
        // const filteredData = tableData.filter(item => {
        //   const itemDate = new Date(item.date); // Assuming 'date' is the date field in your data
        //   return (!start || itemDate >= start) && (!end || itemDate <= end);
        // });

        // // Update table with filtered data
        // setTableData(filteredData);
    };

    useEffect(() => {
        getOrderList();
        // console.log(orderData)
    }, [pagination.pageIndex, pagination.pageSize, FromDate, ToDate]);


    return (
        <div>
            {/* from date */}
            <DatePicker
                selected={FromDate}
                onChange={handleFromDateChange}
                startDate={FromDate}
                placeholderText='Date From'
            />
            {/* to date */}
            <DatePicker
                selected={ToDate}
                onChange={handleToDateChange}
                startDate={ToDate}
                placeholderText='Date To'
            />

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