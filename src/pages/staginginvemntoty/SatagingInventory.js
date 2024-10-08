import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
//MRT Imports
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';


import { AccountCircle, Send } from '@mui/icons-material';
//import orderArray from '../oderview/orderArray';
import { getStagingInventoryList, SatagingInventoryItemStatusChange } from '../../utils/fetch';

import Header from '../../common/Header';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Swal from 'sweetalert2';
import { SatagingInventoryDefaultStatus } from '../../utils/Constant';
import SatagingInventoryItemDetails from './components/SatagingInventoryItemDetails';
import ProductEntry from './components/ProductEntry';

function SatagingInventory() {



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
            {moment(renderedCellValue.date).format('DD/MM/YYYY HH:mm:ss')}
          </>
        ),
      },
      {
        accessorKey:"total_records",
        header: 'Total Records',
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
    renderDetailPanel: ({ row }) => (
      <SatagingInventoryItemDetails row={row} stagingInventoryRefetch={stagingInventoryRefetch} />
    ),
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
          <MaterialReactTable table={orderListTable} />
        </div>
      </div>
    </div>
  );
}

export default SatagingInventory;
