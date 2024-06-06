import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import Circle from '../../assests/images/circle.png';
import Loading from '../../assests/images/loading.png';
import Cart from '../../assests/images/cart.png';
import Card1 from '../../assests/images/card1.png';
import Visa from '../../assests/images/visa.png';
import Delete from '../../assests/images/delete.png'
import AwesomeCheckCircle from '../../assests/images/awesome-check-circle.png';
import IconicaddCircle from '../../assests/images/iconic-ios-add-circle-small.png';
import { useNavigate } from "react-router-dom";
import orderService from "../../services/order.service";
import { toast } from "react-toastify";
import { userContext } from "../../Store";
import Moment from "react-moment";
import Swal from 'sweetalert2';
import customerService from "../../services/customer.service";
import Loader from "../../pages/Loader/CommonLoader";

function Index(props) {
    const { userState, dispatch } = useContext(userContext);
    const navigate = useNavigate();
    const [shippingModal, setShippingModal] = useState(false);
    const [orderProcessingModal, setOrderProcessingModal] = useState(false);
    const [OrderData, setOrderData] = useState({});
    const [placeOrderData, setPlaceOrderData] = useState({ shipping_charge: 10.00, order_id: props.OrderId });
    const [payment_type, setPaytemt_type] = useState("");
    const [payment_type_value, setPaytemt_type_value] = useState("");
    const [loader, setLoader] = useState(false);




    const billingactive = () => {

        var dataadded = document.getElementsByClassName("dataadded");
        dataadded[0].classList.remove("active");
        dataadded[1].classList.remove("active");
        dataadded[2].classList.remove("active");

        var brokendata = document.getElementsByClassName("brokendata");
        brokendata[0].classList.remove("active");
        brokendata[1].classList.remove("active");
        brokendata[2].classList.remove("active");
        brokendata[1].classList.add("active");

        var billing = document.getElementById("billing");
        billing.classList.add("active");


        // navigate(`/new-order`)
    }

    const checkoutModalClose = () => {
        props.setCheckOutModal(false);
        setPaytemt_type("")
        setPaytemt_type_value("");
        // navigate(`/order`)
    }

    const shippingModalClose = () => {
        props.setCheckOutModal(false);
        setShippingModal(false);
        setPaytemt_type("")
        setPaytemt_type_value("");
        // navigate(`/order`)
    }

    const CheckOutConfirm = () => {
        props.setCheckOutModal(false);
        setShippingModal(true);
    }

    const navigateOrderPlace = () => {
        navigate("/ordercomplete")
    }

    // === final submit ====
    const placeOrder = async () => {


        // return;
        // console.log(payload)
        // var responce = await orderService.orderPlace(payload)

        // if (responce.data.status) {
        //     props.setCheckOutModal(false);
        //     setShippingModal(false);
        //     setOrderProcessingModal(true)

        //     // toast.success(responce.data.msg)
        //     setTimeout(navigateOrderPlace, 3000);
        // } else {
        //     toast.error(responce.data.msg)
        // }

        if (userState.OrderItemsData.length === 0) {
            toast.warning("Item not select!");
            return;
        }

        if (payment_type === "" && payment_type_value === "") {
            toast.warning("Please select payment type!");
            return;
        }

        props.setCheckOutModal(false);
        setShippingModal(false);
        setOrderProcessingModal(true);

        var tempItem = []

        for (var item of userState.OrderItemsData) {
            var temp = {
                product_id: item.product_details.id,
                quantity: item.quantity,
                sale_price: (props.SelectCustomerData.ship_addr.ship_method === "fob" ? item.product_details.fob_price : item.product_details.landed_price),
                cost_price: 0,
                p_cat: (item.product_details.catslug.split(",")[0] == "" ? null : item.product_details.catslug.split(",")[0]),
                p_color: (item.product_details.colorslug.split(",")[0] == "" ? null : item.product_details.colorslug.split(",")[0]),
                // cost_price:item.product_details.fob_price
            }

            tempItem.push(temp)
        }


        var payload;

        // if (OrderId != null) {
        //     payload.order_id = OrderId;
        // }


        payload = {
            customer_id: props.SelectCustomerData.id,
            sales_rep_id: userState.id,
            delivary_date: props.DeliveryDate,
            order_items: tempItem,
            ship_method: (props.SelectCustomerData.ship_addr.ship_method === "fob" ? "fob" : "fedex"),
            order_status: "shipped",
            payment_type: payment_type
        }

        console.log(payload)
        if (props.OrderId) {
            if (props.OrderId != null) {
                payload.orderId = props.OrderId;
            }
        }

        var responce = await orderService.newOrderAdd(payload);

        console.log(responce.data)
        if (responce.data.status) {
            var OID = responce.data.order_id;
            // console.log(OID)
            // Swal.fire(
            //     'Saved!',
            //     'Your order has been done.',
            //     'success'
            // )

            // props.setCheckOutModal(false);
            // setShippingModal(false);
            setOrderProcessingModal(false)

            // === order_data_reset ====
            dispatch({ type: "order_data_reset" });

            navigateOrderPlace();

        } else {
            toast.error(responce.data.msg);
        }



    }



    const GetOrderItemList = async () => {

        if (props.OrderId !== null) {
            // alert(props.OrderId)
            var responce = await orderService.singleOrderItemList(props.OrderId);
            console.log("singlr data ", responce.data)
            setOrderData(responce.data.data)

            var name = "ship_method";
            setPlaceOrderData({ ...placeOrderData, ship_method: responce.data.data.customer_details.ship_addr.ship_method })
        }
    }



    const OrderItemDelete = (index, product_id) => {
        // Create a new array with the updated value
        let updatedData = [...userState.ProductData];
        for (const [l_index, item] of updatedData.entries()) {
            if (item.product_details.id === product_id) {
                updatedData[l_index].quantity = "";
                updatedData[l_index].total = 0;
                updatedData[l_index].margin = 0;
                break;
            }
        }
        console.log("p_d_data ", updatedData)
        // === replace_ProductData ====
        dispatch({ type: "replace_ProductData", value: updatedData });


        var newArr = userState.OrderItemsData.filter((item, in_index) => in_index !== index);

        // === replace_OrderItemsData ====
        dispatch({ type: "replace_OrderItemsData", value: newArr });


        var temp = userState.AddProductArr.filter((item) => product_id !== item)

        // ====== replace_AddProductArr =====
        dispatch({ type: "replace_AddProductArr", value: temp });

    }



    const shipMethodChange = async (e) => {
        // alert(e.target.value)

        if (e.target.value == "") {
            toast.warning("plecace select shiping method!");
            return;
        }

        var preCustomerData = props.SelectCustomerData;
        preCustomerData.ship_addr.ship_method = e.target.value;
        props.setSelectCustomerData(preCustomerData)

        setLoader(true);
        var value = e.target.value;
        var id = props.SelectCustomerData.ship_addr.id;

        var responce = await customerService.updateShipMethod({
            ship_method: value,
            id: id
        });
        setLoader(false)
    }

    const PaymentTypeSelect = (type, value) => {
        // alert(`type: ${type} | value: ${value}`);
        setPaytemt_type(type)
        setPaytemt_type_value(value);
    }

    console.log("props.SelectCustomerData  ", props.SelectCustomerData)

    // useEffect(() => {
    //     GetOrderItemList();
    // }, [props.OrderId])



    return (<>

        {loader && <Loader />}

        {/* ============== checkoutModal ============= */}
        <Modal
            show={props.CheckOutModal}
            onHide={checkoutModalClose}
            backdrop="static"
            keyboard={false}
            id="checkoutModal"
            size="lg"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title>Delivery Date</Modal.Title>
                {/* <h5>Tuesday. September 30</h5> */}
                <h5>{<Moment date={props.DeliveryDate} format="dddd, MMMM D" />}</h5>
            </Modal.Header>
            <Modal.Body>
                <div className="order-total-table">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Description</th>
                                    <th>Unit Pice</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>

                                {userState.OrderItemsData.length > 0 && userState.OrderItemsData.map((item, index) => (<>
                                    <tr key={index}>
                                        <td className="company_name">{item.product_details.name}</td>
                                        <td>${(props.SelectCustomerData?.ship_addr.ship_method === "fob" ? item.product_details.fob_price : item.product_details.landed_price)}</td>
                                        <td>{item.quantity} ST</td>
                                        <td className="amount-col">${item.total}</td>
                                        <td>
                                            <img style={{ cursor: "pointer" }} onClick={() => OrderItemDelete(index, item.product_details.id)} src={Delete} alt="" />
                                        </td>
                                    </tr>
                                </>))}




                                {/* <tr>
                                    <td className="company_name">Freedom 50CM</td>
                                    <td>$0.65</td>
                                    <td>25 ST</td>
                                    <td className="amount-col">$34.50</td>
                                    <td>
                                        <img src={Delete} alt="" />
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>

                {/* <Button variant="secondary" onClick={() => props.setCheckOutModal(false)}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button> */}

                <div className="order-total">
                    <p>
                        <span className="subtotal">Subtotal ${userState.TotalPM.total}</span>
                    </p>
                    <p>
                        <span className="subtotal">
                            Shipping &amp; Handling $0.00
                        </span>
                    </p>
                    <p>
                        <span className="total">Total</span>{" "}
                        <span className="amount">${userState.TotalPM.total}</span>
                    </p>

                    <Button
                        disabled={userState.OrderItemsData.length > 0 ? false : true}
                        className="new-order-btn btn btn-info"
                        onClick={CheckOutConfirm}
                    >
                        Checkout
                    </Button>
                </div>

            </Modal.Footer>

        </Modal >
        {/* ============== checkoutModal End ============= */}


        {/* ============== shippingModal ============= */}
        <Modal
            show={shippingModal}
            onHide={shippingModalClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            centered
            id={"shippingModal"}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delivery Date</Modal.Title>
                {/* <h5>Tuesday. September 30</h5> */}
                <h5>{<Moment date={props.DeliveryDate} format="dddd, MMMM D" />}</h5>
            </Modal.Header>
            <Modal.Body>
                <ul className="nav nav-tabs">
                    <li className="nav-item ">
                        <a
                            className="nav-link active brokendata"
                            data-bs-toggle="tab"
                            href="#shipping"
                        >
                            Shipping
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link brokendata"
                            data-bs-toggle="tab"
                            href="#billing"
                        >
                            Billing
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link brokendata"
                            data-bs-toggle="tab"
                            href="#billing"
                        >
                            Confirmation
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="shipping" className="container dataadded  tab-pane active">
                        <h2>Confirm shipping address</h2>
                        <div className="row d-flex align-items-center">
                            <div className="col-lg-6">
                                <div className="row d-flex align-items-center shipping-address-row">
                                    <div className="col-lg-1">
                                        <img src={IconicaddCircle} alt="" />
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="bill-info">
                                            <h3>{props.SelectCustomerData?.company_name}</h3>
                                            <h4>{props.SelectCustomerData?.ship_addr.ship_contact_name}</h4>
                                            <h4>
                                                {props.SelectCustomerData?.ship_addr.ship_addr_1 && <>{props.SelectCustomerData?.ship_addr.ship_addr_1},</>}

                                                {props.SelectCustomerData?.ship_addr.ship_addr_2 && <>{props.SelectCustomerData?.ship_addr.ship_addr_2},</>}

                                                {props.SelectCustomerData?.ship_addr.ship_country_name && <>{props.SelectCustomerData?.ship_addr.ship_country_name},</>}

                                                {props.SelectCustomerData?.ship_addr.ship_state_name && <>{props.SelectCustomerData?.ship_addr.ship_state_name},</>}

                                                {props.SelectCustomerData?.ship_addr.ship_city_name && <>{props.SelectCustomerData?.ship_addr.ship_city_name},</>}

                                                {props.SelectCustomerData?.ship_addr.ship_zip_code && <>{props.SelectCustomerData?.ship_addr.ship_zip_code}</>}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="create-btn-sec">
                                    <img src={IconicaddCircle} alt="" />
                                    <button type="button" className="create-btn">
                                        Add new shipping address
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <span className="primary">Primary</span>
                            </div>
                            <div className="col-lg-4">
                                <Link to="#" className="green-link edit-shiping">
                                    Edit Shipping Address
                                </Link>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="bill-info confirm_shipping">
                                    <small>Confirm shipping method</small>
                                    <div className="select-box">
                                        <select className="form-select" onChange={shipMethodChange}>
                                            <option value="">select</option>
                                            <option selected={props.SelectCustomerData?.ship_addr.ship_method === "fob" ? "selected" : ""} value={"fob"}>FOB</option>
                                            <option selected={props.SelectCustomerData?.ship_addr.ship_method === "fedex" ? "selected" : ""} value={"fedex"}>FedEx Priority</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer">
                            <div className="order-total">
                                <p>
                                    <span className="subtotal">Subtotal ${userState.TotalPM.total}</span>
                                </p>
                                <p>
                                    <span className="subtotal">
                                        Shipping &amp; Handling $0.00
                                    </span>
                                </p>
                                <p>
                                    <span className="total">Total</span>{" "}
                                    <span className="amount">${userState.TotalPM.total}</span>
                                </p>
                                <Button
                                    onClick={billingactive}
                                    className="new-order-btn btn btn-info green"
                                >
                                    Continue
                                </Button>





                            </div>
                        </div>
                    </div>
                    <div id="billing" className="container dataadded tab-pane fade ">
                        <h2>Billing Information</h2>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            {/* <img src={AwesomeCheckCircle} alt="" /> */}
                                            <label class="radio-button-container">
                                                <input type="radio" name="radio" value={"card"} onChange={() => PaymentTypeSelect("card", "c11")} />
                                                <span class="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <img src={Card1} alt="" />
                                        </td>
                                        <td>xxxx xxxx xxxx 8940</td>
                                        <td>10/26</td>
                                        <td>1234</td>
                                        <td>
                                            <span className="primary">Primary</span>
                                        </td>
                                        <td>
                                            <Link to="#">Edit Card</Link>{" "}
                                            <Link to="#">Remove Card</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img src={Circle} alt="" /> */}
                                            <label class="radio-button-container">
                                                <input type="radio" name="radio" value={"card"} onChange={() => PaymentTypeSelect("card", "c22")} />
                                                <span class="checkmark"></span>
                                            </label>

                                        </td>
                                        <td>
                                            <img src={Visa} alt="" />
                                        </td>
                                        <td>xxxx xxxx xxxx 2244</td>
                                        <td>10/26</td>
                                        <td>1234</td>
                                        <td>
                                            <span className="primary green-link">
                                                Make Primary
                                            </span>
                                        </td>
                                        <td>
                                            <Link to="#">Edit Card</Link>{" "}
                                            <Link to="#">Remove Card</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="create-btn-sec">
                            <img src={IconicaddCircle} alt="" />
                            <Button type="button" className="create-btn">
                                Add new credit card
                            </Button>
                        </div>
                        <div className="create-btn-sec">
                            {/* <img src={Circle} alt="" /> */}
                            <label class="radio-button-container">
                                <span className="payments">Pay later</span>
                                <input type="radio" name="radio" value={"pay_later"} onChange={() => PaymentTypeSelect("pay_later", "pay_later")} />

                                <span class="checkmark"></span>
                            </label>


                        </div>
                        <div className="modal-footer">
                            <div className="order-total">
                                <p>
                                    <span className="subtotal">Subtotal ${userState.TotalPM.total}</span>
                                </p>
                                <p>
                                    <span className="subtotal">
                                        Shipping &amp; Handling $0.00
                                    </span>
                                </p>
                                <p>
                                    <span className="total">Total</span>{" "}
                                    <span className="amount">${userState.TotalPM.total}</span>
                                </p>
                                <Button
                                    onClick={placeOrder}
                                    className="new-order-btn btn btn-info green"
                                >
                                    Place Order
                                </Button>



                            </div>
                        </div>
                    </div>
                    <div id="confirm" className="container dataadded tab-pane fade ">
                        Confirmation
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={shippingModalClose}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer> */}
        </Modal>

        {/* ============== shippingModal End ============= */}

        {/* ======== order processing ============= */}
        <Modal className="order-processing-modal"
            show={orderProcessingModal}
            onHide={() => setOrderProcessingModal(false)}
            backdrop="static"
            keyboard={false}
            size="lg"
            centered
        >

            <Modal.Body>

                <h2>Order processing please wait!</h2>
                <img src={Loading} className="loader" alt="" />

                {<div className="loading">
                    <div className="loading-text">
                        <h2>Order processing please wait!</h2>
                        <img src={Loading} className="loader" alt="" />
                    </div>
                </div>}

            </Modal.Body>

        </Modal>
        {/* =========== end ============ */}


    </>)
}

export default Index