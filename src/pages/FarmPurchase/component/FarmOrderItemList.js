import React from 'react';
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
import { disableStatus, FarmOrderItemStatusUpdateHook } from '../hooks';

const statusArray = [
    { label: "Pending", value: "pending" ,disabled: true },
    { label: "Accepted", value: "accepted",disabled: false },
    { label: "Canceled", value: "canceled",disabled: false },
]

function FarmOrderItemList({ row }) {

    const {
        mutateAsync: orderItemStatusUpdate,
        isPending: isoroerItemStatusUpdate,
    } = FarmOrderItemStatusUpdateHook();


    const handleStatusChange=async(id,status)=>{

        const payload={
            id: id,
            status: status
        }

        await orderItemStatusUpdate(payload)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Product Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Farm Price</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row?.original?.orderItems?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={row.product_image}
                                        alt=""
                                        width={"50px"}
                                        height={"50px"}
                                    />
                                </TableCell>
                                <TableCell>{row.product_name}</TableCell>
                                <TableCell>{row.product_category}</TableCell>
                                <TableCell>{row.product_color}</TableCell>
                                <TableCell>
                                    {/* {row.boxes} {row.box_type} */}
                                    {row.item_quantity}
                                </TableCell>
                                <TableCell>{row.item_price}</TableCell>
                                <TableCell>{row.item_total_price}</TableCell>
                                <TableCell>
                                    {/* {row.status} */}
                                    <Select
                                        value={row.status}
                                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        className={`dropdown`}
                                        disabled={disableStatus.includes(row.status)}
                                    >
                                        {statusArray.map((s,index) => (
                                            <MenuItem key={index} value={s.value} disabled={s.disabled}>
                                                {s.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default FarmOrderItemList
