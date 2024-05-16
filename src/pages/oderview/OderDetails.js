import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


import Header from '../../common/Header';
import { fmiOrderSystemAppOrderDetailsList, fmiOrderSystemAppOrderList, fmiOrderSystemAppOrderStatusChange } from '../../utils/fetch';

import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Typography } from '@mui/material';



function OderDetails() {

	const navigate = useNavigate();
	const location = useLocation();

	//data and fetching state
	const [data, setorderData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [rowCount, setRowCount] = useState(0);

	//table state
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const orderDefaultStatus = ['Saved', 'Processing', 'Purchased', 'Confirmed', 'Printed', 'Canceled']
	// const orderDefaultStatus = [
	// 	{ label: "Saved", value: "1" },
	// 	{ label: "Received", value: "2" },
	// 	{ label: "Shipped", value: "3" },
	// ]

	const orderStatusChange = (id, e) => {
		// console.log(id, e.target.value);

		const newData = data.map(item =>
			item.id === id ? { ...item, status: e.target.value } : item
		);
		setorderData(newData);

	};

	const columns = useMemo(
		() => [
			{
				accessorKey: 'shipping_date', //access nested data with dot notation
				header: 'Shipping Date',
				// size: 150,
			},
			{
				accessorKey: 'order_number',
				header: 'Order Number',
				// size: 150,
			},
			{
				accessorKey: 'company',
				header: 'Company',
				// size: 150,
			},
			{
				accessorKey: 'productTitle',
				header: 'Product Description ',
				// size: 150,
			},
			{
				accessorKey: 'category', //normal accessorKey
				header: 'Category',
				// size: 200,
			},
			{
				accessorKey: 'color',
				header: 'Color',
				// size: 150,
			},
			{
				accessorKey: 'sale_price',
				header: 'Sale Price',
				// size: 150,
			},
			{
				accessorKey: 'item_quantity',
				header: 'OTY',
				// size: 150,
			},
			{
				accessorKey: 'uom',
				header: 'UOM',
				// size: 150,
			},
			{
				accessorKey: 'total_price',
				header: 'Total',
				// size: 150,
			},
			{
				accessorKey: 'farm',
				header: 'Farm',
				// size: 150,
			},
			{
				accessorKey: 'cost_price',
				header: 'Cost',
				// size: 150,
			},
			{
				accessorKey: 'margin',
				header: 'Margin',
				// size: 150,
			},
			{
				accessorKey: 'order_status',
				header: 'Status',
				// size: 150,
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
								<MenuItem key={i} value={v}>{v}</MenuItem>
							))}

						</Select>
					</>
				),
			},
			
		],
		[],);






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
			"orderId": location.state.order_id,
			"category_name": "",
			"product_name": "",
			"farm_name": "",
			"customer_name": "",
			"search_status": "",
			"order_from_date": "2024-04-20",
			"order_to_date": "2024-05-20",
			"page": (pagination.pageIndex + 1),
			"limit": pagination.pageSize
		};

		var response = await fmiOrderSystemAppOrderDetailsList(payload);

		var newData = response.results.map((item) => ({
			"item_tbl_id": item.item_tbl_id,
			"productTitle": item.productTitle,
			"customer_name": item.customer_name,
			"order_date": item.order_date,
			"order_status": item.order_status,
			"item_quantity": item.item_quantity,
			"sale_price": `$${item.sale_price}`,
			"shipping_date": item.shipping_date,
			"order_number": `#${item.order_number}`,
			"company": item.company,
			"category": item.category,
			"color": item.color,
			"uom": item.uom,
			"total_price": `$${item.total_price}`,
			"farm": item.farm,
			"cost_price": `$${item.cost_price}`,
			"margin": `${item.margin}%`
		}))


		setorderData(newData);
		setRowCount(response.totalRecord);
		// setPagination({ ...pagination, pageIndex: pagination.pageIndex })

		// console.log("first ",response)
		setIsLoading(false);

	}


	useEffect(() => {
		getOrderList();
		// console.log(orderData)
	}, [pagination.pageIndex, pagination.pageSize]);



	return (
		<>
			<Header />
			<div><Typography variant="h3" className="title">Order Details</Typography></div>
			<div classNameName="data_table-head">
				<div className="container-fluid">
					<div className="view_order_table"><MaterialReactTable table={table} /></div>
				</div>
			</div>
		</>
	)
}

export default OderDetails;