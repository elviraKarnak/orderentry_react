import { useEffect, useMemo, useState } from 'react';
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton, Tooltip, DialogActions, DialogContent, DialogTitle, Select, TextField, MenuItem, InputLabel } from '@mui/material';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { categoryList, fetchProducts } from '../../../utils/fetch';
import placeholderImage from '../../../assests/images/placeholder.png';


function ProductTable() {

  //const placeholderImgPath = '../../../assests/images/placeholder.png';

  const [validationErrors, setValidationErrors] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [CategoryList, setCategoryList] = useState([]);
  const [newRowData, setNewRowData] = useState({
    name: '',
    sku: '',
    real_stock: '',
    real_price: '',
    cost_price: '',
    minqty: '',
    tags: [],
    source: '',
    postpublishdate: '',
    preorder: '',
    cat: '',
    uom: '',
    image: '',
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'image',
        header: 'Thumb',
        Header: ({ column }) => (
          <i style={{ color: '#aaa' }}><ImageIcon /></i> //re-use the header we already defined
        ),
        enableEditing: true,
        type: "file",
        size: 30,
        Cell: ({ renderedCellValue, row }) => (
          <>
            {/* {console.log("renderedCellValue ", renderedCellValue)} */}
            <img src={(renderedCellValue == 'images/noimage.jpg') ? placeholderImage : renderedCellValue} alt='' />
          </>
        ),
        Edit: ({ cell }) => (
          <>
            <label>Thumb</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '70px', height: '70px', marginTop: '10px' }} />}
          </>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableEditing: true,
        size: 200,
        Edit: ({ cell }) => (<>
          <TextField id="standard-basic" label="Name" variant="standard" name='name' onChange={handleInputChange} />
        </>)
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        size: 30,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
        Edit: ({ cell }) => (<>
          <TextField id="standard-basic" label="sku" variant="standard" name='sku' onChange={handleInputChange} />
        </>)
      },
      {
        accessorKey: 'real_stock',
        header: 'Stock',
        size: 10,
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
        Edit: ({ cell }) => (<>
          <TextField id="standard-basic" label="Stock" variant="standard" name='real_stock' onChange={handleInputChange} />
        </>)
      },
      {
        accessorKey: 'real_price',
        header: 'Price',
        size: 1,
        Edit: ({ cell }) => (<>
          <TextField id="standard-basic" label="Price" variant="standard" name='real_price' onChange={handleInputChange} />
        </>)
      },
      {
        accessorKey: 'cost_price',
        header: 'Cost Price',
        size: 1,
        Edit: ({ cell }) => (<>
          <TextField id="standard-basic" label="Cost Price" variant="standard" name='cost_price' onChange={handleInputChange} />
        </>)
      },
      {
        accessorKey: 'minqty',
        header: 'Qty',
        size: 1,
        Edit: ({ cell }) => (<>
          <TextField id="standard-basic" label="Qty" variant="standard" name='minqty' onChange={handleInputChange} />
        </>)
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        size: 80,
        Cell: ({ renderedCellValue, row }) => (
          <>
            {renderedCellValue.join(', ')}
          </>
        ),
        Edit: ({ cell }) => (<>
          <TextField id="standard-basic" label="Tags" variant="standard" name='tags' onChange={handleInputChange} />
        </>)
      },
      {
        accessorKey: 'source',
        header: 'Sourceinventory',
        size: 10,
        Edit: ({ cell }) => (<>
          <TextField id="standard-basic" label="Sourceinventory" variant="standard" name='source' onChange={handleInputChange} />
        </>)
      },
      {
        accessorKey: 'postpublishdate',
        header: 'Date',
        size: 10,
        Edit: ({ cell }) => (<>
          <TextField id="standard-basic" label="Date" variant="standard" name='postpublishdate' onChange={handleInputChange} />
        </>)
      },
      {
        accessorKey: 'preorder',
        header: 'Pre Order',
        size: 2,
        Edit: ({ cell }) => (<>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={newRowData.preorder}
            label="Pre Order"
            name='preorder'
            onChange={handleInputChange}
          >
            <MenuItem key={0} value={"yes"}>Yes</MenuItem>
            <MenuItem key={1} value={"no"}>No</MenuItem>
          </Select>
        </>)
      },
      {
        accessorKey: 'cat',
        header: 'Categories',
        size: 5,
        Edit: ({ cell }) => (
          <>

            {/* <InputLabel id="Category-label">Category</InputLabel> */}
            <Select
              labelId="Category-label"
              value={newRowData.cat}
              label="Category"
              placeholder='Category'
              name='cat'
              onChange={handleInputChange}
            >
              {CategoryList?.map((item, index) => (<MenuItem key={index} value={item.id}>{item.cat_name}</MenuItem>))}
            </Select>

          </>
        ),
      },
      {
        accessorKey: 'uom',
        header: 'UOM',
        size: 2,
        Edit: ({ cell }) => (<>
          <Select
            value={newRowData.uom}
            label="UOM"
            name='uom'
            onChange={handleInputChange}
          >
            <MenuItem key={0} value={"ST"}>ST</MenuItem>
          </Select>
        </>)
      },

    ],
    [validationErrors, imagePreview, CategoryList, newRowData],
  );



  const {
    data: fetchedproducts = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = UsefetchProducts();


  //console.log(fetchedproducts);


  //   call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();

  //   call READ hook
  //   const getProducts = useGetProducts();

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    console.log("handleCreateUser ", values, table);

    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedproducts,
    createDisplayMode: 'modal', // ('modal', and 'custom' are also available)
    editDisplayMode: 'modal', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps:
    {
      color: 'error',
      children: 'Error loading data',
    },

    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => {
      setImagePreview(null);
      setSelectedImage(null);
      setValidationErrors({});
    },
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => {
      setImagePreview(null);
      setSelectedImage(null);
      setValidationErrors({});
    },
    onEditingRowSave: handleSaveUser,

    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {console.log("internalEditComponents ", internalEditComponents)}
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New Product
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });


  const getCategoryList = async () => {

    let responce = await categoryList();

    console.log(responce.result.data);

    if (responce.result.data.length > 0) {
      setCategoryList(responce.result.data);
    }

  }


  useEffect(() => {
    getCategoryList();
  }, [])


  return (

    <>

      <MaterialReactTable table={table} />
    </>
  )
}

export default ProductTable





//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}


//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}




const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(user) {
  // console.log(user)
  return {
    cat: !validateRequired(user.cat) ? 'This field is Required' : '',
    cost_price: !validateRequired(user.cost_price) ? 'This field is Required' : '',
    image: !validateRequired(user.image) ? 'This field is Required' : '',
    minqty: !validateRequired(user.minqty) ? 'This field is Required' : '',
    name: !validateRequired(user.name) ? 'This field is Required' : '',
    postpublishdate: !validateRequired(user.postpublishdate) ? 'This field is Required' : '',
    preorder: !validateRequired(user.preorder) ? 'This field is Required' : '',
    real_price: !validateRequired(user.real_price) ? 'This field is Required' : '',
    real_stock: !validateRequired(user.real_stock) ? 'This field is Required' : '',
    sku: !validateRequired(user.sku) ? 'This field is Required' : '',
    source: !validateRequired(user.source) ? 'This field is Required' : '',
    tags: !validateRequired(user.tags) ? 'This field is Required' : '',
    uom: !validateRequired(user.uom) ? 'This field is Required' : ''
  };
}

/**
 * Fetch Products
 */

function UsefetchProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
}