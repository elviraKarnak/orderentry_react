import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import AddImage from "../../assests/images/add.png";
import AddCircleOut from "../../assests/images/add-circle-outline-white.png";

import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
// import CustomerSelectDropdown from "../../compoments/customer/CustomerSelectDropdown";
import CustomerAutoSearch from "../../compoments/customer/CustomerAutoSearch";
import customerService from "../../services/customer.service";
import CustomerEditModalForm from "../../compoments/customer/EditModalForm";
import Swal from 'sweetalert2';
import productService from "../../services/product.service";
import orderService from "../../services/order.service";
import { toast } from "react-toastify";
import parse from 'html-react-parser';
import { userContext } from "../../Store";
import CheckoutModal from '../../compoments/CheckoutModal'
import Loader from "../../pages/Loader/CommonLoader";
import ImageShowModal from "./ImageShowModal"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import { fmiOrderSystemAppOrderAdd } from "../../utils/fetch";


setDefaultLocale("es");

function NewOrder() {
    const { userState, dispatch } = useContext(userContext);
    const [ProductName, setProductName] = useState("");
    const [DeliveryDate, setDeliveryDate] = useState();
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
    const navigate = useNavigate();



    const [productData2, setProductData2] = useState([]);

    const [ProductDataSearch, setProductDataSearch] = useState({
        limit: 10,
        page_no: 1,
        product_name: ""
    })

    const [ProductData, setProductData] = useState([])
    const [OrderItemsData, setOrderItemsData] = useState([])

    const [TotalPM, setTotalPM] = useState({
        margin: 0,
        total: 0
    })

    const [availableDates, setAvailableDates] = useState({
        minDate: new Date(), // Current date - All dates before the current date will be disabled
        maxDate: null, // All dates after 5 days from the current date will be enabled
    });

    const location = useLocation();


    const calculateMaxDate = () => {

        // Calculate the minimum and maximum selectable dates
        const today = moment();

        // Set the time for 3:00 PM
        const threePMToday = moment().set({ hour: 15, minute: 0, second: 0, millisecond: 0 });

        // Compare the current date with 3:00 PM
        const isAfterThreePM = today.isAfter(threePMToday);
        const isBeforeThreePM = today.isBefore(threePMToday);



        if (isBeforeThreePM) {
            const minDate = today.clone().add(5, 'days').toDate();
            const maxDate = today.toDate();
            setAvailableDates({ ...availableDates, minDate: minDate });
        }

        if (isAfterThreePM) {
            const minDate = today.clone().add(6, 'days').toDate();
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
        setSelectCustomerData(preCustomerData)

        setLoader(true);
        var value = e.target.value;
        var id = SelectCustomerData.ship_addr.id;

        var responce = await customerService.updateShipMethod({
            ship_method: value,
            id: id
        });
        setLoader(false)
    }

    // const getCustomerList = async () => {
    //     var responce = await customerService.findAll("");
    //     setCustomerData(responce.data.data)
    // }

    const addCustomer = () => {
        // alert(Customer)
        setCustomer((pre) => pre ? false : true);
    }


    const newOrderSaveAndContinueChk = async () => {

        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You want to check out this order!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes',
        //     cancelButtonText: "Save"
        // }).then(async (result) => {

        //     if (result.isConfirmed) {

        //         if (userState.OrderItemsData.length === 0) {
        //             toast.warning("Item Not select!");
        //         } else {
        //             //  =========== modal open ========
        //             setCheckOutModal(true);
        //         }

        //     } else {

        //         //  ============= order save ===========
        //         await NewOrderSave();
        //     }


        // })


        Swal.fire({
            title: 'Are you sure?',
            text: "You want to save this order!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "Cancle"
        }).then(async (result) => {

            if (result.isConfirmed) {

                //  ============= order save ===========
                await NewOrderSave();

            } 

        })


    }

    // ========== not use ========
    const ProductList = async () => {

        console.log("DeliveryDate ", DeliveryDate)

        if (DeliveryDate === undefined) {
            toast.warning("Please select delivery date");
            return;
        }


        if (!AddItem) {
            setAddItem((pre) => pre ? false : true)

            var payload = {
                product_name: ProductDataSearch.product_name,
                delivary_date: DeliveryDate,
                limit: ProductDataSearch.limit,
                page_no: ProductDataSearch.page_no,
            }


            var responce = await productService.productSearch(payload);



            // console.log(responce.data, " ======== product data ====")

            if (responce.data.status) {



                var tempArr = userState.ProductData;

                var pIdArr = [];

                for (var item of tempArr) {
                    var p_id = item.product_details.id;
                    pIdArr.push(p_id)
                }


                for (var i of responce.data.data) {


                    if (!pIdArr.includes(i.id)) {
                        var temp = {
                            product_details: i,
                            quantity: "",
                            total: 0.00,
                            margin: 0
                        }

                        tempArr.push(temp)
                    }

                }



                console.log("tempArr  ", tempArr)

                // alert(AddItem)



                // === replace_ProductData ====
                dispatch({ type: "replace_ProductData", value: tempArr });

            }


        } else {

            setAddItem((pre) => pre ? false : true)
        }



    }


    // ======= wordpress product list api call (use) ====== //
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
                setAddItem((pre) => pre ? false : true)


                var deliveryDate = moment(DeliveryDate).format("MM/DD/YYYY");
                var ship_method = (SelectCustomerData.ship_addr.ship_method === "fob" ? "fob" : "landed");

                const responce = await axios.get(`${process.env.REACT_APP_WORDPRESS_API_SERVICE_URL}/getproducts/v1/product_filter_listing?model=${ship_method}&date_text=${deliveryDate}&page_no=1&pact=&pcolor&psource&isbybunch&searchquery=${ProductName}&filter_opt`);



                // console.log(responce.data, " ======== product data ====")

                if (responce.data.items.length > 0) {


                    var tempArr = userState.ProductData;

                    var pIdArr = [];

                    for (var item of tempArr) {
                        var p_id = item.product_details.id;
                        pIdArr.push(p_id)
                    }


                    for (var i of responce.data.items) {


                        if (!pIdArr.includes(i.id)) {
                            var temp = {
                                product_details: i,
                                quantity: "",
                                total: 0.00,
                                margin: 0
                            }

                            tempArr.push(temp)
                        }

                    }



                    console.log("tempArr  ", tempArr)

                    // alert(AddItem)



                    // === replace_ProductData ====
                    dispatch({ type: "replace_ProductData", value: tempArr });

                }


            } else {

                setAddItem((pre) => pre ? false : true)
            }


            setLoader(false)
            // setProductData2(response.data.items)
            // console.log("dsadsadsad", response);
        } catch (error) {
            // Handle errors here
            console.error('Error fetching data:', error);
            setLoader(false)
        }
    }


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
        var ship_method = (SelectCustomerData.ship_addr.ship_method === "fob" ? "fob" : "landed");

        const responce = await axios.get(`${process.env.REACT_APP_WORDPRESS_API_SERVICE_URL}/getproducts/v1/product_filter_listing?model=${ship_method}&date_text=${deliveryDate}&page_no=1&pact=&pcolor&psource&isbybunch&searchquery=${search_p_name}&filter_opt`);



        // console.log(responce.data, " ======== product data ====")

        if (responce.data.items.length > 0) {


            var tempArr = [];

            for (var i of responce.data.items) {


                var temp = {
                    product_details: i,
                    quantity: "",
                    total: 0.00,
                    margin: 0
                }

                tempArr.push(temp)

            }


            console.log("tempArr_2  ", tempArr)

            // alert(AddItem)

            // === replace_ProductData ====
            dispatch({ type: "replace_ProductData", value: tempArr });

        }

        setLoader(false);

    }

    // ===== chekc =======
    const NewOrderAdd = async (index, product_item_id, product_quantity) => {



        // ================ new array create =======

        if (product_quantity === "") {
            toast.warning("pleace select product quantity!");
            return;
        }

        const indexToUpdate = index;
        if (indexToUpdate !== -1) {
            // Create a new array with the updated value
            const updatedData = userState.ProductData[indexToUpdate];



            if (userState.AddProductArr.includes(updatedData.product_details.id)) {
                // toast.warning("Product alredy selected!")

                var newOrderItemData = userState.OrderItemsData.map((item) => (item.product_details.id === updatedData.product_details.id ? updatedData : item))

                console.log('newOrderItemData ', newOrderItemData)


                // === replace_OrderItemsData ====
                dispatch({ type: "replace_OrderItemsData", value: newOrderItemData });

            } else {

                // ===== new_AddProductArr =======
                dispatch({ type: "new_AddProductArr", value: updatedData.product_details.id });


                // === new_OrderItemsData ====
                dispatch({ type: "new_OrderItemsData", value: updatedData });


            }

        }

    }

    // ============= Sale's man set price =======
    const salePriceSet = (change_price, original_price, p_id, index, quantity) => {

        // alert(quantity)

        const indexToUpdate = index;

        if (indexToUpdate !== -1) {
            // Create a new array with the updated value
            let updatedData = [...userState.ProductData];

            // ------- sale price -------
            // updatedData[indexToUpdate] = { ...updatedData[indexToUpdate], product_details: {landed_price:change_price} };

            if (SelectCustomerData.ship_addr.ship_method === "fob") {
                updatedData[indexToUpdate].product_details.fob_price = change_price;
            } else {
                updatedData[indexToUpdate].product_details.landed_price = change_price;
            }

            // ------- total -------
            // updatedData[indexToUpdate] = { ...updatedData[indexToUpdate], total: (Number(quantity) * Number(change_price)).toFixed(2) };

            updatedData[indexToUpdate].total = (Number(quantity) * Number(change_price)).toFixed(2);

            console.log("after sale price change updatedData: ", updatedData)



            // Set the state with the updated array
            // === replace_ProductData ====
            dispatch({ type: "replace_ProductData", value: updatedData });
        }

    }


    /// ============== set ImageShowModal image url =============
    const setImageShowModalUrl = (url) => {
        setImageURL(url);
        setImageShowModal(true);
    }

    const TotalAmountCount = async () => {
        var no_product = userState.OrderItemsData.length;
        var total = 0;
        var margin = 0;

        for (var i of userState.OrderItemsData) {
            total += Number(i.total);
        }

        for (var i of userState.OrderItemsData) {
            margin += Number(i.margin);
        }


        var t_mergin = isNaN(margin / no_product) ? 0 : (margin / no_product);


        var obj = {
            total: total,
            margin: t_mergin
        }

        // === set TotalPM ====
        dispatch({ type: "TotalPM", value: obj });

    }

    const NewOrderSave = async () => {

        if (userState.OrderItemsData.length === 0) {
            toast.warning("Item Not select!");
            return;
        }

        // ===================== old api =================///
        // var tempItem = []

        // for (var item of userState.OrderItemsData) {
        //     var temp = {
        //         product_id: item.product_details.id,
        //         quantity: item.quantity,
        //         sale_price: (SelectCustomerData.ship_addr.ship_method === "fob" ? item.product_details.fob_price : item.product_details.landed_price),
        //         cost_price: 0,
        //         p_cat: (item.product_details.catslug.split(",")[0] == "" ? null : item.product_details.catslug.split(",")[0]),
        //         p_color: (item.product_details.colorslug.split(",")[0] == "" ? null : item.product_details.colorslug.split(",")[0]),
        //         // cost_price: item.product_details.fob_price
        //     }

        //     tempItem.push(temp)
        // }


        // var payload;

        // if (OrderId != null) {
        //     payload.order_id = OrderId;
        // }

        // return;

        // payload = {
        //     customer_id: SelectCustomerData.id,
        //     sales_rep_id: userState.id,
        //     delivary_date: DeliveryDate,
        //     order_items: tempItem,
        //     ship_method: (SelectCustomerData.ship_addr.ship_method === "fob" ? "fob" : "fedex"),
        //     order_status: "saved"
        // }






        // var responce = await orderService.newOrderAdd(new_payload);

        // console.log(responce.data)
        // if (responce.data.status) {
        //     var OID = responce.data.order_id;
        //     console.log(OID)

        //     // alert("order_id",responce.data.order_id)
        //     // setOrderId(OID);

        //     toast.success("Order Save");

        //     // === order_data_reset ====
        //     dispatch({ type: "order_data_reset" });

        //     setAddItem((pre) => pre ? false : true)

        //     Swal.fire(
        //         'Saved!',
        //         'Your order has been saved.',
        //         'success'
        //     );

        //     navigate("/order-view");

        // } else {
        //     toast.error(responce.data.msg);
        // }
        // ================== end order api ================================== //


        // ============= new ============== //
        var tempItem = []

        for (var item of userState.OrderItemsData) {

            var temp = {
                item_id: item.product_details.id,
                item_details: item.product_details.name,
                item_price: (SelectCustomerData.ship_addr.ship_method === "fob" ? item.product_details.fob_price : item.product_details.landed_price),
                item_quantity: item.quantity
            }

            tempItem.push(temp)
        }

        var new_payload = {
            customer_id: SelectCustomerData.id,
            wp_order_id: "",
            order_type: "in-house", // in-house or website
            packing_charge: "0.00",
            fuel_charge: "0.00",
            order_truckid: 123,
            payment_card_type: "Visa",
            payment_amount: userState.TotalPM.total,
            payment_approval_code: "075618",
            items_details: tempItem,
            order_address_details: {
                ship_to: SelectCustomerData.company_name,
                address: SelectCustomerData.ship_addr.ship_addr_1 + " " + SelectCustomerData.ship_addr.ship_addr_2,
                city: SelectCustomerData.ship_addr.ship_city_name,
                state: SelectCustomerData.ship_addr.ship_state_name,
                zipcode: SelectCustomerData.ship_addr.ship_zip_code
            }
        }



        // console.log(userState.OrderItemsData, " SelectCustomerData123")

        var responce = await fmiOrderSystemAppOrderAdd(new_payload);

        console.log("responce000 ",responce)

        if (responce.status) {

            toast.success("Order Save");

            // === order_data_reset ====
            dispatch({ type: "order_data_reset" });

            setAddItem((pre) => pre ? false : true)

            Swal.fire(
                'Saved!',
                'Your order has been saved.',
                'success'
            );

            navigate("/order-view");

        } else {
            toast.error(responce.result.msg);
        }



    }


    const quantityList = (min, stock) => {

        var ii = (stock / min);

        var temp = '<option value="" >select</option>';

        for (var i = 1; i <= ii; i++) {
            temp += `<option value=${min * i} >${min * i}</option>`
        }

        return parse(temp)



    }

    const quantityListValueset = (index, quantity, landed_price, fob_price) => {
        // Find the index of the object with id 2
        // const indexToUpdate = ProductData.findIndex(item => item.id === 2);

        var price = (SelectCustomerData.ship_addr.ship_method === "fob" ? fob_price : landed_price)

        const indexToUpdate = index;

        if (indexToUpdate !== -1) {
            // Create a new array with the updated value
            const updatedData = [...userState.ProductData];

            // ------- quantity -------
            updatedData[indexToUpdate] = { ...updatedData[indexToUpdate], quantity: quantity };

            // ------- total -------
            updatedData[indexToUpdate] = { ...updatedData[indexToUpdate], total: (Number(quantity) * Number(price)).toFixed(2) };

            // ------- margin -------
            // var sale_price = Number(quantity) * Number(unit_price);
            // var buy_price = Number(quantity) * Number(cost_price);
            // var margin = (((sale_price - buy_price) / sale_price) * 100).toFixed(2);

            // updatedData[indexToUpdate] = { ...updatedData[indexToUpdate], margin: (margin !== 'NaN' ? margin : 0) };

            // Set the state with the updated array
            // === replace_ProductData ====
            dispatch({ type: "replace_ProductData", value: updatedData });
        }
    }

    const OrderItemDelete = (index, product_id) => {
        var newArr = userState.OrderItemsData.filter((item, in_index) => in_index !== index);


        // === replace_OrderItemsData ====
        dispatch({ type: "replace_OrderItemsData", value: newArr });

        var total = 0;
        var margin = 0;

        for (var i of newArr) {
            total += Number(i.total);
        }

        for (var i of newArr) {
            margin += Number(i.margin);
        }

        var avg_margin = (margin / newArr.length)
        // alert(newArr.length)



        var obj = {
            total: total,
            margin: margin == 0 && newArr.length == 0 ? 0 : avg_margin
        }

        // === set TotalPM ====
        dispatch({ type: "TotalPM", value: obj });

        var temp = userState.AddProductArr.filter((item) => product_id !== item)
        // ====== replace_AddProductArr =====
        dispatch({ type: "replace_AddProductArr", value: temp });


    }


    useEffect(() => {
        calculateMaxDate();
        // getCustomerList();
        // console.log(SelectCustomerData);

    }, [SelectCustomerData])

    useEffect(() => {

        TotalAmountCount();

    }, [userState.OrderItemsData])

    // ======= reset pre vious data ==========
    useEffect(() => {

        // =========== selected customer value set =============
        if (location.state !== null) {
            // console.log("location.state.selectCustomerData ",location.state.selectCustomerData)
            setSelectCustomerData(location.state.selectCustomerData);
        }

        // === order_data_reset ====
        dispatch({ type: "order_data_reset" });



    }, [])








    // console.log("userState.ProductData ",userState.ProductData)

    return (
        <>

            {loader && <Loader />}

            <Header />

            <Container>
                <div className="billing-grid order-bill">
                    <h2>New Order</h2>
                    <Row className="order_top_row d-lg-flex align-items-center">
                        {/* ======= customer select ========= */}
                        {SelectCustomerData == null && <Col lg={9}>
                            {!Customer && <div className="add-customer">
                                <div className="create-btn-sec" >
                                    <img src={AddImage} alt="" />
                                    <Button type="button" className="create-btn" onClick={addCustomer} >
                                        + Add a customer
                                    </Button>
                                </div>
                            </div>}

                            {/*  =========== customer search ======= */}
                            {Customer && <>
                                {/* <CustomerSelectDropdown options={CustomerData} setSelectCustomerData={setSelectCustomerData} EditModalChangeStatus={EditModalChangeStatus} /> */}

                                <CustomerAutoSearch setSelectCustomerData={setSelectCustomerData} EditModalChangeStatus={EditModalChangeStatus} />

                            </>}
                        </Col>}

                        {/* ======= customer show ========= */}
                        {SelectCustomerData != null && <>
                            <Col lg={4}>
                                <div className="bill-info">
                                    <small>Bill to</small>
                                    <h3>{SelectCustomerData?.company_name}</h3>
                                    <h4>{SelectCustomerData?.firstname} {SelectCustomerData?.lastname}</h4>
                                    <span>
                                        Customer# <strong>{SelectCustomerData?.customer_no}</strong>
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
                                        {SelectCustomerData.ship_addr.ship_addr_1 && <>{SelectCustomerData.ship_addr.ship_addr_1},</>}

                                        {SelectCustomerData.ship_addr.ship_addr_2 && <>{SelectCustomerData.ship_addr.ship_addr_2},</>}

                                        {SelectCustomerData.ship_addr.ship_country_name && <>{SelectCustomerData.ship_addr.ship_country_name},</>}

                                        {SelectCustomerData.ship_addr.ship_state_name && <>{SelectCustomerData.ship_addr.ship_state_name},</>}

                                        {SelectCustomerData.ship_addr.ship_city_name && <>{SelectCustomerData.ship_addr.ship_city_name},</>}

                                        {SelectCustomerData.ship_addr.ship_zip_code && <>{SelectCustomerData.ship_addr.ship_zip_code}</>}

                                    </h4>
                                    <p className="green-link edit-shiping" data-bs-toggle="modal"
                                        data-bs-target=".customer-edit-form" onClick={() => setStep(3)}  >
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
                                            <option selected={SelectCustomerData?.ship_addr.ship_method === "fob" ? "selected" : ""} value={"fob"}>FOB</option>
                                            <option selected={SelectCustomerData?.ship_addr.ship_method === "fedex" ? "selected" : ""} value={"fedex"}>FedEx Priority</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </Col>
                        </>}

                        <Col lg={3}>
                            <div className="order-right-grid clearfix">
                                <div className="text-lg-end">
                                    <Button onClick={newOrderSaveAndContinueChk} disabled={SelectCustomerData != null ? false : true} className="new-order-btn btn btn-info green">
                                        Save and continue
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

                {SelectCustomerData != null && <div className="category-select">
                    <Row className="justify-content-end">
                        <Col lg={3} className="text-lg-end">
                            <span className="select-box search">
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    value={ProductName}
                                    onChange={(e) => ProductNameSearch(e.target.value)}
                                />
                            </span>
                            {/* <span className="select-box">
                                <select className="form-select">
                                    <option selected="">All Colors</option>
                                    <option value={1}>FedEx Priority</option>
                                    <option value={2}>FedEx Priority</option>
                                    <option value={3}>FedEx Priority</option>
                                </select>
                            </span> */}
                        </Col>
                    </Row>
                </div>}

                <div className="order-total-table">
                    {/* ================ product add list =============== */}
                    {userState.OrderItemsData.length > 0 && (<div className="order-tableone">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Description</th>
                                    <th>Image</th>
                                    <th>SKU</th>
                                    <th>Category</th>
                                    <th>Color</th>
                                    <th>Unit Pice</th>
                                    <th>Quantity</th>
                                    <th>UOM</th>
                                    <th>Amount</th>
                                    <th colSpan={2}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userState.OrderItemsData.map((item, index) => (<>
                                    <tr key={index}>
                                        <td>{parse(item.product_details.name)}</td>
                                        <td>
                                            <img src={item.product_details.image} alt="" />
                                        </td>
                                        <td></td>
                                        <td>{item.product_details.cat}</td>
                                        <td>{item.product_details.color}</td>
                                        <td>{(SelectCustomerData.ship_addr.ship_method === "fob" ? item.product_details.fob_price : item.product_details.landed_price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.product_details.unit}</td>
                                        <td>{item.total}</td>
                                        {/* <td><Button variant="success">Edit</Button></td> */}
                                        <td><Button onClick={() => OrderItemDelete(index, item.product_details.id)} variant="danger" >Delete</Button></td>
                                    </tr>
                                </>))}
                            </tbody>

                        </table>

                    </div>)}

                    <div className="add-line-item">


                        <Button onClick={ProductList2}> <img src={AddCircleOut} alt="" /> {" "}Add a line item </Button>

                        {" "}{" "}
                        <span>Margin {userState.TotalPM.margin}%  Subtotal ${userState.TotalPM.total}</span>
                    </div>



                    <br />
                    {/* ================ product list =============== */}
                    {userState.ProductData.length > 0 && (
                        <div className="order-tabletwo">
                            {AddItem && <>
                                <table className="table">
                                    <thead>
                                        <tr>

                                            <th>Product</th>
                                            <th>Image</th>
                                            <th>Category</th>
                                            <th>Color</th>
                                            <th>Source</th>
                                            <th>Quantity</th>
                                            <th>Sale Price</th>
                                            <th>Cost Price</th>
                                            <th>Total</th>
                                            <th>Margin</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {userState.ProductData.length > 0 && userState.ProductData.map((item, index) => (<>
                                            <tr key={index}>
                                                <td>{parse(item.product_details.name)}</td>
                                                <td>
                                                    <img src={item.product_details.image} alt="" onClick={() => setImageShowModalUrl(item.product_details.image)} />
                                                </td>
                                                <td>{item.product_details.cat}</td>
                                                <td>{item.product_details.color}</td>
                                                <td>{item.product_details.source}</td>
                                                <td>
                                                    <Form.Select onChange={(e) => quantityListValueset(index, e.target.value, item.product_details.landed_price, item.product_details.fob_price)}>
                                                        {/* {quantityList(item.product_details.min_stock, item.product_details.stock)} */}
                                                        <option value="" >select</option>

                                                        {/* ///// fob stock //// */}
                                                        {SelectCustomerData.ship_addr.ship_method === "fob" && <>
                                                            {item.product_details.prices_data[0].stock_range_f.map((f_item, f_index) => (
                                                                <option value={f_item} >{f_item}</option>
                                                            ))}
                                                        </>}

                                                        {/* ///// fedex stock //// */}
                                                        {SelectCustomerData.ship_addr.ship_method !== "fob" && <>
                                                            {item.product_details.prices_data[0].stock_range_l.map((f_item, f_index) => (
                                                                <option value={f_item} >{f_item}</option>
                                                            ))}
                                                        </>}

                                                    </Form.Select>
                                                </td>
                                                {/* <td>{item.product_details.unit_price}</td>
                                        <td>{item.product_details.cost_price}</td> */}
                                                <td>
                                                    <input type="number"
                                                        value={(SelectCustomerData.ship_addr.ship_method === "fob" ? item.product_details.fob_price : item.product_details.landed_price)}
                                                        onChange={(e) => salePriceSet(e.target.value, (SelectCustomerData.ship_addr.ship_method === "fob" ? item.product_details.fob_price : item.product_details.landed_price), item.product_details.id, index, item.quantity)} />
                                                </td>

                                                <td></td>
                                                {/*  <td>{item.product_details.fob_price}</td> */}

                                                <td>{item.total}</td>

                                                <td></td>
                                                {/* <td>{item.margin}</td> */}

                                                <td>
                                                    {userState.AddProductArr.includes(item.product_details.id) ? <>
                                                        <Button onClick={() => NewOrderAdd(index, item.product_details.id, item.quantity)} variant={"success"} >Save</Button>
                                                    </> : <>
                                                        <Button onClick={() => NewOrderAdd(index, item.product_details.id, item.quantity)} variant="secondary" >Add</Button>
                                                    </>}
                                                </td>


                                            </tr>
                                        </>))}

                                    </tbody>
                                </table> </>}




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
                        </div>)}
                </div>
            </Container>

            {/* ====== Customer edit modal ======== */}
            {SelectCustomerData != null &&
                <CustomerEditModalForm
                    id={SelectCustomerData?.id}
                    Step={Step}
                    setEditModalChangeStatus={setEditModalChangeStatus}
                    EditModalChangeStatus={EditModalChangeStatus} />}

            {/* ============ CheckoutModal ======== */}
            <CheckoutModal
                CheckOutModal={CheckOutModal}
                setCheckOutModal={setCheckOutModal}
                SelectCustomerData={SelectCustomerData}
                setSelectCustomerData={setSelectCustomerData}
                DeliveryDate={DeliveryDate}
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
