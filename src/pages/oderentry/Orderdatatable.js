import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    orderDate: '2021-9-21',
    orderNumber: '#123456789',
    customerName: 'Tony Foss',
    price: '$3,454.50',
    status:'Confirmed'
  },
  {
    orderDate: '2021-09-21',
    orderNumber: '#987654321',
    customerName: 'Alice Johnson',
    price: '$1,234.56',
    status: 'Pending'
},
{
    orderDate: '2021-09-22',
    orderNumber: '#135792468',
    customerName: 'Bob Smith',
    price: '$2,345.67',
    status: 'Processing'
},
{
    orderDate: '2021-09-23',
    orderNumber: '#246813579',
    customerName: 'Charlie Brown',
    price: '$3,456.78',
    status: 'Shipped'
},
{
    orderDate: '2021-09-24',
    orderNumber: '#987654321',
    customerName: 'David Lee',
    price: '$4,567.89',
    status: 'Delivered'
},
{
    orderDate: '2021-09-25',
    orderNumber: '#123456789',
    customerName: 'Eve Wilson',
    price: '$5,678.90',
    status: 'Completed'
}
];

const Orderdatatable = () => {
  //should be memoized or stable
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
        Cell: ({ cell }) => (
          cell.getValue()
        ),
      },
      {
        accessorKey: 'null',
        header: 'Action',
        size: 150,
        Cell: ({ cell }) => (
         "Delete"
        ),
      }
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default Orderdatatable


