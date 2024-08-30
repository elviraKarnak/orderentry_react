import React, {useEffect} from 'react';
import {useMemo, useState} from 'react';
//MRT Imports
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';
import {AccountCircle, Send} from '@mui/icons-material';
//import orderArray from '../oderview/orderArray';
import {getStagingInventoryList,SatagingInventoryItemStatusChange} from '../../utils/fetch';

import Header from '../../common/Header';
import Typography from '@mui/material/Typography';
import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import Swal from 'sweetalert2';

function SatagingInventory () {
  
  const SatagingInventoryDefaultStatus = [
    { label: "Pending", value: "pending" },
    { label: "Received", value: "received" },
    { label: "Transfer", value: "transfer" },
  ];

  /**
 * Fetch Products
 */
  function UsefetchStagingInventoryList () {
    return useQuery ({
      queryKey: ['products'],
      queryFn: async () => {
        const responce = await getStagingInventoryList ();
        // console.log("UsefetchStagingInventoryList ",responce.result.results);
        return responce.result.results;
      },
    });
  }

  const {
    data: stagingInventoryData = [],
    isError:stagingInventoryisError,
    isFetching:stagingInventoryIsFetching,
    isLoading:stagingInventoryIsLoading,
    refetch: stagingInventoryRefetch,
  } = UsefetchStagingInventoryList();

  const handleStatusChange = (item_id, status) => {
    // console.log(item_id, status);

    Swal.fire({
      title: "Are you sure?",
      text: "You wan't to change Sataging inventory status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5936eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
  }).then(async (result) => {

      if (result.isConfirmed) {
          // var status_selected_obj = orderDefaultStatus.filter((item) => item.label === e.target.value);
          // status_selected_obj = status_selected_obj[0];
          // console.log(e.target.value);

          // alert(item_id)

          const payload = {
              "item_id": item_id,
              "status": status
          };

          var response = await SatagingInventoryItemStatusChange(payload);

          Swal.fire({
              text: "Sataging Inventory item status change successfully.",
              icon: "success"
          });

          stagingInventoryRefetch();

      }
  });

  }
  

  const columns = useMemo (
    () => [
      {
        accessorKey: 'awb',
        header: 'AWB#',
        size: 150,
      },
      {
        accessorKey: 'farm',
        header: 'Farm',
        size: 150,
      },
      {
        accessorKey: 'po', //normal accessorKey
        header: 'PO#',
        size: 200,
      },
      {
        accessorKey: 'arrival',
        header: 'Arrival Date',
        size: 200,
          Cell: ({ renderedCellValue, row }) => (
            <>
				      {moment(renderedCellValue).format('DD/MM/YYYY')}
			      </>
          ),
      },
      {
        accessorKey: 'boxes', //normal accessorKey
        header: 'Boxes',
        size: 200,
      },
      {
        accessorKey: 'total',
        header: 'Total',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
    ],
    []
  );

      
  const orderListTable = useMaterialReactTable ({
    columns,
    data:stagingInventoryData,
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
    state: {
      isLoading: stagingInventoryIsLoading,
      showAlertBanner: stagingInventoryisError,
      showProgressBars: stagingInventoryIsFetching,
    },
    renderDetailPanel: ({row}) => (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category Color</TableCell>
              <TableCell>SO#</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Farm Price</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.original.awbReceiveDataItems.map (row => (
              <TableRow
                key={row.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.product_describtion}</TableCell>
                <TableCell>{row.image}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>#{row.so}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.farm_price}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>
                  {/* {row.status} */}
                  <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  variant="outlined"
                  size="small"
                  className={`dropdown`}
                >
                  {SatagingInventoryDefaultStatus.map(status => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ),
  });


  return (
    <div>
      <Header />

      <div>
        <Typography variant="h3" className="title">
          Staging Inventory
        </Typography>
      </div>
      <MaterialReactTable table={orderListTable} />
    </div>
  );
}

export default SatagingInventory;
