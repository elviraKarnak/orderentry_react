import React, { useState } from 'react';
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
    TextField,
} from '@mui/material';
import { disableStatus, FarmOrderItemStatusUpdateHook,FarmOrderItemUpdateHook } from '../hooks';

const statusArray = [
    { label: "Pending", value: "pending", disabled: true },
    { label: "Accepted", value: "accepted", disabled: false },
    { label: "Canceled", value: "canceled", disabled: false },
]

function FarmOrderItemList({ row }) {

    const [localItems, setLocalItems] = useState(row?.original?.orderItems || []);

    const {
        mutateAsync: orderItemStatusUpdate,
        isPending: isoroerItemStatusUpdate,
    } = FarmOrderItemStatusUpdateHook();

    const {
        mutateAsync: orderItemUpdate,
        isPending: isoroerItemUpdate,
    } = FarmOrderItemUpdateHook()


    const handleStatusChange = async (id, status) => {

        const payload = {
            id: id,
            status: status
        }

        await orderItemStatusUpdate(payload)
    }


    const handleFieldChange = (id, field, value) => {

        console.log("handleFieldChange: ", id, field, value);

        setLocalItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };

                    updatedItem.item_total_price = updatedItem.item_quantity * updatedItem.item_price || 0;
                    return updatedItem;
                }
                return item;
            })
        );
    };


    const handleFieldChangeOnBLur = async (id, field, value) => {

        console.log("handleFieldChangeOnBLur: ", id, field, value);

        const payload = {
            id: id,
            [field]: value,
        };

        await orderItemUpdate(payload);
    };


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
                        {localItems.map((row) => (
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
                                    {/* {row.item_quantity} */}
                                    {row.status === "pending" ? (
                                        <TextField
                                            value={row.item_quantity}
                                            onChange={(e)=>{
                                                handleFieldChange(row.id, "item_quantity", e.target.value)
                                            }}
                                            onBlur={(e) =>
                                                handleFieldChangeOnBLur(row.id, "item_quantity", e.target.value)
                                            }
                                            variant="outlined"
                                            size="small"
                                        />
                                    ) : (
                                        row.item_quantity
                                    )}
                                </TableCell>
                                <TableCell>
                                    {/* {row.item_price} */}
                                    {row.status === "pending" ? (
                                        <TextField
                                            value={row.item_price}
                                            onChange={(e)=>{
                                                handleFieldChange(row.id, "item_price", e.target.value)
                                            }}
                                            onBlur={(e) =>
                                                handleFieldChangeOnBLur(row.id, "item_price", e.target.value)
                                            }
                                            variant="outlined"
                                            size="small"
                                        />
                                    ) : (
                                        row.item_price
                                    )}
                                </TableCell>
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
                                        {statusArray.map((s, index) => (
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
