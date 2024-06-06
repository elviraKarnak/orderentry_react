import React from 'react'
import { useMemo, useState } from 'react';
//MRT Imports
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
  
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';
import Typography from '@mui/material/Typography';
import orderArray from './orderArray';

import Header from '../../common/Header';

function OrderList() {
  
    const [data, setOrderDetails] = useState(orderArray);
    const columns = useMemo(
        () => [
            {
                accessorKey: 'orderDate', //access nested data with dot notation
                header: 'Date',
                size: 150,
              },
              {
                accessorKey: 'orderNumber',
                header: 'Order Number',
                size: 150,
              },
              {
                accessorKey: 'companyName', //normal accessorKey
                header: 'Company Name',
                size: 200,
              },
              {
                accessorKey: 'deliveryDate', //normal accessorKey
                header: 'Delivery Date',
                size: 200,
              },
              {
                accessorKey: 'salesRep', //normal accessorKey
                header: 'Sales Rep',
                size: 200,
              },
              {
                accessorKey: 'total',
                header: 'Total',
                size: 150,
              }
        ],
        [],
      );
     
      const orderListTable = useMaterialReactTable({
        columns,
        data, 
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: false,
        enableRowSelection: true,
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
        renderDetailPanel: ({ row }) => (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Is Preorder</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Margin</TableCell>
                        <TableCell>Unit Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {row.original.products.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.preorder}</TableCell>
                    <TableCell>{row.source}</TableCell>
                    <TableCell>{row.margin}</TableCell>
                    <TableCell>{row.unitCost}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>   
        </TableContainer>
        )
      });

    return (<> 
    <Header/>
    <div><Typography variant="h3" className="title">Order List</Typography></div>
    <MaterialReactTable table={orderListTable} /></>);
  
}

export default OrderList