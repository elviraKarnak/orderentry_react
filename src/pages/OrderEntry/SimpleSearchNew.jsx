import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import Header from "../../common/Header";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import {
  Typography,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";

import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import customerService from "../../services/customer.service";
import CustomerDummyList from "../../utils/dummy_data/CustomerDummyList";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { commonActions } from "../../redux/reducers/Common";
import { customerActions } from "../../redux/reducers/Customer";
import { orderEntryActions } from "../../redux/reducers/OrderEntry";
import AddCustomer from "../../compoments/AddCustomerModal/AddCustomer.modal";
import AddressModel from "../../compoments/CustomerAddressModel/Address.model";
import { findAllCustomersApi } from "../../utils/fetch";
import DeleteCustomerModel from "../../compoments/AddCustomerModal/DeleteCustomer.model";

function SimpleSearchNew() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isAddressModel, setIsAddressModel] = useState(false);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [usersList, setUsersList] = useState([]);
  const [userFormType, setUserFormType] = useState(); // add or edit
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   *
   * @param {number} id
   */
  const selectedSingleCustomerGet = async (id) => {
    // alert(1)

    var responce = await customerService.findOne(id);
    if (responce.data.status) {
      // console.log(responce.data.data[0])
      dispatch(customerActions.setSelectCustomer(responce.data.data[0]));
      dispatch(orderEntryActions.order_data_reset());
      navigate("/new-order");
    } else {
      toast.error(responce.data.msg);
    }
  };

  // call the GetCustomerList function //
  // const {
  //   data: customerData = [],
  //   isError: customerIsError,
  //   isFetching: customerIsFetching,
  //   isLoading: customerIsLoading,
  //   refetch: customerRefetch,
  // } = GetCustomerList();

  async function getAllUsers() {
    try {
      const dataResponse = await findAllCustomersApi();

      if (dataResponse.status == true) {
        setUsersList(dataResponse.result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch customer list");
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  // table columns //
  const columns = useMemo(
    () => [
      {
        accessorKey: "user_customer_no",
        header: "Customer No.",
        size: 100,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 100,
      },
      {
        accessorKey: "username",
        header: "User Name",
        size: 100,
      },
      {
        accessorKey: "user_first_name",
        header: "First Name",
        size: 100,
      },
      {
        accessorKey: "user_last_name",
        header: "Last Name",
        size: 100,
      },
      {
        accessorKey: "user_customer_serivce_representative",
        header: "Representative",
        size: 100,
      },
      {
        accessorKey: "company",
        header: "Company",
        size: 100,
      },

      {
        accessorKey: "last_order_date",
        header: "Last Order Date",
        size: 100,
      },
      {
        accessorKey: "last_order_value",
        header: "Last Order Value",
        size: 100,
      },
      {
        accessorKey: "sales_rep",
        header: "Sales Rep",
        size: 100,
      },
      {
        accessorKey: "order_entry",
        header: "Order Entry",
        size: 100,
      },
    ],
    []
  );

  // Material React Table settings //
  const customerListTable = useMaterialReactTable({
    columns,
    data: usersList,
    // data: CustomerDummyList,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: false,
    enableEditing: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
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
      // showAlertBanner: customerIsError,
      // showProgressBars: customerIsFetching,
      // isLoading: customerIsLoading,
    },
    renderRowActions: ({ row, table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Edit customer Details */}
        <Tooltip title="Edit customer Details">
          <IconButton
            color="primary"
            onClick={() => {
              setUserFormType("edit");
              setSelectedCustomer(row.original);
              setIsModelOpen(true);
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>

        {/* Address */}
        <Tooltip title="Address">
          <IconButton
            color="success"
            onClick={() => {
              setIsAddressModel(true);
              setSelectedCustomer(row.original);
            }}
          >
            <AddHomeOutlinedIcon />
          </IconButton>
        </Tooltip>

        {/* Delete customer */}
        <Tooltip title="Delete Customer">
          <IconButton
            color="error"
            onClick={() => {
              setSelectedCustomer(row.original.id);
              setIsDeleteModel(true);
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>

        {/* Delete Customer Icon */}
        <Tooltip title="Start New Order">
          <IconButton
            color="secondary"
            onClick={() => selectedSingleCustomerGet(row.original.id)}
          >
            <PlayCircleOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  useEffect(() => {
    dispatch(commonActions.setPageTitle("Order Entry"));
  }, []);

  // render //
  return (
    <>
      {/* --------------- customer form model START --------------> */}
      {isModelOpen &&
        ReactDOM.createPortal(
          <div
            style={{
              width: "100%",
              height: "100vh",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "1000",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddCustomer
              setIsModelOpen={setIsModelOpen}
              selectedCustomer={selectedCustomer}
              refetch={getAllUsers}
              type={userFormType}
            />
          </div>,
          document.getElementById("portal-root")
        )}
      {/* xxxxxxxxxxxxxxxxxxxxx  New customer form model END xxxxxxxxxxxxxxxxxxxxxx*/}

      {/* ----------------- Address Model START -----------------> */}
      {isAddressModel &&
        ReactDOM.createPortal(
          <div
            style={{
              width: "100%",
              height: "100vh",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "1000",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddressModel
              setIsAddressModel={setIsAddressModel}
              selectedCustomer={selectedCustomer}
              refetch={getAllUsers}
            />
          </div>,
          document.getElementById("portal-root")
        )}
      {/* xxxxxxxxxxxxxxxxxxxxx  Address Model END xxxxxxxxxxxxxxxxxxxxxx*/}

      {/* ----------------- Delete Model START -----------------> */}
      {isDeleteModel &&
        ReactDOM.createPortal(
          <div
            style={{
              width: "100%",
              height: "100vh",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "1000",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DeleteCustomerModel
              customerId={selectedCustomer}
              setIsDeleteModel={setIsDeleteModel}
              refetch={getAllUsers}
            />
          </div>,
          document.getElementById("portal-root")
        )}

      {/* xxxxxxxxxxxxxxxxxxxxx  Delete Model END xxxxxxxxxxxxxxxxxxxxxx*/}

      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h3" className="title">
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 2 }}
              onClick={() => {
                setUserFormType("add");
                setSelectedCustomer({});
                setIsModelOpen(true);
              }}
            >
              Add New Customer
            </Button>
          </Typography>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <MaterialReactTable table={customerListTable} />
        </Grid>
      </Grid>
    </>
  );
}

export default SimpleSearchNew;

///////////////////////////////// Define Custom Function /////////////////////////////////

/**
 * @function getCustomerList
 * @returns {object} customerList
 */
function GetCustomerList() {
  return useQuery({
    queryKey: ["customers"],
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
          last_order_date: "",
          last_order_value: "",
          sales_rep: "",
          order_entry: "",
        });
      }

      return tempCustomerList;
    },
  });
}
