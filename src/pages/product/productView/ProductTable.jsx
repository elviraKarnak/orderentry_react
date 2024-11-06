import { useEffect, useMemo, useState } from "react";
import {
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
  Dialog,
  Drawer,
  Grid,
  Checkbox,
} from "@mui/material";

import moment from "moment";

import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";

import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

import {
  useQuery,
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
  fetchProducts_2,
} from "../../../utils/fetch";
import placeholderImage from "../../../assests/images/placeholder.png";

import Swal from "sweetalert2";
import CustomInput from "../../../compoments/CustomInput";
import Uploadfile from "../../../assests/images/file-upload.png";

import dayjs from "dayjs";

import { inputFields, editFields, newRowData, disableRows } from "./Constant";




function ProductTable() {

  const [validationErrors, setValidationErrors] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(Uploadfile);
  const [CategoryList, setCategoryList] = useState([]);
  const [ColorList, setColorList] = useState([]);

  const [AddProduct, setAddProduct] = useState(false);
  const [EditDialog, setEditDialog] = useState(false);

  const [DisableRows, setDisableRows] = useState(disableRows);

  const [NewRowData, setNewRowData] = useState(newRowData);
  const [InputFields, setInputFields] = useState(inputFields);
  const [EditFields, setEditFields] = useState(editFields);

  const [LockAWB, setLockAWB] = useState(false);




  const handleDialogClose = () => {
    setEditDialog(false);
    setNewRowData(newRowData);

    setDisableRows(disableRows);

    setImagePreview(Uploadfile);
    setSelectedImage(null);
    setValidationErrors({});
  };

  const AddFromClear = () => {

    console.log(newRowData)

    setNewRowData(newRowData);

    setDisableRows(disableRows);

    setImagePreview(Uploadfile);
    setSelectedImage(null);
    setValidationErrors({});
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setImagePreview(Uploadfile);
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

  // table column
  const columns = useMemo(
    () => [
      {
        accessorKey: "image_url",
        header: "Thumb",
        Header: () => (
          <i style={{ color: "#aaa" }}>
            <ImageIcon />
          </i>
        ),
        enableEditing: false,
        type: "file",
        size: 30,
        Cell: ({ renderedCellValue }) => (
          <img
            src={
              renderedCellValue === "" ? placeholderImage : renderedCellValue
            }
            alt=""
            style={{ width: "70px", height: "70px" }}
          />
        ),
      },
      {
        accessorKey: "product_name",
        header: "Name",
        enableEditing: false,
        size: 200,
      },
      {
        accessorKey: "sku",
        header: "SKU",
        enableEditing: false,
        size: 30,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "real_price",
        header: "Price",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "cost_price",
        header: "Cost Price",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "minqty",
        header: "Qty",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "product_tags",
        header: "Tags",
        enableEditing: false,
        size: 80,
        Cell: ({ renderedCellValue }) => <>{renderedCellValue}</>,
      },
      {
        accessorKey: "source",
        header: "Source Inventory",
        enableEditing: false,
        size: 10,
      },
      // {
      //   accessorKey: "future_available_status",
      //   header: "Future Status",
      //   enableEditing: false,
      //   size: 5,
      //   Cell: ({ renderedCellValue }) => (
      //     <>
      //       {renderedCellValue === "1" ? (
      //         <StarRateRoundedIcon style={{ color: "blue" }} />
      //       ) : (
      //         <StarOutlineRoundedIcon style={{ color: "blue" }} />
      //       )}
      //     </>
      //   ),
      // },
      {
        accessorKey: "publish_date",
        header: "Publish Date",
        size: 30,
        enableEditing: false,
        Cell: ({ renderedCellValue }) => (
          <>
            {renderedCellValue !== "null" &&
              renderedCellValue !== null &&
              moment.unix(renderedCellValue).format("YYYY-MM-DD h:mm:ss A")}
          </>
        ),
      },
      {
        accessorKey: "pre_order",
        header: "Pre-Order",
        enableEditing: false,
        size: 30,
        Cell: ({ renderedCellValue }) => (
          <>
            {renderedCellValue === "1" ? (
              <CheckSharpIcon style={{ color: "green" }} />
            ) : (
              <CancelSharpIcon style={{ color: "red" }} />
            )}
          </>
        ),
      },
      {
        accessorKey: "category_string",
        header: "Category",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "color_string",
        header: "Color",
        enableEditing: false,
        size: 5,
      },
      {
        accessorKey: "uom",
        header: "UOM",
        enableEditing: false,
        size: 5,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableEditing: false,
        size: 5,
        Cell: ({ renderedCellValue }) => (
          <>
            {renderedCellValue === 'new' && 'New'}
            {renderedCellValue === 'pending' && 'Pending'}
            {renderedCellValue === 'received' && 'Received'}
            {renderedCellValue === 'transferred' && 'Transfer'}
          </>
        ),
      },
    ],
    [validationErrors, imagePreview, CategoryList, NewRowData, ColorList]
  );

  const {
    data: fetchedproducts = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
    refetch: productRefetch,
  } = UsefetchProducts();

  //console.log(fetchedproducts);


  // edit product data set
  const editProductDataSet = (table, row) => {
    AddFromClear();
    setAddProduct(false);

    let rowData = row.original;
    let temp_data = { ...NewRowData };

    // product table
    for (let key in temp_data) {
      // if (temp_data.hasOwnProperty(key)) {
      //   formData.append(key, temp_data[key]);
      // }

      if (key === "product_tags") {
        if (rowData[key]) {
          var temp = rowData[key].split(",");
          temp_data[key] = temp;
        } else {
          temp_data[key] = [];
        }
      } else if (key === "publish_date") {
        if (rowData[key]) {
          const unixTimestamp = Number(rowData[key]);
          const formattedDate = dayjs(unixTimestamp * 1000);
          temp_data[key] = formattedDate;
        }
      }
      else if (key === "received_date") {
        if (rowData[key] !== null) {
          const formattedDate = dayjs(rowData[key]);
          temp_data[key] = formattedDate;
        }
      }
      else if (key === "future_start_date" && rowData['pre_order'] === '1') {
        if (rowData[key] !== null) {
          const formattedDate = dayjs(rowData[key]);
          temp_data[key] = formattedDate;
        }
      }
      else if (key === "future_expire_date" && rowData['pre_order'] === '1') {
        if (rowData[key] !== null) {
          const formattedDate = dayjs(rowData[key]);
          temp_data[key] = formattedDate;
        }
      }
      else if (key === "cat_id") {
        var tempCat = [];

        for (let item of rowData["productCategory"]) {
          tempCat.push(item.category.id);
        }

        temp_data[key] = tempCat;
      } else if (key === "product_color") {
        var tempColor = "";

        for (let item of rowData["productColor"]) {
          tempColor = item.color.id;
        }

        temp_data[key] = tempColor;
      }
      else if (['fob_t_1_m', 'landed_t_1_m', 'fob_t_2_m', 'fob_t_2_qty', 'landed_t_2_m', 'landed_t_2_qty', 'fob_t_3_m', 'fob_t_3_qty', 'landed_t_3_m', 'landed_t_3_qty'].includes(key)) {

        if (rowData['margin_data']) {
          var data = rowData["productMargin"] ? Number(rowData["productMargin"][key]) : 0;

          if (data === 0) {
            temp_data[key] = "";
          } else {
            temp_data[key] = data;
          }
        }

      }
      else {
        if (`${key}` in rowData["productMeta"]) {
          temp_data[key] = rowData["productMeta"][key];
        } else {
          temp_data[key] = rowData[key];
        }
      }
    }

    console.log("temp_data ", temp_data);
    // return;

    temp_data.product_id = rowData.id;
    setNewRowData(temp_data);
    setImagePreview(rowData.image_url);
    // setDisableRows({
    //   product_name: false,
    //   sku: true,
    //   real_stock: true,
    //   real_price: false,
    //   cost_price: false,
    //   minqty: true,
    //   product_tags: false,
    //   source: false,
    //   pre_order: true,
    //   cat_id: false,
    //   product_color: false,
    //   uom: false,
    //   feature_status: false,
    //   publish_date: true,
    // });
    setDisableRows({
      product_name: false,
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
      feature_available_status: false,
      publish_date: false,
    });
    // table.setEditingRow(row);
    setEditDialog(true);

  };

  const validate = (data) => {
    const errors = {};

    if (!data.vendor_name.trim()) {
      errors.vendor_name = "vendor name is required";
    }

    if (!data.farm_invoice.trim()) {
      errors.farm_invoice = "farm invoice is required";
    }

    if (data.received_date === null) {
      errors.received_date = "received date is required";
    }

    if (!data.product_name.trim()) {
      errors.product_name = "product name is required";
    }

    if (data.sku === '') {
      errors.sku = "SKU is required";
    }

    if (data.boxes === '') {
      errors.boxes = "boxes is required";
    }

    if (data.boxtype === '') {
      errors.boxtype = "boxtype is required";
    }

    if (data.unit_per_box === '') {
      errors.unit_per_box = "unit/box unit is required";
    }

    if (data.unit_per_bunch === '') {
      errors.unit_per_bunch = "unit/bunch unit is required";
    }

    if (data.cost_per_unit === '') {
      errors.cost_per_unit = "unit/cost is required";
    }

    if (data.sale_price === '') {
      errors.sale_price = "sale price is required";
    }

    // if (data.so === '') {
    //   errors.so = "so is required";
    // }


    if (data.cat_id.length === 0) {
      errors.cat_id = "category is required";
    }


    if (!data.product_color.trim()) {
      errors.product_color = "product color is required";
    }

    if (!data.shop_by_branch.trim()) {
      errors.shop_by_branch = "shop by branch is required";
    }


    if (!data.pre_order.trim()) {
      errors.pre_order = "Pre Order available is required";
    }
    else {
      if (data.pre_order === '1') {
        if (data.future_start_date === null) {
          errors.future_start_date = "future start date is required";
        }


        if (data.future_expire_date === null) {
          errors.future_expire_date = "future expire date is required";
        }
      }
    }




    // if (!data.margin.trim()) {
    //   errors.margin = "margin is required";
    // }

    // if (!data.product_name.trim()) {
    //   errors.product_name = "Product name is required";
    // }

    // if (isNaN(data.real_stock) || data.real_stock === "") {
    //   errors.real_stock = "Real stock must be a number";
    // }

    // if (isNaN(data.real_price) || data.real_price === "") {
    //   errors.real_price = "Real price must be a number";
    // }

    // if (isNaN(data.cost_price) || data.cost_price === "") {
    //   errors.cost_price = "Cost price must be a number";
    // }

    // if (isNaN(data.minqty) || data.minqty === "") {
    //   errors.minqty = "Minimum quantity must be a number";
    // }

    // if (!Array.isArray(data.product_tags)) {
    //   errors.product_tags = "Product tags is required";
    // }

    // if (!data.source.trim()) {
    //   errors.source = "Source is required";
    // }

    // if (!Array.isArray(data.cat_id)) {
    //   errors.cat_id = "Category is required";
    // } else {
    //   if (data.cat_id.length === 0) {
    //     errors.cat_id = "Category is required";
    //   }
    // }

    // if (!data.product_color) {
    //   errors.product_color = "Product color is required";
    // }

    // if (!data.uom.trim()) {
    //   errors.uom = "Unit of measure is required";
    // }

    // if (!data.feature_status.trim()) {
    //   errors.feature_status = "Feature status is required";
    // }

    return errors;
  };

  //CREATE action
  const handleProductAdd = async () => {
    // console.log("handleProductAdd ", values);
    console.log("NewRowData ", NewRowData);
    // console.log("selectedImage ", selectedImage);

    // return;

    let temp_data = { ...NewRowData };

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

    if (temp_data?.received_date !== null) {
      temp_data.received_date = temp_data.received_date.format("YYYY-MM-DD");
    }


    if (temp_data?.future_start_date !== null) {
      temp_data.future_start_date = temp_data.future_start_date.format("YYYY-MM-DD");
    }


    if (temp_data?.future_expire_date !== null) {
      temp_data.future_expire_date = temp_data.future_expire_date.format("YYYY-MM-DD");
    }

    if (temp_data?.publish_date !== null) {
      temp_data.publish_date = temp_data.publish_date.unix();
    }

    let formData = new FormData();

    for (let key in temp_data) {
      if (temp_data.hasOwnProperty(key)) {
        formData.append(key, temp_data[key]);
      }
    }

    // console.log("formData ", temp_data);

    // return;

    var responce = await ProductAdd(formData);

    if (responce.status) {
      Swal.fire({
        text: "Product added successfully.",
        icon: "success",
      });

      AddFromClear();

      if (LockAWB) {
        var TempnewRowData = newRowData;

        TempnewRowData.awb = NewRowData.awb;
        TempnewRowData.vendor_name = NewRowData.vendor_name;
        TempnewRowData.farm_invoice = NewRowData.farm_invoice;
        TempnewRowData.received_date = dayjs(NewRowData.received_date);
        setNewRowData(TempnewRowData);
      }
      else {
        setNewRowData(newRowData);
      }
    }

    // console.log("handleProductAddApi ", responce);

    productRefetch();
  };

  //UPDATE action
  const handleProductEdit = async (event) => {
    event.preventDefault();

    // console.log("handleProductEdit ", values);
    // console.log("NewRowData ", NewRowData);
    // return;

    let temp_data = NewRowData;

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

    // console.log(temp_data);
    // return;

    let formData = new FormData();

    for (let key in temp_data) {
      if (temp_data.hasOwnProperty(key)) {
        if (temp_data[key] === null || temp_data[key] === undefined) {
          formData.append(key, "");
        } else if (key === "publish_date") {
          let publish_date = temp_data[key].unix();
          formData.append(key, publish_date);
        } else {
          formData.append(key, temp_data[key]);
        }
      }
    }

    // console.log(first)

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
        text: "Product updated successfully.",
        icon: "success",
      });
    }

    // console.log("handleProductEdit ", responce);

    AddFromClear();
    handleDialogClose();
    // await createUser(values);
    // table.setEditingRow(null); //exit editing mode
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
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var responce = await ProductDelete({
          product_id: rowData.id,
        });

        if (responce.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });

          productRefetch();
        }
      }
    });
  };

  // product table setting //
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
        width: "100%",
      },
      maxWidth: "md",
      fullWidth: true,
    },

    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        backgroundColor: row.original.status === "new" ? "lightblue" : (row.original.status === "transferred" ? "lightgreen" : "white"),
      },
    }),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => editProductDataSet(table, row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => handleProductDelete(row.original)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    state: {
      isLoading: isLoadingUsers,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  const getCategoryList = async () => {
    let responce = await categoryList();

    console.log(responce.result.data);

    if (responce.result.data.length > 0) {

      var temp = responce.result.data.map(item => {
        return { label: item.name, value: item.id }
      })

      // console.log("setCategoryList ", temp);

      // var allInputFields = InputFields.map((item) => {
      //   if (item.name === 'cat_id') {
      //     item.options = temp;
      //   }
      //   return item;
      // })

      setInputFields((pre) => (
        pre.map((item) => {

          if (item.name === 'cat_id') {
            item.options = temp;
          }
          return item;
        })

      ));

      setEditFields((pre) => (
        pre.map((item) => {

          if (item.name === 'cat_id') {
            item.options = temp;
          }
          return item;
        })

      ));

      // console.log("allInputFields ", allInputFields)
      // setInputFields(allInputFields)


      // setCategoryList(temp);
      // setCategoryList(responce.result.data);
    }
  };

  const getColorList = async () => {
    let responce = await colorList();

    console.log(responce.result.data);

    if (responce.result.data.length > 0) {

      var temp = responce.result.data.map(item => {
        return { label: item.name, value: `${item.id}` }
      })


      setInputFields((pre) => (
        pre.map((item) => {

          if (item.name === 'product_color') {
            item.options = temp;
          }
          return item;
        })

      ));


      setEditFields((pre) => (
        pre.map((item) => {

          if (item.name === 'product_color') {
            item.options = temp;
          }
          return item;
        })

      ));

      // console.log("setColorList ", temp)
      // setColorList(temp);
      // setColorList(responce.result.data);
    }
  };



  useEffect(() => {
    getCategoryList();
    getColorList();
  }, []);





  return (
    <>
      {/* ////////// product add from /////////////// */}
      <div className="product_view-wrap row">
        <div className="full_w-btn col-md-12">

          {/* <Checkbox checked={LockAWB} onChange={() => setLockAWB(!LockAWB)} /> */}

          {!AddProduct && (
            <Button
              type="button"
              sx={{ m: 2 }}
              variant="contained"
              onClick={() => setAddProduct(true)}
            >
              Add Product
            </Button>
          )}

          <Button
            type="button"
            sx={{
              m: 2,
              backgroundColor: "#ff8c1a",
              "&:hover": {
                backgroundColor: "#e67600",
              },
            }}
            variant="contained"
          >
            Uplaod
          </Button>

          <Button
            type="button"
            sx={{
              m: 2,
              backgroundColor: "#cc3399",
              "&:hover": {
                backgroundColor: "#aa2874",
              },
            }}
            variant="contained"
          >
            Export
          </Button>
        </div>

        <div>
          {AddProduct && (
            <>
              {/* <div className="file_upload-bx">
                <CustomInput
                  type="file"
                  label="Upload Product Image"
                  name="image"
                  variant="outlined"
                  onChange={handleImageChange}
                  imagePreview={imagePreview}

                />
              </div> */}

              <div className="col-md-2">
                {InputFields?.map((field) => (
                  <>

                    {(field.type === "text" || field.type === "number") && (
                      <CustomInput
                        key={field.name}
                        disabled={DisableRows[field.name]}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        value={NewRowData[field.name]}
                        onChange={handleInputChange}
                        error={validationErrors?.[field.name]}
                        sx={{ m: 1, minWidth: 150 }}
                        variant="outlined"
                      />
                    )}

                    {field.type === "autocomplete" && (
                      <CustomInput
                        key={field.name}
                        disabled={DisableRows[field.name]}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        value={NewRowData[field.name]}
                        onChange={handleTagChange}
                        error={validationErrors?.[field.name]}
                        sx={{ m: 1, minWidth: 400 }}
                        variant="outlined"
                      />
                    )}

                    {field.type === "date" && (
                      <CustomInput
                        key={field.name}
                        disabled={DisableRows[field.name]}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        value={NewRowData[field.name]}
                        onChange={(value) => handleDateChange(field.name, value)}
                        error={validationErrors?.[field.name]}
                        sx={{ m: 1, minWidth: 150 }}
                        variant="outlined"
                      />
                    )}

                    {field.type === "dateTime" && (
                      <CustomInput
                        key={field.name}
                        disabled={DisableRows[field.name]}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        value={NewRowData[field.name]}
                        onChange={(value) => handleDateChange(field.name, value)}
                        error={validationErrors?.[field.name]}
                        sx={{ m: 1, minWidth: 150 }}
                        variant="outlined"
                      />
                    )}

                    {field.type === "select" && (
                      <CustomInput
                        key={field.name}
                        disabled={DisableRows[field.name]}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        value={NewRowData[field.name]}
                        onChange={handleInputChange}
                        error={validationErrors?.[field.name]}
                        sx={{ m: 1, minWidth: 150 }}
                        variant="outlined"
                        // options={field.name === "product_color" ? ColorList : field.options}
                        options={field.options}
                      />
                    )}

                    {/* {field.type === "select" && field.name === "uom" && (
                      <CustomInput
                        key={field.name}
                        disabled={DisableRows[field.name]}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        value={NewRowData[field.name]}
                        onChange={handleInputChange}
                        error={validationErrors?.[field.name]}
                        sx={{ m: 1, minWidth: 150 }}
                        variant="outlined"
                        options={[{ id: "ST", name: "ST" }]}
                      />
                    )}

                    {field.type === "select" && field.name === "feature_status" && (
                      <CustomInput
                        key={field.name}
                        disabled={DisableRows[field.name]}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        value={NewRowData[field.name]}
                        onChange={handleInputChange}
                        error={validationErrors?.[field.name]}
                        sx={{ m: 1, minWidth: 150 }}
                        variant="outlined"
                        options={[
                          { id: "1", name: "Yes" },
                          { id: "0", name: "No" },
                        ]}
                      />
                    )} */}

                    {field.type === "multiple_select" &&
                      (<CustomInput
                        key={field.name}
                        disabled={DisableRows[field.name]}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        value={NewRowData[field.name]}
                        onChange={handleMultipleSelectChange(field.name)}
                        error={validationErrors?.[field.name]}
                        sx={{ m: 1, minWidth: 150 }}
                        variant="outlined"
                        // options={field.name === "cat_id" ? CategoryList : field.options}
                        options={field.options}
                      />
                      )}

                  </>
                ))}


                {NewRowData.pre_order === '1' && (
                  <>
                    <CustomInput
                      type="date"
                      label="Future Start Date"
                      name="future_start_date"
                      value={NewRowData.future_start_date}
                      onChange={(value) => handleDateChange('future_start_date', value)}
                      error={validationErrors?.future_start_date}
                      sx={{ m: 1, minWidth: 150 }}
                      variant="outlined"
                    />

                    <CustomInput
                      type="date"
                      label="Future Expire Date"
                      name="future_expire_date"
                      value={NewRowData.future_expire_date}
                      onChange={(value) => handleDateChange('future_expire_date', value)}
                      error={validationErrors?.future_expire_date}
                      sx={{ m: 1, minWidth: 150 }}
                      variant="outlined"
                    />
                  </>
                )}

              </div>


              <div className="col-md-12">
                <Button
                  type="button"
                  sx={{ m: 2 }}
                  variant="contained"
                  onClick={handleProductAdd}
                >
                  Submit
                </Button>

                <Button
                  sx={{
                    m: 2,
                    backgroundColor: "#8585ad",
                    "&:hover": { backgroundColor: "#6b6b92" },
                  }}
                  variant="contained"
                  onClick={AddFromClear}
                >
                  Clear
                </Button>

                <Button
                  type="button"
                  sx={{ m: 2 }}
                  variant="contained"
                  onClick={() => {
                    setAddProduct(false);
                    AddFromClear();
                  }}
                  color="error"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* {console.log(NewRowData?.publish_date?.unix())} */}

      <MaterialReactTable table={table} />

      {/* ////////////////// Edit Product Dialog  ////////// */}
      <Dialog
        open={EditDialog}
        onClose={handleDialogClose}
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{
          component: "form",
          onSubmit: handleProductEdit,
        }}
      >
        <DialogTitle key={"title"}>Product Edit</DialogTitle>
        <DialogContent>
          <div className="product_view-wrap">
            <div className="full_w-btn">
              <div className="file_upload-bx">
                <CustomInput
                  type="file"
                  label="Upload Product Image"
                  name="image"
                  variant="outlined"
                  onChange={handleImageChange}
                  imagePreview={imagePreview}
                />
              </div>
            </div>
          </div>

          {EditFields?.map((field) => (
            <>

              {(field.type === "label_p") && (
                <CustomInput
                  type={field.type}
                  label={field.label}
                  sx={{ m: 1, minWidth: "100%" }}
                  variant="outlined"
                />
              )}

              {(field.type === "label_h5") && (
                <CustomInput
                  type={field.type}
                  label={field.label}
                  sx={{ m: 1, minWidth: "100%" }}
                  variant="outlined"
                />
              )}

              {(field.type === "text" || field.type === "number") && (
                <CustomInput
                  key={field.name}
                  disabled={DisableRows[field.name]}
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  value={NewRowData[field.name]}
                  onChange={handleInputChange}
                  error={validationErrors?.[field.name]}
                  sx={{ m: 1, minWidth: "100%" }}
                  variant="outlined"
                />
              )}

              {field.type === "autocomplete" && (
                <CustomInput
                  key={field.name}
                  disabled={DisableRows[field.name]}
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  value={NewRowData[field.name]}
                  onChange={handleTagChange}
                  error={validationErrors?.[field.name]}
                  sx={{ m: 1, minWidth: "100%" }}
                  variant="outlined"
                />
              )}

              {field.type === "date" && (
                <CustomInput
                  key={field.name}
                  disabled={DisableRows[field.name]}
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  value={NewRowData[field.name]}
                  onChange={(value) => handleDateChange(field.name, value)}
                  error={validationErrors?.[field.name]}
                  sx={{ m: 1, minWidth: "100%" }}
                  variant="outlined"
                />
              )}

              {field.type === "dateTime" && (
                <CustomInput
                  key={field.name}
                  disabled={DisableRows[field.name]}
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  value={NewRowData[field.name]}
                  onChange={(value) => handleDateChange(field.name, value)}
                  error={validationErrors?.[field.name]}
                  sx={{ m: 1, minWidth: "100%" }}
                  variant="outlined"
                />
              )}

              {field.type === "select" && (
                <CustomInput
                  key={field.name}
                  disabled={DisableRows[field.name]}
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  value={NewRowData[field.name]}
                  onChange={handleInputChange}
                  error={validationErrors?.[field.name]}
                  sx={{ m: 1, minWidth: "100%" }}
                  variant="outlined"
                  options={field.options}
                />
              )}


              {field.type === "multiple_select" && (
                <CustomInput
                  key={field.name}
                  disabled={DisableRows[field.name]}
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  value={NewRowData[field.name]}
                  onChange={handleMultipleSelectChange(field.name)}
                  error={validationErrors?.[field.name]}
                  sx={{ m: 1, minWidth: "100%" }}
                  variant="outlined"
                  options={field.options}
                />
              )}


            </>
          ))}


          {NewRowData.pre_order === '1' && (
            <>
              <CustomInput
                type="date"
                label="Future Start Date"
                name="future_start_date"
                value={NewRowData.future_start_date}
                onChange={(value) => handleDateChange('future_start_date', value)}
                error={validationErrors?.future_start_date}
                sx={{ m: 1, minWidth: 150 }}
                variant="outlined"
              />

              <CustomInput
                type="date"
                label="Future Expire Date"
                name="future_expire_date"
                value={NewRowData.future_expire_date}
                onChange={(value) => handleDateChange('future_expire_date', value)}
                error={validationErrors?.future_expire_date}
                sx={{ m: 1, minWidth: 150 }}
                variant="outlined"
              />
            </>
          )}

        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="button" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductTable;

/**
 * Fetch Products
 */
function UsefetchProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts_2,
  });
}
