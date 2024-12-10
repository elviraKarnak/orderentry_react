import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import AddImage from "../../assests/images/add.png";
import AddCircleOut from "../../assests/images/add-circle-outline-white.png";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import moment from "moment";
// import CustomerSelectDropdown from "../../compoments/customer/CustomerSelectDropdown";
import CustomerAutoSearch from "../../compoments/customer/CustomerAutoSearch";
import customerService from "../../services/customer.service";
import CustomerEditModalForm from "../../compoments/customer/EditModalForm";
import Swal from "sweetalert2";
import productService from "../../services/product.service";
import orderService from "../../services/order.service";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import { userContext } from "../../Store";
import CheckoutModal from "../../compoments/CheckoutModal";
import Loader from "../../pages/Loader/CommonLoader";
import ImageShowModal from "./ImageShowModal";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import {
  fmiOrderSystemAppOrderAdd,
  fmiOrderSystemAppProductOrderEntrySearch,
} from "../../utils/fetch";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from "react-redux";
import { commonActions } from "../../redux/reducers/Common";


// Register the locale
registerLocale('es', es);


function NewOrder() {

  const dispatchReduxStore = useDispatch();

  const { userState, dispatch } = useContext(userContext);
  const [ProductName, setProductName] = useState("");
  const [DeliveryDate, setDeliveryDate] = useState(null);
  const [Customer, setCustomer] = useState(false);
  const [CustomerData, setCustomerData] = useState([]);
  const [Step, setStep] = useState(1);
  const [SelectCustomerData, setSelectCustomerData] = useState(null);
  const [EditModalChangeStatus, setEditModalChangeStatus] = useState(false);
  const [AddItem, setAddItem] = useState(false);
  const [OrderId, setOrderId] = useState(null);
  const [CustomerId, setCustomerId] = useState(null);
  const [AddProductArr, setAddProductArr] = useState([]);
  const [CheckOutModal, setCheckOutModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageShowModal, setImageShowModal] = useState(false);
  const [ImageURL, setImageURL] = useState("");
  //const [DeliveryDate, setImageURL] = useState("");
  const navigate = useNavigate();

  const [productData2, setProductData2] = useState([]);

  const [ProductDataSearch, setProductDataSearch] = useState({
    limit: "",
    page: "",
    search_text: "",
    shop_by_branch: true
  });

  const [ProductData, setProductData] = useState([]);
  const [OrderItemsData, setOrderItemsData] = useState([]);

  // const [TotalPM, setTotalPM] = useState({
  //   margin: 0,
  //   total: 0,
  // });

  const [availableDates, setAvailableDates] = useState({
    minDate: new Date(), // Current date - All dates before the current date will be disabled
    maxDate: null, // All dates after 5 days from the current date will be enabled
  });

  const location = useLocation();

  const calculateMaxDate = () => {
    // Calculate the minimum and maximum selectable dates
    const today = moment();

    // Set the time for 3:00 PM
    const threePMToday = moment().set({
      hour: 15,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    // Compare the current date with 3:00 PM
    const isAfterThreePM = today.isAfter(threePMToday);
    const isBeforeThreePM = today.isBefore(threePMToday);

    if (isBeforeThreePM) {
      const minDate = today.clone().add(5, "days").toDate();
      const maxDate = today.toDate();
      setAvailableDates({ ...availableDates, minDate: minDate });
    }

    if (isAfterThreePM) {
      const minDate = today.clone().add(6, "days").toDate();
      const maxDate = today.toDate();
      setAvailableDates({ ...availableDates, minDate: minDate });
    }
  };

  const shipMethodChange = async (e) => {
    if (e.target.value == "") {
      toast.warning("plecace select shiping method!");
      return;
    }

    var preCustomerData = SelectCustomerData;
    preCustomerData.ship_addr.ship_method = e.target.value;
    setSelectCustomerData(preCustomerData);

    setLoader(true);
    var value = e.target.value;
    var id = SelectCustomerData.ship_addr.id;

    var responce = await customerService.updateShipMethod({
      ship_method: value,
      id: id,
    });
    setLoader(false);
  };

  // const getCustomerList = async () => {
  //     var responce = await customerService.findAll("");
  //     setCustomerData(responce.data.data)
  // }

  const addCustomer = () => {
    // alert(Customer)
    setCustomer((pre) => (pre ? false : true));
  };

  const newOrderSaveAndContinueChk = async () => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You want to save this order!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes",
    //   cancelButtonText: "Cancel",
    // }).then(async (result) => {

    //   if (result.isConfirmed) {
    //     if (userState.OrderItemsData.length === 0) {
    //       toast.warning("Item Not select!");
    //     } else {
    //       //  =========== modal open ========
    //       setCheckOutModal(true);
    //     }
    //   } else {
    //     //  ============= order save ===========
    //     await NewOrderSave();
    //   }

    // });

    var OrderItemsData = userState.ProductData.filter((item) => item.status === 'order');

    if (OrderItemsData.length === 0) {
      toast.warning('Please select product at frist');
      return
    }

    //  =========== modal open ========
    setCheckOutModal(true);
  };

  // ========== use ========
  const ProductList = async () => {
    console.log("DeliveryDate ", DeliveryDate);

    if (DeliveryDate == undefined || DeliveryDate == null) {
      toast.warning("Please select delivery date");
      return;
    }

    // console.log(
    //   "SelectCustomerData.ship_addr.ship_method ",
    //   SelectCustomerData.ship_addr
    // );

    var payload = {
      search_text: ProductDataSearch.search_text.trim(),
      shipping_model: SelectCustomerData?.ship_addr?.ship_method === "fob" ? "fob" : "landed", // landed or fob
      page: ProductDataSearch.page,
      limit: ProductDataSearch.limit,
      shop_by_branch: ProductDataSearch.shop_by_branch ? '1' : '0',
    };

    // alert(JSON.stringify(payload));

    // var responce = await productService.productSearch(payload);
    let responce = await fmiOrderSystemAppProductOrderEntrySearch(payload);

    console.log(responce, " ======== product node data ====");

    // return;

    if (responce.status) {
      if (responce.result.results.length === 0) {
        // === replace_ProductData ====
        dispatch({ type: "replace_ProductData", value: [] });
      } else {

        const tempProductDataArr = userState.ProductData || [];
        const tempArr = [];

        console.log("Initial Product Data: ", tempProductDataArr);

        // Checking existing ProductData
        for (const item of tempProductDataArr) {
          if (item.status === "order") {
            tempArr.push(item);
          }
        }

        console.log("Products with 'order' status retained: ", tempArr);


        for (const i of responce.result.results) {
          // Check if the product already exists in the current order
          const existingProduct = tempProductDataArr.find(
            (item) =>
              item.status === "order" &&
              item.product_details.id === i.id
          );

          if (!existingProduct) {
            // Calculate total price for new products
            const total_price = (
              ((Number(i.cost_price) * 100) / (100 - Number(i.margin_data.t_1_m))) *
              Number(i.minqty)
            ).toFixed(2);

            // Create a new product object
            const newProduct = {
              product_details: i,
              quantity: i.minqty,
              total: total_price,
              margin: i.margin_data.t_1_m,
              temp_product_id: i.id,
              status: "new",
            };

            tempArr.push(newProduct);
          }
        }

        console.log("tempArr 2 ", tempArr);

        // alert(AddItem)

        // === replace_ProductData ====
        dispatch({ type: "replace_ProductData", value: tempArr });
      }
    }

  };

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['orderEntryProductList'],
  //   queryFn: ProductList
  // });



  // ======= wordpress product list api call (not use) ====== //
  const ProductList2 = async () => {
    try {
      if (DeliveryDate === undefined) {
        toast.warning("Please select delivery date");
        return;
      }

      setLoader(true);

      // === order_data_reset ====
      dispatch({ type: "order_data_reset" });

      if (!AddItem) {
        setAddItem((pre) => (pre ? false : true));

        var deliveryDate = moment(DeliveryDate).format("MM/DD/YYYY");
        var ship_method =
          SelectCustomerData.ship_addr.ship_method === "fob" ? "fob" : "landed";

        const responce = await axios.get(
          `${process.env.REACT_APP_WORDPRESS_API_SERVICE_URL}/getproducts/v1/product_filter_listing?model=${ship_method}&date_text=${deliveryDate}&page_no=1&pact=&pcolor&psource&isbybunch&searchquery=${ProductName}&filter_opt`
        );

        // console.log(responce.data, " ======== product data ====")

        if (responce.data.items.length > 0) {
          var tempArr = userState.ProductData;

          var pIdArr = [];

          for (var item of tempArr) {
            var p_id = item.product_details.id;
            pIdArr.push(p_id);
          }

          for (var i of responce.data.items) {
            if (!pIdArr.includes(i.id)) {
              var temp = {
                product_details: i,
                quantity: "",
                total: 0.0,
                margin: 0,
              };

              tempArr.push(temp);
            }
          }

          console.log("tempArr  ", tempArr);

          // alert(AddItem)

          // === replace_ProductData ====
          dispatch({ type: "replace_ProductData", value: tempArr });
        }
      } else {
        setAddItem((pre) => (pre ? false : true));
      }

      setLoader(false);
      // setProductData2(response.data.items)
      // console.log("dsadsadsad", response);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
      setLoader(false);
    }
  };

  const ProductNameSearch = async (search_p_name) => {
    if (DeliveryDate === undefined) {
      toast.warning("Please select delivery date");
      return;
    }

    setLoader(true);

    // === order_data_reset ====
    // dispatch({ type: "order_data_reset" });

    setProductName(search_p_name);

    // setAddItem(true)

    var deliveryDate = moment(DeliveryDate).format("MM/DD/YYYY");
    var ship_method =
      SelectCustomerData.ship_addr.ship_method === "fob" ? "fob" : "landed";

    const responce = await axios.get(
      `${process.env.REACT_APP_WORDPRESS_API_SERVICE_URL}/getproducts/v1/product_filter_listing?model=${ship_method}&date_text=${deliveryDate}&page_no=1&pact=&pcolor&psource&isbybunch&searchquery=${search_p_name}&filter_opt`
    );

    // console.log(responce.data, " ======== product data ====")

    if (responce.data.items.length > 0) {
      var tempArr = [];

      for (var i of responce.data.items) {
        var temp = {
          product_details: i,
          quantity: "",
          total: 0.0,
          margin: 0,
        };

        tempArr.push(temp);
      }

      console.log("tempArr_2  ", tempArr);

      // alert(AddItem)

      // === replace_ProductData ====
      dispatch({ type: "replace_ProductData", value: tempArr });
    }

    setLoader(false);
  };



  const NewOrderAdd_2 = async (index, product_item_id, product_quantity) => {
    // ================ new array create =======

    if (product_quantity === "") {
      toast.warning("pleace select product quantity!");
      return;
    }

    const indexToUpdate = index;
    if (indexToUpdate !== -1) {
      const updatedData = [...userState.ProductData];

      // ------- total -------
      updatedData[indexToUpdate] = {
        ...updatedData[indexToUpdate],
        status: 'order',
      };

      // === replace_ProductData ====
      dispatch({ type: "replace_ProductData", value: updatedData });

    }
  };


  /// ============== set ImageShowModal image url =============
  const setImageShowModalUrl = (url) => {
    setImageURL(url);
    setImageShowModal(true);
  };

  const TotalAmountCount = async () => {
    // var no_product = userState.OrderItemsData.length;
    var no_product = 0;
    var total = 0;
    var margin = 0;

    for (var i of userState.ProductData) {
      if (i.status == 'order') {
        no_product += 1;
      }
    }

    for (var i of userState.ProductData) {
      if (i.status == 'order') {
        total += Number(i.total);
      }
    }

    for (var i of userState.ProductData) {
      if (i.status == 'order') {
        margin += Number(i.margin);
      }
    }

    var t_mergin = isNaN(margin / no_product) ? 0 : margin / no_product;

    var obj = {
      total: total.toFixed(2),
      margin: t_mergin,
    };

    console.log("TotalAmountCount: ", obj)
    // console.log("TotalAmountCount: ",userState.ProductData)

    // === set TotalPM ====
    dispatch({ type: "TotalPM", value: obj });
  };


  const quantityList = (min, stock) => {
    // alert(min, stock)
    // var ii = (stock / min);

    // var temp = '<option value="" >select</option>';

    // for (var i = 1; i <= ii; i++) {
    //     temp += `<option value=${min * i} >${min * i}</option>`
    // }

    // return parse(temp)

    const quantities = [];

    for (let i = min; i <= stock; i += min) {
      quantities.push(i);
    }

    // Check if the stock itself is not a multiple of min and add it if necessary
    if (stock % min !== 0) {
      quantities.push(stock);
    }

    var temp = '<option value="" >select</option>';
    for (var [index, i] of quantities.entries()) {
      if (index === 0) {
        temp += `<option value=${i} selected >${i}</option>`;
      } else {
        temp += `<option value=${i} >${i}</option>`;
      }
    }

    return parse(temp);
  };



  const quantityListValueset_2 = (
    index,
    temp_product_id,
    quantity,
    landed_price,
    fob_price,
    margin_data
  ) => {
    // Find the index of the object with id 2
    // const indexToUpdate = ProductData.findIndex(item => item.id === 2);

    var price =
      SelectCustomerData.ship_addr.ship_method === "fob"
        ? fob_price
        : landed_price;

    // array under id object index

    var indexToUpdate = index;

    // var indexToUpdate = userState.ProductData.map((item, inner_index) =>
    //   item.temp_product_id == temp_product_id ? inner_index : -1
    // );

    if (indexToUpdate !== -1) {
      // Create a new array with the updated value
      const updatedData = [...userState.ProductData];

      // var indexToUpdate = updatedData.find((item, inner_index) => item.temp_product_id == temp_product_id).product_details.id;

      // alert(`${temp_product_id},'=====>',${indexToUpdate}`)
      // return;

      var margin = 0;

      console.log("margin_data ", margin_data);

      if (margin_data.t_2_isSet === true && margin_data.t_3_isSet === true) {
        if (quantity >= margin_data.t_1_qty && quantity < margin_data.t_2_qty) {
          margin = margin_data.t_1_m;
        } else if (
          quantity >= margin_data.t_2_qty &&
          quantity < margin_data.t_3_qty
        ) {
          margin = margin_data.t_2_m;
        } else {
          margin = margin_data.t_3_m;
        }
      } else if (margin_data.t_2_isSet === true) {
        if (quantity >= margin_data.t_1_qty && quantity < margin_data.t_2_qty) {
          margin = margin_data.t_1_m;
        } else {
          margin = margin_data.t_2_m;
        }
      } else if (margin_data.t_3_isSet === true) {
        if (quantity >= margin_data.t_1_qty && quantity < margin_data.t_3_qty) {
          margin = margin_data.t_1_m;
        } else {
          margin = margin_data.t_3_m;
        }
      } else {
        margin = margin_data.t_1_m;
      }

      // alert(margin)

      // ------- quantity -------
      updatedData[indexToUpdate] = {
        ...updatedData[indexToUpdate],
        quantity: quantity,
      };

      // ------- margin -------
      updatedData[indexToUpdate] = {
        ...updatedData[indexToUpdate],
        margin: margin,
      };

      var total_price = (Number(price) * 100) / (100 - margin);
      total_price = (total_price * Number(quantity)).toFixed(2);
      // ------- total -------
      updatedData[indexToUpdate] = {
        ...updatedData[indexToUpdate],
        total: total_price,
      };

      // ------- margin -------
      // var sale_price = Number(quantity) * Number(unit_price);
      // var buy_price = Number(quantity) * Number(cost_price);
      // var margin = (((sale_price - buy_price) / sale_price) * 100).toFixed(2);

      // updatedData[indexToUpdate] = { ...updatedData[indexToUpdate], margin: (margin !== 'NaN' ? margin : 0) };

      // Set the state with the updated array

      // === replace_ProductData ====
      dispatch({ type: "replace_ProductData", value: updatedData });

      // var stateChangeData = {
      //   replace_ProductData: updatedData,
      // };

      /////////////////////////////////////////////////////////////////////

      // var indexToUpdate = updatedData.find((item, inner_index) => item.temp_product_id == temp_product_id).product_details.id;

      // if (indexToUpdate !== -1 && userState.OrderItemsData.length > 0) {

      //   // indexToUpdate = userState.OrderItemsData.map((item, inner_index) =>
      //   //   item.temp_product_id === temp_product_id ? inner_index : -1
      //   // );

      //   // Create a new array with the updated value
      //   // const updatedData = userState.ProductData[indexToUpdate];
      //   const productUpdatedData = updatedData[indexToUpdate];

      //   if (
      //     userState.AddProductArr.includes(
      //       productUpdatedData.product_details.id
      //     )
      //   ) {
      //     // toast.warning("Product alredy selected!")

      //     var newOrderItemData = userState.OrderItemsData.map((item) =>
      //       item.product_details.id === productUpdatedData.product_details.id
      //         ? productUpdatedData
      //         : item
      //     );

      //     // console.log("newOrderItemData ", newOrderItemData);

      //     // === replace_OrderItemsData ====
      //     // dispatch({ type: "replace_OrderItemsData", value: newOrderItemData });

      //     stateChangeData.replace_OrderItemsData = newOrderItemData;
      //   } 
      // }
      // dispatch({
      //   type: "replace_ProductData_OrderItemsData_AddProductArr_OrderItemsData",
      //   value: stateChangeData,
      // });
    }
  };


  useEffect(()=>{
    dispatchReduxStore(commonActions.setPageTitle("Order Entry"))
  },[])

  useEffect(() => {
    calculateMaxDate();
    // getCustomerList();
    // console.log(SelectCustomerData);
  }, [SelectCustomerData]);

  useEffect(() => {
    TotalAmountCount();
  }, [userState.ProductData]);

  // ======= reset pre vious data ==========
  useEffect(() => {
    // =========== selected customer value set =============
    if (location.state !== null) {
      // console.log("location.state.selectCustomerData ",location.state.selectCustomerData)
      setSelectCustomerData(location.state.selectCustomerData);
    }

    // === order_data_reset ====
    dispatch({ type: "order_data_reset" });
  }, []);

  // console.log("userState.ProductData ",userState.ProductData)


  useEffect(() => {
    if ((DeliveryDate != undefined) || (DeliveryDate != null)) {
      ProductList();
    }
  }, [ProductDataSearch, DeliveryDate])

  return (
    <>
      {loader && <Loader />}


      <Container>
        <div className="billing-grid order-bill">
          <h2>New Order</h2>
          <Row className="order_top_row d-lg-flex align-items-center">
            {/* ======= customer select ========= */}
            {SelectCustomerData == null && (
              <Col lg={9}>
                {!Customer && (
                  <div className="add-customer">
                    <div className="create-btn-sec">
                      <img src={AddImage} alt="" />
                      <Button
                        type="button"
                        className="create-btn"
                        onClick={addCustomer}
                      >
                        + Add a customer
                      </Button>
                    </div>
                  </div>
                )}

                {/*  =========== customer search ======= */}
                {Customer && (
                  <>
                    {/* <CustomerSelectDropdown options={CustomerData} setSelectCustomerData={setSelectCustomerData} EditModalChangeStatus={EditModalChangeStatus} /> */}

                    <CustomerAutoSearch
                      setSelectCustomerData={setSelectCustomerData}
                      EditModalChangeStatus={EditModalChangeStatus}
                    />
                  </>
                )}
              </Col>
            )}

            {/* ======= customer show ========= */}
            {SelectCustomerData != null && (
              <>
                <Col lg={4}>
                  <div className="bill-info">
                    <small>Bill to</small>
                    <h3>{SelectCustomerData?.company_name}</h3>
                    <h4>
                      {SelectCustomerData?.firstname}{" "}
                      {SelectCustomerData?.lastname}
                    </h4>
                    <span>
                      Customer#{" "}
                      <strong>{SelectCustomerData?.customer_no}</strong>
                    </span>
                    <p>
                      <a href={`mailto:${SelectCustomerData?.email}`}>
                        {SelectCustomerData?.email}
                      </a>
                    </p>
                    <p
                      className="green-link"
                      data-bs-toggle="modal"
                      data-bs-target=".customer-edit-form"
                      onClick={() => setStep(1)}
                    >
                      Edit The Flower Shop. Choose A Different Customer
                    </p>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="bill-info">
                    <small>Ship to</small>
                    <h3>{SelectCustomerData?.company_name}</h3>
                    <h4>{SelectCustomerData?.ship_addr.ship_contact_name}</h4>
                    <h4>
                      {SelectCustomerData.ship_addr.ship_addr_1 && (
                        <>{SelectCustomerData.ship_addr.ship_addr_1},</>
                      )}

                      {SelectCustomerData.ship_addr.ship_addr_2 && (
                        <>{SelectCustomerData.ship_addr.ship_addr_2},</>
                      )}

                      {SelectCustomerData.ship_addr.ship_country_name && (
                        <>{SelectCustomerData.ship_addr.ship_country_name},</>
                      )}

                      {SelectCustomerData.ship_addr.ship_state_name && (
                        <>{SelectCustomerData.ship_addr.ship_state_name},</>
                      )}

                      {SelectCustomerData.ship_addr.ship_city_name && (
                        <>{SelectCustomerData.ship_addr.ship_city_name},</>
                      )}

                      {SelectCustomerData.ship_addr.ship_zip_code && (
                        <>{SelectCustomerData.ship_addr.ship_zip_code}</>
                      )}
                    </h4>
                    <p
                      className="green-link edit-shiping"
                      data-bs-toggle="modal"
                      data-bs-target=".customer-edit-form"
                      onClick={() => setStep(3)}
                    >
                      Edit Shipping Address
                    </p>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="bill-info mt-2">
                    <Form.Label>Ship Method</Form.Label>
                    <div className="custom-sel">
                      <Form.Select onChange={shipMethodChange}>
                        <option value="">select</option>
                        <option
                          selected={
                            SelectCustomerData?.ship_addr.ship_method === "fob"
                              ? "selected"
                              : ""
                          }
                          value={"fob"}
                        >
                          FOB
                        </option>
                        <option
                          selected={
                            SelectCustomerData?.ship_addr.ship_method ===
                              "fedex"
                              ? "selected"
                              : ""
                          }
                          value={"fedex"}
                        >
                          FedEx Priority
                        </option>
                      </Form.Select>
                    </div>
                  </div>
                </Col>
              </>
            )}

            <Col lg={3}>
              <div className="order-right-grid clearfix">
                <div className="text-lg-end">
                  <Button
                    onClick={newOrderSaveAndContinueChk}
                    disabled={SelectCustomerData != null ? false : true}
                    className="new-order-btn btn btn-info green"
                  >
                    View Order
                  </Button>
                </div>

                <div className="text-lg-end">
                  {/* <Button
                    type="button"
                    className="btn btn-secondary rounded-5 cart-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#checkoutModal"
                  >
                    Total
                  </Button> */}

                  {/* <Button
                    type="button"
                    className="btn btn-secondary rounded-5 cart-btn"
                    onClick={() => setCheckOutModal(true)}
                  >
                    Total
                  </Button> */}
                </div>

                {/* ===================== */}

                <div className="order-info">
                  <p>
                    {/* <label>Order Number</label> <span>#123456789</span> */}
                  </p>
                  {/* <p className="clearfix">
                    <label>Invoice Date</label>{" "}
                    <DatePicker
                      locale="es"
                      showIcon
                      closeOnScroll={true}
                      placeholderText="To"
                      selected={formDate}
                      onChange={(date) => setFormDate(date)}
                      className={"form-control"}
                    />
                  </p> */}
                  <p className="clearfix">
                    <label>Delivery Date</label>{" "}
                    <DatePicker
                      locale="es"
                      showIcon={true}
                      closeOnScroll={true}
                      placeholderText="Delivery Date"
                      className={"form-control custom-date"}
                      selected={DeliveryDate}
                      onChange={(date) => setDeliveryDate(date)}
                      minDate={availableDates.minDate}
                    />
                  </p>
                </div>

                {/* =========  end  ============ */}
              </div>
            </Col>
          </Row>
        </div>


        {SelectCustomerData != null && (
          <div className="category-select">
            <Row className="justify-content-end">

            </Row>
          </div>
        )}

        {SelectCustomerData != null && (
          <div className="category-select">
            <Row className="justify-content-end">
              <Col lg={2} className="text-lg-start">
                <Form.Check
                  type="checkbox"
                  label="Shop By Branch"
                  checked={ProductDataSearch.shop_by_branch}
                  onChange={(e) => {
                    setProductDataSearch({
                      ...ProductDataSearch,
                      shop_by_branch: e.target.checked
                    })
                  }}
                />
              </Col>

              <Col lg={3} className="text-lg-end">
                <span className="select-box search">
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={ProductDataSearch.search_text}
                    onChange={(e) => {
                      setProductDataSearch({
                        ...ProductDataSearch,
                        search_text: e.target.value
                      })
                    }}
                  />
                </span>
              </Col>
            </Row>
          </div>
        )}

        <div className="order-total-table">

          {/* /////////////////////////// product list //////////////////////////// */}

          <div className="order-tabletwo mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Color</th>
                  <th>Source</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  {/* <th>Cost Price</th>
                  <th>Sale Price</th> */}
                  <th>Total</th>
                  <th>Margin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userState.ProductData.length > 0 &&
                  userState.ProductData.map((item, index) => (
                    <>
                      <tr key={index}>
                        <td>
                          {parse(item.product_details.product_name)}
                        </td>
                        <td>
                          <img
                            src={item.product_details.image_url}
                            alt=""
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setImageShowModalUrl(
                                item.product_details.image_url
                              )
                            }
                          />
                        </td>
                        <td>{item.product_details.category_string}</td>
                        <td>{item.product_details.color_string}</td>
                        <td>{item.product_details.source}</td>

                        <td>
                          <Form.Select
                            onChange={(e) =>
                              quantityListValueset_2(
                                index,
                                item.temp_product_id,
                                e.target.value,
                                item.product_details.cost_price,
                                item.product_details.cost_price,
                                item.product_details.margin_data
                              )
                            }
                            value={item.quantity}
                          >
                            {quantityList(
                              item.product_details.minqty,
                              item.product_details.stock
                            )}
                          </Form.Select>
                        </td>

                        {/*  <td>{item.product_details.fob_price}</td> */}

                        <td>{item.product_details.cost_price}</td>

                        {/* <td>
                          
                          {item.product_details.real_price}

                        </td> */}

                        <td>{item.total}</td>
                        <td>{item.margin}</td>

                        <td>
                          {item.status === 'order' ? (
                            <>
                              <Button
                                onClick={() =>
                                  NewOrderAdd_2(
                                    index,
                                    item.product_details.id,
                                    item.quantity
                                  )
                                }
                                variant={"success"}
                              >
                                Save
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                onClick={() =>
                                  NewOrderAdd_2(
                                    index,
                                    item.product_details.id,
                                    item.quantity
                                  )
                                }
                                variant="secondary"
                              >
                                Add
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>

            {/* <div className="order-total">
                        <p>
                            <span className="subtotal">Subtotal $0.00</span>
                        </p>
                        <p>
                            <span className="subtotal">Subtotal $0.00</span>
                        </p>
                        <p>
                            <span className="total">Total</span>{" "}
                            <span className="amount">$0.00</span>
                        </p>
                        <p />
                    </div> */}
          </div>

        </div>
      </Container>

      {/* ====== Customer edit modal ======== */}
      {SelectCustomerData != null && (
        <CustomerEditModalForm
          id={SelectCustomerData?.id}
          Step={Step}
          setEditModalChangeStatus={setEditModalChangeStatus}
          EditModalChangeStatus={EditModalChangeStatus}
        />
      )}

      {/* ============ CheckoutModal ======== */}
      <CheckoutModal
        CheckOutModal={CheckOutModal}
        setCheckOutModal={setCheckOutModal}
        SelectCustomerData={SelectCustomerData}
        setSelectCustomerData={setSelectCustomerData}
        DeliveryDate={DeliveryDate}
        setAddItem={setAddItem}
        quantityListValueset_2={quantityListValueset_2}
        quantityList={quantityList}
      />

      {/* ============= ImageShowModal ================ */}
      <ImageShowModal
        imageShowModal={imageShowModal}
        setImageShowModal={setImageShowModal}
        ImageURL={ImageURL}
        setImageURL={setImageURL}
      />
    </>
  );
}

export default NewOrder;
