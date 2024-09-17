import React, { useMemo } from 'react';
import Header from '../../common/Header';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useQuery } from '@tanstack/react-query';
import { Typography, Box, Grid, IconButton, Tooltip, Button } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import customerService from '../../services/customer.service';
import CustomerDummyList from '../../utils/dummy_data/CustomerDummyList';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function SimpleSearchNew() {

    const navigate = useNavigate();


    /**
     * 
     * @param {number} id 
     */
    const selectedSingleCustomerGet = async (id) => {
        // alert(1)

        var responce = await customerService.findOne(id);
        if (responce.data.status) {
            // console.log(responce.data.data[0])
            navigate("/new-order", { state: { selectCustomerData: responce.data.data[0] } });
        } else {
            toast.error(responce.data.msg)
        }

    }


    // call the GetCustomerList function //
    const {
        data: customerData = [],
        isError: customerIsError,
        isFetching: customerIsFetching,
        isLoading: customerIsLoading,
        refetch: customerRefetch,
    } = GetCustomerList();


    // table columns //
    const columns = useMemo(() => [
        {
            accessorKey: 'account_number',
            header: 'Acct#',
            size: 100,
        },
        {
            accessorKey: 'company_name',
            header: 'Company',
            size: 100,
        },
        {
            accessorKey: 'full_name',
            header: 'Full Name',
            size: 100,
        },
        {
            accessorKey: 'username',
            header: 'Username',
            size: 100,
        },
        {
            accessorKey: 'phone',
            header: 'Phone#',
            size: 100,
        },
        {
            accessorKey: 'last_order_date',
            header: 'Last Order Date',
            size: 100,
        },
        {
            accessorKey: 'last_order_value',
            header: 'Last Order Value',
            size: 100,
        },
        {
            accessorKey: 'sales_rep',
            header: 'Sales Rep',
            size: 100,
        },
        {
            accessorKey: 'order_entry',
            header: 'Order Entry',
            size: 100,
        },
    ], []);


    // Material React Table settings //
    const customerListTable = useMaterialReactTable({
        columns,
        data: customerData,
        // data: CustomerDummyList,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: false,
        enableEditing: true,
        initialState: {
            showColumnFilters: true,
            showGlobalFilter: true,
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
            showAlertBanner: customerIsError,
            showProgressBars: customerIsFetching,
            isLoading: customerIsLoading,
        },
        renderRowActions: ({ row, table }) => (
            <Tooltip title="Start New Order">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                        width: '200px',
                        height: '40px',
                    }}
                    onClick={() => selectedSingleCustomerGet(row.original.id)}>
                    Start New Order
                </Button>
            </Tooltip>

        ),
    });



    // render //
    return (<Grid container spacing={2}>

        <Grid item xs={12} md={12} lg={12}>
            <Header />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h3" className="title">
                Order Entry
                <Button
                variant="contained"
                color="primary"
                sx={{ m: 2 }}>
                Add New Customer
            </Button>
            </Typography>
            
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
            <MaterialReactTable table={customerListTable} />
        </Grid>

    </Grid>)
}

export default SimpleSearchNew;




///////////////////////////////// Define Custom Function /////////////////////////////////


/**
* @function getCustomerList
* @returns {object} customerList
*/
function GetCustomerList() {
    return useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const responce = await customerService.findAll("");
            console.log("GetCustomerList: ", responce.data.data);

            // api object 
            // {
            //     company_name: "New Flower Shop 1"
            //     created_at: "2023-12-13T08:13:32.000Z"
            //     customer_no: "67225"
            //     customer_service_representative: null
            //     email: "cuser1@gmail.com"
            //     firstname: "Somnath"
            //     id: 1
            //     lastname: "Halder"
            //     phone: "8795463021"
            //     same_bill_addr_status: "0"
            //     updated_at: null
            //     username: null
            // }

            var tempCustomerList = [];
            for (var item of responce.data.data) {
                tempCustomerList.push({
                    id: item.id,
                    account_number: item.customer_no,
                    company_name: item.company_name,
                    full_name: `${item.firstname} ${item.lastname}`,
                    username: item.username,
                    phone: item.phone,
                    last_order_date: '',
                    last_order_value: '',
                    sales_rep: '',
                    order_entry: '',
                });
            }

            return tempCustomerList;
        },
    });
}


