import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton
} from 'material-react-table';

//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from '@mui/material';



import { AccountCircle, Send } from '@mui/icons-material';
//import orderArray from '../oderview/orderArray';
import { getStagingInventoryList, SatagingInventoryItemBlukStatusChange, SatagingInventoryItemStatusChange } from '../../utils/fetch';

import Header from '../../common/Header';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Swal from 'sweetalert2';
import { SatagingInventoryDefaultStatus } from '../../utils/Constant';
import SatagingInventoryItemDetails from './components/SatagingInventoryItemDetails';
import ProductEntry from './components/ProductEntry';
// import { QueryClient } from 'react-query';

function SatagingInventory() {

  // const queryClient = new Q



  /**
   * Fetch Products
   */
  function UsefetchStagingInventoryList() {
    return useQuery({
      queryKey: ['products'],
      queryFn: async () => {
        const responce = await getStagingInventoryList();
        // console.log("UsefetchStagingInventoryList ",responce.result.results);
        return responce.result.results;
      },
    });
  }

  const {
    data: stagingInventoryData = [],
    isError: stagingInventoryisError,
    isFetching: stagingInventoryIsFetching,
    isLoading: stagingInventoryIsLoading,
    refetch: stagingInventoryRefetch,
  } = UsefetchStagingInventoryList();




  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'awb',
        header: 'AWB#',
        size: 150,
      },
      // {
      //   accessorKey: 'farm',
      //   header: 'Farm',
      //   size: 150,
      // },
      // {
      //   accessorKey: 'po', //normal accessorKey
      //   header: 'PO#',
      //   size: 200,
      // },
      // {
      //   accessorKey: 'arrival_date',
      //   header: 'Arrival Date',
      //   size: 200,
      //   Cell: ({ renderedCellValue, row }) => (
      //     <>
      //       {moment(renderedCellValue).format('DD/MM/YYYY')}
      //     </>
      //   ),
      // },
      // {
      //   accessorKey: 'boxes', //normal accessorKey
      //   header: 'Boxes',
      //   size: 200,
      // },
      // {
      //   accessorKey: 'total',
      //   header: 'Total',
      //   size: 150,
      // },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <>
            {renderedCellValue && moment(renderedCellValue.date).format('DD/MM/YYYY HH:mm:ss')}
          </>
        ),
      },
      {
        accessorKey: "total_records",
        header: 'Total Records',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <>
            {renderedCellValue === 'pending' && 'Pending'}
            {renderedCellValue === 'received' && 'Received'}
            {renderedCellValue === 'transferred' && 'Transfer'}
          </>
        ),
      },
    ],
    []
  );


  const orderListTable = useMaterialReactTable({
    columns,
    data: stagingInventoryData,
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
    initialState: {
      columnVisibility: {
        id: false, // Hide the 'id' column initially
      },
    },
    renderDetailPanel: ({ row }) => (
      <SatagingInventoryItemDetails row={row} stagingInventoryRefetch={stagingInventoryRefetch} />
    ),
    renderTopToolbar: ({ table }) => {

      const handleStatus = async(status) => {

        var temp_id_array = [];
        table.getSelectedRowModel().flatRows.map((row) => {
          temp_id_array.push(row.getValue('id'))
        });
        console.log(temp_id_array)
        // alert(status)

        const response=await SatagingInventoryItemBlukStatusChange({
          "item_ids": temp_id_array,
          "status": status
        });

        console.log(response);

        stagingInventoryRefetch();

      };

      // const handleActivate = () => {
      //   table.getSelectedRowModel().flatRows.map((row) => {
      //     alert('activating ' + row.getValue('name'));
      //   });
      // };

      // const handleContact = () => {
      //   table.getSelectedRowModel().flatRows.map((row) => {
      //     alert('contact ' + row.getValue('name'));
      //   });
      // };

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
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={() => handleStatus('received')}
                variant="contained"
              >
                Received
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={() => handleStatus('transferred')}
                variant="contained"
              >
                Transfered
              </Button>
              {/* <Button
                color="info"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="contained"
              >
                Contact
              </Button> */}
            </Box>
          </Box>
        </Box>
      );

    }
  });


  return (
    <div className='container'>
      <div className='row'>

        <div className='col-sm-12'>
          <Header />
        </div>

        <div className='col-sm-12'>
          <ProductEntry stagingInventoryRefetch={stagingInventoryRefetch} />
        </div>

        <div className='col-sm-12'>
          <Typography variant="h4" className="title">
            Staging Inventory List
          </Typography>
        </div>

        <div className='col-sm-12'>
          <MaterialReactTable
            table={orderListTable}
          />
        </div>
      </div>
    </div>
  );
}

export default SatagingInventory;
