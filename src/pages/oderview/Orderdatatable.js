import { Link, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DatePicker from 'react-datepicker';

//import Header from '../../common/SuperAdminHeader';
import { fmiOrderSystemAppOrderList, fmiOrderSystemAppOrderStatusChange } from '../../utils/fetch';

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

import moment from "moment";

//nested data is ok, see accessorKeys in ColumnDef below
// const data = [

// ];

function Orderdatatable() {

  const [FromDate, setFromDate] = useState(null);
  const [ToDate, setToDate] = useState(null);

  //should be memoized or stable

  const navigate = useNavigate();

  //data and fetching state
  const [data, setorderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // const orderDefaultStatus = ['New Order', 'Processing', 'Purchased', 'Confirmed', 'Printed', 'Canceled']
  const orderDefaultStatus = [
    { label: "New Order", value: "new_order" },
    { label: "Processing", value: "processing" },
    { label: "Purchased", value: "purchased" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Printed", value: "printed" },
    { label: "Canceled", value: "canceled" },
  ]

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
        // var status_selected_obj = orderDefaultStatus.filter((item) => item.label === e.target.value);
        // status_selected_obj = status_selected_obj[0];
        console.log(e.target.value);
      
        const payload = {
          "orderId": id,
          "wp_order": "no",
          "status_val": e.target.value
        };

        var response = await fmiOrderSystemAppOrderStatusChange(payload);

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
        accessorKey: 'customerName', //normal accessorKey
        header: 'Customer',
        size: 200,
      },
      {
        accessorKey: 'price',
        header: 'Amount',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        Cell: ({ renderedCellValue, row }) => (

          <>
            {console.log(row.original.id, renderedCellValue)}
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              className={'dropdown ' + renderedCellValue.toLowerCase()}
              value={renderedCellValue}
              onChange={e => orderStatusChange(row.original.id, e)}
            >
              {orderDefaultStatus.map((v, i) => (
                <MenuItem key={i} value={v.value}>{v.label}</MenuItem>
              ))}

            </Select>
          </>
        ),
      },
      {
        accessorKey: 'id',
        header: 'Action',
        columnDefType: 'display',
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Button variant="text" value={renderedCellValue}>Edit</Button>|
            <Button variant="text" value={renderedCellValue}>Cancel</Button>
            <Button variant="text" onClick={() => navigate("/order-details", { state: { order_id: row.original.id } })}>View</Button>
          </Box>


        ),
      }
    ],
    [],
  );

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
    state: {
			pagination,
			isLoading:isLoading,
      showProgressBars: isLoading,
		},
  });





  const getOrderList = async () => {

    setIsLoading(true);

    const payload = {};

    var response = await fmiOrderSystemAppOrderList(payload);

    var newData = response.results.map((item) => ({
      id: item.order_id,
      orderDate: item.order_date,
      orderNumber: `#${item.order_number}`,
      customerName: item.customer_name,
      price: `$${item.amount}`,
      status: item.order_status
    }))


    setorderData(newData);
    setRowCount(response.totalRecord);
    // setPagination({ ...pagination, pageIndex: pagination.pageIndex })

    // console.log("first ",response)
    setIsLoading(false);

  }




  const handleFromDateChange = (dates) => {
    setFromDate(dates);
    console.log("dates ", dates)
  };


  const handleToDateChange = (dates) => {
    setToDate(dates);
    console.log("dates ", dates)
  };

  useEffect(() => {
    getOrderList();
    // console.log(orderData)
  }, []);

  return (<div className="view_order_table">
    <MaterialReactTable table={table} />
  </div>);
};

export default Orderdatatable;