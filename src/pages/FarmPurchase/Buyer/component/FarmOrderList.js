import React, { useMemo, useState } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from "material-react-table";
import FarmOrderItemList from "./FarmOrderItemList";
import { Box, IconButton, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyIcon from '@mui/icons-material/Key';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { FARM_PURCHASE_STATUS, PageModuleData } from "../../../../utils/Constant";

import TimerIcon from '@mui/icons-material/Timer';
import { disableStatus, FarmOrderInvoiceFileDeleteHook, FarmOrderInvoiceFileUploadHook, FarmOrderItemStatusUpdateHook, FarmOrderStatusUpdateHook, FarmOrderUpdateHook, GetFarmOrderListHook } from "../hooks";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CheckCRUDPermission from "../../../../utils/commnFnc/ChecCRUDPermission";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CancelIcon from '@mui/icons-material/Cancel';
import { downloadAnyFile } from "../../../../utils/commnFnc/downloadAnyFile";
import moment from "moment";
import Swal from "sweetalert2";


function FarmOrderList() {

    const { authUser } = useSelector(state => state.Auth);

    const permisionData = CheckCRUDPermission(PageModuleData.farmPurchase);


    const [OpenDialog, setOpenDialog] = useState(false);
    const [InvloceFiles, setInvloceFiles] = useState([]);

    const handleDialogOpen = (data) => {
        console.log(data)
        setInvloceFiles(data?.farmOrderInvoices);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setInvloceFiles([]);
    };



    /// query hook ///
    const { data: FarmOrderListData = [] } = GetFarmOrderListHook(authUser.role_id, authUser.user_id);

    /// mutation hook ///
    const {
        mutateAsync: updateFarmOrder,
        isPending: isUpdateingFarmOrder
    } = FarmOrderUpdateHook();

    const {
        mutateAsync: orderStatusUpdate,
        isPending: isOrderStatusUpdate,
    } = FarmOrderStatusUpdateHook();

    const {
        mutateAsync: invoiceFileUpload,
        isPending: isInvoiceFileUpload
    } = FarmOrderInvoiceFileUploadHook();



    const handleOrderStatusChange = async (order_id, status) => {
        await orderStatusUpdate({
            order_id: order_id,
            status: status
        })
    }




    const columns = useMemo(
        () => [
            {
                accessorKey: "checkout_cut_off_time",
                header: "Checkout Cut Off",
                enableEditing: false,
                cell: ({ row }) => {
                    return (
                        <Typography variant="body2" color="text.secondary">
                            <TimerIcon /> {row.original.checkout_cut_off_time}
                        </Typography>
                    );
                }
            },
            {
                accessorKey: "order_date",
                header: "PO Date",
                enableEditing: false
            },
            {
                accessorKey: "order_number",
                header: "PO#",
                enableEditing: false
            },
            {
                accessorKey: "awb_number",
                header: "AWB#",
                enableEditing: true,
                muiEditTextFieldProps: ({ cell, row }) => ({
                    type: 'text',
                    required: true,
                    disabled: (!permisionData.edit_access) && (disableStatus.includes(row.original.status)),
                    onBlur: async (event) => {
                        // console.log(row.original)
                        // console.log(event.currentTarget.value);

                        var payload = {
                            order_id: row.original.id,
                            awb_number: event.currentTarget.value
                        }

                        await updateFarmOrder(payload)
                    },
                }),
            },
            {
                accessorKey: "invoice_number",
                header: "Inv#",
                enableEditing: true,
                muiEditTextFieldProps: ({ cell, row }) => ({
                    type: 'text',
                    required: true,
                    disabled: (!permisionData.edit_access) && (disableStatus.includes(row.original.status)),
                    onBlur: async (event) => {
                        // console.log(row.original)
                        // console.log(event.currentTarget.value);

                        var payload = {
                            order_id: row.original.id,
                            invoice_number: event.currentTarget.value
                        }

                        await updateFarmOrder(payload)

                    },
                }),
            },
            {
                accessorKey: "invoice_date",
                header: "Inv Date",
                enableEditing: false,
                Cell: ({ row }) => {

                    const [dateValue, setDateValue] = useState(
                        row.original.invoice_date ? dayjs(row.original.invoice_date) : null
                    );


                    const handleDateChange = async (newValue) => {
                        setDateValue(newValue);
                        if (newValue) {
                            const payload = {
                                order_id: row.original.id,
                                invoice_date: newValue.format('YYYY-MM-DD'), // Adjust format as needed
                            };

                            console.log("Invoice date updated:", payload);

                            try {
                                await updateFarmOrder(payload); // Replace with your API call function
                                console.log("Invoice date updated successfully:", payload);

                            } catch (error) {
                                console.error("Error updating invoice date:", error);
                            }
                        }
                    };


                    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Invoice Date"
                                value={dateValue}
                                onChange={handleDateChange}
                                disabled={(!permisionData.edit_access) && (disableStatus.includes(row.original.status))}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </DemoContainer>
                    </LocalizationProvider>);
                },
            },
            {
                accessorKey: "total_price",
                header: "Total Price",
                enableEditing: false,
            },
            {
                accessorKey: "status",
                header: "Status",
                enableEditing: false,
                Cell: ({ renderedCellValue, row }) => {
                    return (<>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            className={`dropdown ${(row.original.status?.toLowerCase())?.replace(/\s/g, '')} `}
                            style={{
                                minWidth: 100,
                            }}
                            value={row.original.status}
                            onChange={(e) => handleOrderStatusChange(row.original.id, e.target.value)}
                            // disabled={disableStatus.includes(row.original.status)}
                            disabled={true}
                        >
                            {FARM_PURCHASE_STATUS.map((v, i) => (
                                <MenuItem key={i} value={v.value} disabled={v.disabled} >{v.label}</MenuItem>
                            ))}
                        </Select>
                    </>);
                }
            },
        ],
        []
    );

    const farmListTable = useMaterialReactTable({
        columns: columns,
        data: FarmOrderListData,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        positionActionsColumn: "last",
        enableRowActions: true,
        editDisplayMode: 'table',
        enableEditing: true,
        // editDisplayMode: 'row',
        // enableSelectAll: true,
        // selectAllMode: 'page',
        getRowId: (row) => row.id,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
            columnVisibility: {
                id: false,
            },
        },
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        muiSearchTextFieldProps: {
            size: "small",
            variant: "outlined",
        },
        muiPaginationProps: {
            color: "secondary",
            rowsPerPageOptions: [10, 20, 30],
            shape: "rounded",
            variant: "outlined",
        },
        state: {
            // isLoading: stagingInventoryIsLoading,
            isSaving: isUpdateingFarmOrder || isOrderStatusUpdate || isInvoiceFileUpload,
            // showAlertBanner: stagingInventoryisError,
            // showProgressBars: stagingInventoryIsFetching,
            // rowSelection: rowSelection,
            // chooseStatus: chooseStatus,
            // allSelectCheckboxSelect: allSelectCheckboxSelect
        },
        renderDetailPanel: ({ row }) => (
            <FarmOrderItemList row={row} />
        ),

        renderRowActions: ({ row, table }) => {

            const handleFileUpload = async (event) => {

                // await invoiceFileUpload({
                //     id: row.original.id,
                //     invoice_file: row.original.invoice_file
                // })

                // console.log(row.original);

                const file = event.target.files[0];
                if (!file) {
                    console.error("No file selected");
                    return;
                }

                var payload = {
                    id: row.original.id,
                    invoice_file: file
                }

                try {
                    await invoiceFileUpload(payload);
                    // console.log("Invoice file uploaded successfully:", file.name);
                    toast.success("Invoice file uploaded successfully");
                } catch (error) {
                    console.error("Error uploading invoice file:", error);
                }
            }

            return (<Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Upload Invoice">
                    {/* <IconButton onClick={handleFileUpload}>
                        <FileUploadOutlinedIcon />
                    </IconButton> */}
                    <label htmlFor={`upload-invoice-${row.original.id}`}>
                        <input
                            id={`upload-invoice-${row.original.id}`}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                            disabled={true}
                        />
                        <IconButton component="span" disabled={true}>
                            <FileUploadOutlinedIcon />
                        </IconButton>
                    </label>
                </Tooltip>
                <Tooltip title="Download Labels">
                    <IconButton
                        disabled={(row.original.farmOrderInvoices.length > 0) ? false : true}
                        onClick={() => handleDialogOpen(row.original)}
                    >
                        <FileDownloadOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Box>);
        },
    });

    return (
        <>
            <MaterialReactTable table={farmListTable} />


            {/* dialog for download and delete invoice */}
            <Dialog
                open={OpenDialog}
                onClose={handleDialogClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Invoice File List</DialogTitle>
                <DialogContent>
                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        {InvloceFiles?.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemButton
                                    onClick={(event) => downloadAnyFile(event, item.file_url, `invoice-${moment(item.created_at).format('DD-MM-YYYY')}`)}
                                >
                                    <ListItemIcon>
                                        <ArrowCircleDownIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`invoice-${moment(item.created_at).format('DD-MM-YYYY')}`} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FarmOrderList;
