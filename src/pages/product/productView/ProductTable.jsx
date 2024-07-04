import { useEffect, useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
  Chip,
} from "@mui/material";

import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";

import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import {
  ProductAdd,
  ProductDelete,
  ProductEdit,
  categoryList,
  colorList,
  fetchProducts,
  fetchProducts_2,
} from "../../../utils/fetch";
import placeholderImage from "../../../assests/images/placeholder.png";

import Swal from "sweetalert2";
import CustomInput from "./CustomInput";



function ProductTable() {
  //const placeholderImgPath = '../../../assests/images/placeholder.png';

  const [validationErrors, setValidationErrors] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [CategoryList, setCategoryList] = useState([]);
  const [ColorList, setColorList] = useState([]);

  const [AddProduct, setAddProduct] = useState(false);

  const [DisableRows, setDisableRows] = useState({
    awb: false,
    vendor_name: false,

    product_name: false,
    farm_invoice: false,
    po: false,
    received_date: false,
    boxes: false,
    boxtype: false,
    box_unit: false,
    bunch_unit: false,
    cost_unit: false,
    sale_price: false,
    so: false,
    margin: false,


    sku: false,
    real_stock: false,
    real_price: false,
    cost_price: false,
    minqty: false,
    product_tags: false,
    source: false,
    pre_order: false,
    cat_id: false,
    product_color: false,
    uom: false,
    feature_status: false,

  });


  const [newRowData, setNewRowData] = useState({
    awb: "",
    vendor_name: "",

    product_name: "",
    farm_invoice: "",
    po: "",
    received_date: null,
    boxes: "",
    boxtype: "",
    box_unit: "",
    bunch_unit: "",
    cost_unit: "",
    sale_price: "",
    so: "",
    margin: "",


    sku: "",
    real_stock: "",
    real_price: "",
    cost_price: "",
    minqty: "",
    product_tags: [],
    source: "",
    pre_order: "",
    cat_id: [],
    product_color: "",
    uom: "",
    feature_status: "",

  });


  const inputFields = [
    { label: 'AWB', name: 'awb', type: 'text' },
    { label: 'Vendor Name', name: 'vendor_name', type: 'text' },
    { label: 'Product Name', name: 'product_name', type: 'text' },
    { label: 'Farm Invoice#', name: 'farm_invoice', type: 'number' },
    { label: 'PO#', name: 'po', type: 'number' },
    { label: 'Date Received', name: 'received_date', type: 'date' },

    { label: 'BOXES', name: 'boxes', type: 'number' },
    { label: 'Box Type', name: 'boxtype', type: 'text' },
    { label: 'Units/Box', name: 'box_unit', type: 'number' },
    { label: 'Units/Bunch', name: 'bunch_unit', type: 'number' },
    { label: 'Units/Cost', name: 'cost_unit', type: 'number' },
    { label: 'Sale Price', name: 'sale_price', type: 'number' },
    { label: 'SO#', name: 'so', type: 'number' },
    { label: 'Margin %', name: 'margin', type: 'number' },

    { label: 'SKU', name: 'sku', type: 'number' },
    { label: 'Stock', name: 'real_stock', type: 'number' },
    { label: 'Price', name: 'real_price', type: 'number' },
    { label: 'Cost Price', name: 'cost_price', type: 'text' },
    { label: 'Qty', name: 'minqty', type: 'number' },

    { label: 'Source', name: 'source', type: 'text' },

    { label: 'Category', name: 'cat_id', type: 'multiple_select' },
    { label: 'Color', name: 'product_color', type: 'select' },

    { label: 'UOM', name: 'uom', type: 'select' },
    { label: 'Feature', name: 'feature_status', type: 'select' },


    { label: 'Tags', name: 'product_tags', type: 'autocomplete' },
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTagChange = (event, value) => {
    setNewRowData((prevData) => ({
      ...prevData,
      product_tags: value,
    }));
  };

  const handleMultipleSelectChange = (name) => (event) => {
    const { value } = event.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'image_url',
        header: 'Thumb',
        Header: () => (
          <i style={{ color: '#aaa' }}>
            <ImageIcon />
          </i>
        ),
        enableEditing: true,
        type: 'file',
        size: 30,
        Cell: ({ renderedCellValue }) => (
          <img
            src={
              renderedCellValue === ""
                ? placeholderImage
                : renderedCellValue
            }
            alt=""
            style={{ width: '70px', height: '70px' }}
          />
        ),
        Edit: () => (
          <>
            <CustomInput
              type="file"
              label="Thumb"
              name="image"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '70px', height: '70px', marginTop: '10px' }}
              />
            )}
          </>
        ),
      },
      {
        accessorKey: 'product_name',
        header: 'Name',
        enableEditing: true,
        size: 200,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.product_name}
              label="Name"
              name="product_name"
              value={newRowData.product_name}
              onChange={handleInputChange}
              error={validationErrors?.product_name}
            />
          </>
        ),
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        enableEditing: true,
        size: 30,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.sku}
              label="SKU"
              name="sku"
              value={newRowData.sku}
              onChange={handleInputChange}
              error={validationErrors?.sku}
            />
          </>
        ),
      },
      {
        accessorKey: 'real_stock',
        header: 'Stock',
        enableEditing: true,
        size: 10,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.real_stock}
              type="number"
              label="Stock"
              name="real_stock"
              value={newRowData.real_stock}
              onChange={handleInputChange}
              error={validationErrors?.real_stock}
            />
          </>
        ),
      },
      {
        accessorKey: 'real_price',
        header: 'Price',
        enableEditing: true,
        size: 1,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.real_price}
              type="number"
              label="Price"
              name="real_price"
              value={newRowData.real_price}
              onChange={handleInputChange}
              error={validationErrors?.real_price}
            />
          </>
        ),
      },
      {
        accessorKey: 'cost_price',
        header: 'Cost Price',
        enableEditing: true,
        size: 1,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.cost_price}
              type="number"
              label="Cost Price"
              name="cost_price"
              value={newRowData.cost_price}
              onChange={handleInputChange}
              error={validationErrors?.cost_price}
            />
          </>
        ),
      },
      {
        accessorKey: 'minqty',
        header: 'Qty',
        enableEditing: true,
        size: 1,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.minqty}
              type="number"
              label="Qty"
              name="minqty"
              value={newRowData.minqty}
              onChange={handleInputChange}
              error={validationErrors?.minqty}
            />
          </>
        ),
      },
      {
        accessorKey: 'product_tags',
        header: 'Tags',
        enableEditing: true,
        size: 80,
        Cell: ({ renderedCellValue }) => <>{renderedCellValue}</>,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.product_tags}
              type="autocomplete"
              label="Tags"
              name="product_tags"
              value={newRowData.product_tags}
              onChange={handleTagChange}
              error={validationErrors?.product_tags}
              multiple
              freeSolo
            />
          </>
        ),
      },
      {
        accessorKey: 'source',
        header: 'Source Inventory',
        enableEditing: true,
        size: 10,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.source}
              label="Source Inventory"
              name="source"
              value={newRowData.source}
              onChange={handleInputChange}
              error={validationErrors?.source}
            />
          </>
        ),
      },
      {
        accessorKey: "feature_status",
        header: "Feature Status",  //<StarRateRoundedIcon style={{ color: "blue" }} />,
        enableEditing: true,
        size: 5,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.feature_status}
              type="select"
              label="Feature"
              name="feature_status"
              value={newRowData.feature_status}
              onChange={handleInputChange}
              options={[{ id: "1", name: "Yes" }, { id: "0", name: "No" }]}
              error={validationErrors?.feature_status}
            />
          </>
        ),
        Cell: ({ renderedCellValue }) => (
          <>
            {renderedCellValue === '1' ? <StarRateRoundedIcon style={{ color: "blue" }} /> : <StarOutlineRoundedIcon style={{ color: "blue" }} />}
          </>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Publish Date',
        size: 30,
        enableEditing: false,
        Edit: ({ cell }) => null,
      },
      {
        accessorKey: 'pre_order',
        header: 'Pre-Order',
        enableEditing: false,
        size: 30,
        Edit: ({ cell }) => null,
        Cell: ({ renderedCellValue }) => (
          <>
            {renderedCellValue === 'yes' ? <CheckSharpIcon style={{ color: "green" }} /> : <CancelSharpIcon style={{ color: "red" }} />}
          </>
        ),
      },
      {
        accessorKey: 'category_string',
        header: 'Category',
        enableEditing: true,
        size: 10,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.cat_id}
              type="multiple_select"
              label="Category"
              name="cat_id"
              value={newRowData.cat_id}
              onChange={handleMultipleSelectChange('cat_id')}
              options={CategoryList}
              error={validationErrors?.cat_id}
            />
          </>
        ),

      },
      {
        accessorKey: 'color_string',
        header: 'Color',
        enableEditing: true,
        size: 5,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.product_color}
              type="select"
              label="Color"
              name="product_color"
              value={newRowData.product_color}
              onChange={handleInputChange}
              options={ColorList}
              error={validationErrors?.product_color}
            />
          </>
        ),
      },
      {
        accessorKey: 'uom',
        header: 'UOM',
        enableEditing: true,
        size: 5,
        Edit: ({ cell }) => (
          <>
            <CustomInput
              disabled={DisableRows.uom}
              type="select"
              label="UOM"
              name="uom"
              value={newRowData.uom}
              onChange={handleInputChange}
              options={[{ id: "ST", name: "ST" }]}
              error={validationErrors?.uom}
            />
          </>
        ),
      },

    ],
    [validationErrors, imagePreview, CategoryList, newRowData, ColorList]
  );

  const {
    data: fetchedproducts = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
    refetch: productRefetch,
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

  // edit product data set
  const editProductDataSet = (table, row) => {

    AddFromClear();
    setAddProduct(false);

    let rowData = row.original;
    let temp_data = newRowData;

    for (let key in temp_data) {
      // if (temp_data.hasOwnProperty(key)) {
      //   formData.append(key, temp_data[key]);
      // }

      if (key === "product_tags") {

        var temp = rowData[key].split(',');
        temp_data[key] = temp;
      }
      else if (key === "cat_id") {

        var tempCat = [];

        for (let item of rowData['productCategories']) {
          tempCat.push(item.category.id);
        }

        temp_data[key] = tempCat;
      }
      else if (key === "product_color") {

        var tempColor = "";

        for (let item of rowData['productColors']) {
          tempColor = item.color.id;
        }

        temp_data[key] = tempColor;
      }
      else {

        temp_data[key] = rowData[key];
      }


    }

    temp_data.product_id = rowData.id;
    setNewRowData(temp_data);
    setImagePreview(rowData.image_url);
    setDisableRows({
      product_name: false,
      sku: true,
      real_stock: true,
      real_price: false,
      cost_price: false,
      minqty: true,
      product_tags: false,
      source: false,
      pre_order: true,
      cat_id: false,
      product_color: false,
      uom: false,
      feature_status: false
    });
    table.setEditingRow(row);
  }

  const validate = (data) => {
    const errors = {};

    if (!data.awb.trim()) {
      errors.awb = "awb is required";
    }

    if (!data.vendor_name.trim()) {
      errors.vendor_name = "vendor name is required";
    }

    if (!data.farm_invoice.trim()) {
      errors.farm_invoice = "farm invoice is required";
    }

    if (!data.po.trim()) {
      errors.po = "po# is required";
    }

    if (data.received_date === null) {
      errors.received_date = "received date is required";
    }

    if (!data.boxes.trim()) {
      errors.boxes = "boxes is required";
    }

    if (!data.boxtype.trim()) {
      errors.boxtype = "boxtype is required";
    }

    if (!data.box_unit.trim()) {
      errors.box_unit = "box unit is required";
    }

    if (!data.bunch_unit.trim()) {
      errors.bunch_unit = "bunch unit is required";
    }

    if (!data.cost_unit.trim()) {
      errors.cost_unit = "cost unit is required";
    }

    if (!data.sale_price.trim()) {
      errors.sale_price = "sale price is required";
    }

    if (!data.so.trim()) {
      errors.so = "so is required";
    }

    if (!data.margin.trim()) {
      errors.margin = "margin is required";
    }

    if (!data.product_name.trim()) {
      errors.product_name = "Product name is required";
    }

    if (!data.sku.trim()) {
      errors.sku = "SKU is required";
    }

    if (isNaN(data.real_stock) || data.real_stock === "") {
      errors.real_stock = "Real stock must be a number";
    }

    if (isNaN(data.real_price) || data.real_price === "") {
      errors.real_price = "Real price must be a number";
    }

    if (isNaN(data.cost_price) || data.cost_price === "") {
      errors.cost_price = "Cost price must be a number";
    }

    if (isNaN(data.minqty) || data.minqty === "") {
      errors.minqty = "Minimum quantity must be a number";
    }

    if (!Array.isArray(data.product_tags)) {
      errors.product_tags = "Product tags is required";
    }

    if (!data.source.trim()) {
      errors.source = "Source is required";
    }

    if (!Array.isArray(data.cat_id)) {
      errors.cat_id = "Category is required";
    } else {
      if (data.cat_id.length === 0) {
        errors.cat_id = "Category is required";
      }
    }

    if (!data.product_color) {
      errors.product_color = "Product color is required";
    }

    if (!data.uom.trim()) {
      errors.uom = "Unit of measure is required";
    }

    if (!data.feature_status.trim()) {
      errors.feature_status = "Feature status is required";
    }

    return errors;
  };

  //CREATE action
  const handleProductAdd = async () => {
    // console.log("handleProductAdd ", values);
    console.log("newRowData ", newRowData);
    // console.log("selectedImage ", selectedImage);

    // return;


    let temp_data = newRowData;

    // validation check 
    const errors = validate(temp_data);

    if (Object.keys(errors).length !== 0) {
      console.log("Form has errors ", errors);
      setValidationErrors(errors);
      return;
    }


    if (selectedImage) {
      temp_data.product_image = selectedImage;
    }

    if (temp_data.cat_id.length > 0) {
      temp_data.cat_id = temp_data.cat_id.join(",");
    } else {
      temp_data.cat_id = "";
    }

    if (temp_data.product_tags.length > 0) {
      temp_data.product_tags = temp_data.product_tags.join(",");
    } else {
      temp_data.product_tags = "";
    }

    if (temp_data.received_date !== null) {
      temp_data.received_date = temp_data.received_date.format('YYYY-MM-DD');
    }

    let formData = new FormData();

    for (let key in temp_data) {
      if (temp_data.hasOwnProperty(key)) {
        formData.append(key, temp_data[key]);
      }
    }

    var responce = await ProductAdd(formData);

    if (responce.status) {
      Swal.fire({
        text: "Product add successfully.",
        icon: "success",
      });

      AddFromClear();
    }

    // console.log("handleProductAddApi ", responce);

    productRefetch();
  };


  //UPDATE action
  const handleProductEdit = async ({ values, table }) => {

    console.log("handleProductEdit ", values);
    console.log("newRowData ", newRowData);

    let temp_data = newRowData;

    if (selectedImage) {
      temp_data.product_image = selectedImage;
    }

    if (temp_data.cat_id.length > 0) {
      temp_data.cat_id = temp_data.cat_id.join(",");
    } else {
      temp_data.cat_id = "";
    }

    if (temp_data.product_tags.length > 0) {
      temp_data.product_tags = temp_data.product_tags.join(",");
    } else {
      temp_data.product_tags = "";
    }

    let formData = new FormData();

    for (let key in temp_data) {
      if (temp_data.hasOwnProperty(key)) {
        formData.append(key, temp_data[key]);
      }
    }

    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});
    // await updateUser(values);
    // table.setEditingRow(null); //exit editing mode

    var responce = await ProductEdit(formData);

    if (responce.status) {
      Swal.fire({
        text: "Product edit successfully.",
        icon: "success",
      });

      setNewRowData({
        product_name: "",
        sku: "",
        real_stock: "",
        real_price: "",
        cost_price: "",
        minqty: "",
        product_tags: [],
        source: "",
        postpublishdate: "",
        pre_order: "",
        cat_id: [],
        product_color: "",
        uom: "",
        feature_status: ""
      });
    }

    // console.log("handleProductEdit ", responce);

    AddFromClear();
    // await createUser(values);
    table.setEditingRow(null); //exit editing mode
    productRefetch();
  };


  // DELETE action
  const handleProductDelete = (rowData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "delete this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {

        var responce = await ProductDelete({
          product_id: rowData.id
        });

        if (responce.status) {

          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });

          productRefetch();
        }

      }
    });
  }

  // product table setting
  const table = useMaterialReactTable({
    columns,
    data: fetchedproducts,

    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    manualPagination: false,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
    },

    editDisplayMode: "modal", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,

    muiToolbarAlertBannerProps: {
      color: "error",
      children: "Error loading data",
    },

    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },

    muiEditRowDialogProps: {
      style: {
        width: "100%"
      },
      maxWidth: 'md',
      fullWidth: true,
    },


    onEditingRowCancel: () => {
      AddFromClear();
      setAddProduct(false);
    },

    onEditingRowSave: handleProductEdit,

    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Product Edit</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => editProductDataSet(table, row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleProductDelete(row.original)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
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
  };

  const getColorList = async () => {
    let responce = await colorList();

    console.log(responce.result.data);

    if (responce.result.data.length > 0) {
      setColorList(responce.result.data);
    }
  };


  const AddFromClear = () => {

    setNewRowData({
      awb: "",
      vendor_name: "",

      product_name: "",
      farm_invoice: "",
      po: "",
      received_date: null,
      boxes: "",
      boxtype: "",
      box_unit: "",
      bunch_unit: "",
      cost_unit: "",
      sale_price: "",
      so: "",
      margin: "",


      sku: "",
      real_stock: "",
      real_price: "",
      cost_price: "",
      minqty: "",
      product_tags: [],
      source: "",
      pre_order: "",
      cat_id: [],
      product_color: "",
      uom: "",
      feature_status: "",

    });

    setDisableRows({
      awb: false,
      vendor_name: false,

      product_name: false,
      farm_invoice: false,
      po: false,
      received_date: false,
      boxes: false,
      boxtype: false,
      box_unit: false,
      bunch_unit: false,
      cost_unit: false,
      sale_price: false,
      so: false,
      margin: false,


      sku: false,
      real_stock: false,
      real_price: false,
      cost_price: false,
      minqty: false,
      product_tags: false,
      source: false,
      pre_order: false,
      cat_id: false,
      product_color: false,
      uom: false,
      feature_status: false,

    });

    setImagePreview(null);
    setSelectedImage(null);
    setValidationErrors({});
  }

  useEffect(() => {
    getCategoryList();
    getColorList();
  }, []);

  return (
    <>

      {/* ////////// product add from /////////////// */}
      <div>


        <div>
          {!AddProduct &&
            <Button type="button" sx={{ m: 2 }} variant="contained" onClick={() => setAddProduct(true)}>Add Product</Button>}

          <Button type="button" sx={{
            m: 2,
            backgroundColor: '#ff8c1a',
            '&:hover': {
              backgroundColor: '#e67600',
            },
          }} variant="contained" >Uplaod</Button>

          <Button type="button" sx={{
            m: 2,
            backgroundColor: '#cc3399',
            '&:hover': {
              backgroundColor: '#aa2874',
            },
          }} variant="contained">Export</Button>
        </div>

        {AddProduct && <>
          <div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '70px', height: '70px', marginTop: '10px' }}
              />
            )}
            <CustomInput
              type="file"
              label="Thumb"
              name="image"
              variant="outlined"
              onChange={handleImageChange}
            />
          </div>

          {inputFields?.map((field) => (
            <>

              {(field.type === "text" || field.type === "number") && <CustomInput
                key={field.name}
                disabled={DisableRows[field.name]}
                type={field.type}
                label={field.label}
                name={field.name}
                value={newRowData[field.name]}
                onChange={handleInputChange}
                error={validationErrors?.[field.name]}
                sx={{ marginTop: 1 }}
                variant="outlined"
              />}

              {field.type === "autocomplete" && <CustomInput
                key={field.name}
                disabled={DisableRows[field.name]}
                type={field.type}
                label={field.label}
                name={field.name}
                value={newRowData[field.name]}
                onChange={handleTagChange}
                error={validationErrors?.[field.name]}
                sx={{ marginTop: 1 }}
                variant="outlined"
              />}

              {field.type === "date" && <CustomInput
                key={field.name}
                disabled={DisableRows[field.name]}
                type={field.type}
                label={field.label}
                name={field.name}
                value={newRowData[field.name]}
                onChange={(value) => handleDateChange(field.name, value)}
                error={validationErrors?.[field.name]}
                sx={{ marginTop: 1 }}
                variant="outlined"
              />}

              {field.type === "select" && field.name === "product_color" && <CustomInput
                key={field.name}
                disabled={DisableRows[field.name]}
                type={field.type}
                label={field.label}
                name={field.name}
                value={newRowData[field.name]}
                onChange={handleInputChange}
                error={validationErrors?.[field.name]}
                sx={{ marginTop: 1 }}
                variant="outlined"
                options={ColorList}
              />}

              {field.type === "select" && field.name === "uom" && <CustomInput
                key={field.name}
                disabled={DisableRows[field.name]}
                type={field.type}
                label={field.label}
                name={field.name}
                value={newRowData[field.name]}
                onChange={handleInputChange}
                error={validationErrors?.[field.name]}
                sx={{ marginTop: 1 }}
                variant="outlined"
                options={[{ id: "ST", name: "ST" }]}
              />}


              {field.type === "select" && field.name === "feature_status" && <CustomInput
                key={field.name}
                disabled={DisableRows[field.name]}
                type={field.type}
                label={field.label}
                name={field.name}
                value={newRowData[field.name]}
                onChange={handleInputChange}
                error={validationErrors?.[field.name]}
                sx={{ marginTop: 1 }}
                variant="outlined"
                options={[{ id: "1", name: "Yes" }, { id: "0", name: "No" }]}
              />}

              {field.type === "multiple_select" && field.name === "cat_id" && <CustomInput
                key={field.name}
                disabled={DisableRows[field.name]}
                type={field.type}
                label={field.label}
                name={field.name}
                value={newRowData[field.name]}
                onChange={handleMultipleSelectChange(field.name)}
                error={validationErrors?.[field.name]}
                sx={{ marginTop: 1 }}
                variant="outlined"
                options={CategoryList}
              />}

            </>
          ))}


          <div>
            <Button type="button" sx={{ m: 2 }} variant="contained" onClick={handleProductAdd}>Submit</Button>

            <Button sx={{
              m: 2,
              backgroundColor: '#8585ad',
              '&:hover': { backgroundColor: '#6b6b92' }
            }} variant="contained" onClick={AddFromClear}>Clear</Button>

            <Button type="button" sx={{ m: 2 }} variant="contained" onClick={() => { setAddProduct(false); AddFromClear(); }} color="error">Close</Button>
          </div>
        </>}

      </div>


      {/* {console.log(newRowData?.received_date?.format('YYYY-MM-DD'))} */}

      <MaterialReactTable table={table} />
    </>
  );
}

export default ProductTable;

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
    // onMutate: (newUserInfo) => {
    //   queryClient.setQueryData(["users"], (prevUsers) => [
    //     ...prevUsers,
    //     {
    //       ...newUserInfo,
    //       id: (Math.random() + 1).toString(36).substring(7),
    //     },
    //   ]);
    // },

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
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
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
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}




/**
 * Fetch Products
 */
function UsefetchProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts_2,
  });
}
