import { Link, useMemo, useState } from 'react';
import {MaterialReactTable, useMaterialReactTable,} from 'material-react-table';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Header from '../../common/Header';

//nested data is ok, see accessorKeys in ColumnDef below
// const data = [
  
// ];

  function Orderdatatable() {
  //should be memoized or stable

      const [data, setorderData] = useState([
        {
          id:1,
          orderDate: '2021-9-21',
          orderNumber: '#123456789',
          customerName: 'Tony Foss',
          price: '$3,454.50',
          status:'Processing'
        },
        { id:2,
          orderDate: '2021-09-21',
          orderNumber: '#987654321',
          customerName: 'Alice Johnson',
          price: '$1,234.56',
          status: 'Purchased'
      },
      {
          id:3,
          orderDate: '2021-09-22',
          orderNumber: '#135792468',
          customerName: 'Bob Smith',
          price: '$2,345.67',
          status: 'Processing'
      },
      {
          id:4,
          orderDate: '2021-09-23',
          orderNumber: '#246813579',
          customerName: 'Charlie Brown',
          price: '$3,456.78',
          status: 'Confirmed'
      },
      {
          id:5,  
          orderDate: '2021-09-24',
          orderNumber: '#987654321',
          customerName: 'David Lee',
          price: '$4,567.89',
          status: 'Canceled'
      },
      {
          id:6,  
          orderDate: '2021-09-25',
          orderNumber: '#123456789',
          customerName: 'Eve Wilson',
          price: '$5,678.90',
          status: 'Processing'
      }
      ]);
      const orderDefaultStatus = ['Saved','Processing','Purchased','Confirmed','Printed', 'Canceled']
      
        const orderStatusChange = (id, e) => {
        const newData = data.map(item =>
            item.id === id ? { ...item, status: e.target.value } : item
          );
          setorderData(newData);
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
              <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              className={'dropdown '+ renderedCellValue.toLowerCase()}
              value={renderedCellValue}
              onChange={e => orderStatusChange(row.original.id, e)}
              >
               {orderDefaultStatus.map((v,i)=>(  
               <MenuItem key={i} value={v}>{v}</MenuItem>
              ))}

              </Select>
            ),
          },
          {
            accessorKey: 'id',
            header: 'Action',
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
      });

    return (<div className="view_order_table"><MaterialReactTable  table={table} /></div>);
};

export default Orderdatatable