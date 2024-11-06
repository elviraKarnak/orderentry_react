import React, { memo, useContext, useEffect, useMemo } from 'react';
import { userContext } from '../../../Store';
import placeholderImage from "../../../assests/images/placeholder.png";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from '@mui/material';
import ImageIcon from "@mui/icons-material/Image";
import EditIcon from "@mui/icons-material/Edit";
import UseFetchOrderProducts from '../hooks/UseFetchOrderProducts';


function OrderProductList({ ProductDataSearch, SelectCustomerData, DeliveryDate }) {


    const {
        data: fetchedproducts = [],
        isFetching: isFetching,
        isLoading: isLoading,
    } = UseFetchOrderProducts({ ProductDataSearch, SelectCustomerData, DeliveryDate });

    console.log("fetchedproducts ",fetchedproducts)




    // table column
    const columns = useMemo(
        () => [
            {
                accessorKey: "product_details.product_name",
                header: "Product",
                enableEditing: false,
                size: 30,
            },
            {
                accessorKey: "product_details.image_url",
                header: "Image",
                Header: () => (
                    <i style={{ color: "#aaa" }}>
                        <ImageIcon />
                    </i>
                ),
                enableEditing: false,
                Cell: ({ renderedCellValue }) => (
                    <img
                        src={renderedCellValue?.product_details?.image_url ? renderedCellValue.product_details.image_url : placeholderImage}
                        alt=""
                        style={{ width: "70px", height: "70px" }}
                    />
                ),
            },
            {
                accessorKey: "product_details.category_string",
                header: "Category",
                enableEditing: false,
            },
            {
                accessorKey: "product_details.color_string",
                header: "Color",
                enableEditing: false,
            },
            {
                accessorKey: "product_details.source",
                header: "Source",
                enableEditing: false,
            },
            {
                accessorKey: "product_details.cost_price",
                header: "Cost Price",
                enableEditing: false,
            },
            {
                accessorKey: "product_details.real_price",
                header: "Sale Price",
                enableEditing: false,
            },
            
        ], [ProductDataSearch, SelectCustomerData, DeliveryDate]);

    // product table setting //
    const table = useMaterialReactTable({
        columns: columns,
        data: fetchedproducts,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        manualPagination: false,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
        },
        enableEditing: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: {
            color: "error",
            children: "Error loading data",
        },
        muiTableContainerProps: {
            sx: {
                minHeight: "500px",
            },
        },
        muiEditRowDialogProps: {
            style: {
                width: "100%",
            },
            maxWidth: "md",
            fullWidth: true,
        },
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => console.log(table, row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),

        state: {
            isLoading: isLoading,
            showProgressBars: isFetching,
        },
    });


    useEffect(() => {
        console.log("fetchedproducts ", fetchedproducts);
    }, [fetchedproducts])

    return (
        <>
            <MaterialReactTable table={table} />
        </>
    )
}

export default OrderProductList;
