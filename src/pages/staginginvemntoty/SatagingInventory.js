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

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';




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
import { object } from 'yup';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../redux/reducers/Common';
// import { QueryClient } from 'react-query';

function SatagingInventory() {

  const dispatch=useDispatch();

  const [rowSelection, setRowSelection] = useState({});
  const [allSelectCheckboxSelect, setAllSelectCheckboxSelect] = useState(false);
  const [dialogShow, setDialogShow] = useState(false);
  const [chooseStatus, setChooseStatus] = useState('');

  // const queryClient = new Q

  const handleOpenModal = (rowId) => {
    // setSelectedRowId(rowId);
    setDialogShow(true);
  };

  const handleDialogClose = () => {
    setDialogShow(false);
  };


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


  const rowCheckBoxSelect = (orderListTable, status) => {

    var selectedRowsOnPage = orderListTable.getPaginationRowModel().rows.reduce((acc, row) => {
      if (row.original.status === status && row.original.awb !== null) {
        acc[row.original.id] = true;
      }
      return acc;
    }, {});


    // console.log("selectedRowsOnPage(received) ", selectedRowsOnPage);

    if (Object.keys(selectedRowsOnPage).length === 0) {
      Swal.fire({
        icon: "error",
        title: `No entries found that has status "${status}".`,
      });

    } else {
      setRowSelection(selectedRowsOnPage);
      setAllSelectCheckboxSelect(true);

      setChooseStatus(status);

    }


  }


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
    columns:columns,
    data: stagingInventoryData,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: false,
    enableSelectAll: true,
    selectAllMode: 'page',
    getRowId: (row) => row.id,
    enableRowSelection: (row) => {
      if (chooseStatus === '') {
        return row.original.status !== "transferred";
      } else {
        return row.original.status !== "transferred" && row.original.status === chooseStatus;
      }
    },
    // enableBatchRowSelection: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnVisibility: {
        id: false,
      },
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
      rowSelection: rowSelection,
      chooseStatus: chooseStatus,
      allSelectCheckboxSelect: allSelectCheckboxSelect
    },
    

    onRowSelectionChange: setRowSelection,

    muiSelectCheckboxProps: ({ row }) => ({
      
      checked: rowSelection[row.id] || false,

      disabled: ((chooseStatus === "")
        ? (row.original.status === "transferred") || (row.original.awb === null)
        : (row.original.status !== chooseStatus) || (row.original.awb === null)),

      onChange: (event) => {

        if (event.target.checked) {

          setRowSelection((prevSelection) => ({
            ...prevSelection,
            [row.id]: true,
          }));

          setChooseStatus(row.original.status);

        } else {

          setRowSelection((prevSelection) => {
            const updatedSelection = { ...prevSelection };
            delete updatedSelection[row.id];
            return updatedSelection;
          });

        }
      },
    }),

    muiSelectAllCheckboxProps: {
      checked: allSelectCheckboxSelect,
      onChange: (event) => {
        if (event.target.checked) {
          // console.log("Select All checked", event.target.checked);

          ///////////////////////////////////////
          Swal.fire({
            icon: "question",
            title: "Please click Pending or Received button to select all the Pending or Received entries.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Pending",
            denyButtonText: "Received",
            denyButtonColor:"#FFA500"
          }).then((result) => {
            /* received result */
            if (result.isConfirmed) {

              rowCheckBoxSelect(orderListTable, "pending");

            }
            /* transferred result */
            else if (result.isDenied) {

              rowCheckBoxSelect(orderListTable, "received");

            }
          });
          /////////////////////////////////////////


        } else {
          console.log("Select All unchecked", event.target.checked);
          setRowSelection({});
          setAllSelectCheckboxSelect(false);
          setChooseStatus('');
        }
      },
    },


    // muiTableBodyRowProps: ({ row }) => ({
    //   sx: {
    //     pointerEvents: row.original.status === "transferred" ? "none" : "auto",
    //     opacity: row.original.status === "transferred" ? 0.5 : 1,
    //   },
    // }),

    muiTableBodyCellProps: ({ cell, row }) => ({
      ...(cell.column.id === "mrt-row-select" &&
        row.original.status === "transferred" && {
        onClick: (e) => e.stopPropagation(),
      }),
    }),

    renderDetailPanel: ({ row }) => (
      <SatagingInventoryItemDetails row={row} stagingInventoryRefetch={stagingInventoryRefetch} />
    ),


    renderTopToolbar: ({ table }) => {

      const handleStatus = async (status) => {


        console.log("rowSelection: ", rowSelection)


        var temp_id_array = [];
        table.getSelectedRowModel().flatRows.map((row) => {
          temp_id_array.push(row.getValue('id'))
        });
        console.log(temp_id_array)
        // alert(status)

        const response = await SatagingInventoryItemBlukStatusChange({
          "item_ids": temp_id_array,
          "status": status
        });

        console.log(response);

        if (response.result.status) {
          Swal.fire({
            text: "Status Change successfully.",
            icon: "success",
          });
        } else {

          Swal.fire({
            text: response.result.status.msg,
            icon: "error",
          });

        }


        setRowSelection({});
        stagingInventoryRefetch();

      };


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

              {chooseStatus === 'pending' &&
                <Button
                  sx={{
                    backgroundColor:"#FFA500"
                  }}
                  onClick={() => handleStatus('received')}
                  variant="contained"
                >
                  Received
                </Button>}

              {chooseStatus === 'received' &&
                <Button
                  color="success"
                  onClick={() => handleStatus('transferred')}
                  variant="contained"
                >
                  Transferred
                </Button>}

            </Box>
          </Box>
        </Box>
      );

    }


  });


  useEffect(()=>{
    dispatch(commonActions.setPageTitle(""));
  },[])

  useEffect(() => {

    // console.log("rowSelection: ", rowSelection);
    // console.log("allSelectCheckboxSelect: ", allSelectCheckboxSelect);
    // console.log("Object.keys(rowSelection).length ",Object.keys(rowSelection).length );

    /** when all rows are unselected, then use this (CLEAR SECTION) button hit */
    if (Object.keys(rowSelection).length === 0) {
      setChooseStatus('');
      setAllSelectCheckboxSelect(false);
    }

    if (Object.keys(rowSelection).length > 1) {
      setAllSelectCheckboxSelect(true);
    }

  }, [rowSelection])


  return (<>
    <div className='container'>
      <div className='row'>

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

    {/* Dialog for Editing Product */}
    <Dialog open={dialogShow} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        {/* Render product details or form fields */}
        hiiii
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleDialogClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </>);
}

export default SatagingInventory;
