import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import CircleRight from '../../assets/images/arrow-alt-circle-right.png';
import IonicIos from '../../assets/images/iconic-ios-add-circle-small.png';
// import CustomerSelectDropdown from "../../compoments/customer/CustomerSelectDropdown";
import CustomerAutoSearch from "../../compoments/customer/CustomerAutoSearch";
import customerService from '../../services/customer.service';
import orderEntryService from '../../services/orderEntry.service';
import Moment from 'react-moment';
import CustomerCreateModalForm from "../../compoments/customer/CreateModalForm";
import CustomerEditModalForm from "../../compoments/customer/EditModalForm";
import CustomPagination from '../../compoments/CustomPagination'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function AdvanceSearch() {

    const [CustomerData, setCustomerData] = useState([]);
    const [SelectCustomerData, setSelectCustomerData] = useState(null);
    const [EditModalChangeStatus, setEditModalChangeStatus] = useState(false);
    const [AdvanceSearch, setAdvanceSearch] = useState({
        customer_id: '',
        state_id: '',
        sales_rep_id: '',
        limit: 10,
        page_no: 1
    });
    const navigate = useNavigate();

    const [TableData, setTableData] = useState([]);
    const [CustomerID, setCustomerID] = useState(null);

    const [othersOption, setOthersOption] = useState({
        activePage: 1,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        pageRangeDisplayed: 0
    })

    // const getCustomerList = async () => {
    //     var responce = await customerService.findAll("");
    //     setCustomerData(responce.data.data)
    // }


    const advanceSearchData = async (pageNumber) => {

        var payload = {
            customer_id: AdvanceSearch.customer_id,
            state_id: AdvanceSearch.state_id,
            sales_rep_id: AdvanceSearch.sales_rep_id,
            limit: AdvanceSearch.limit,
            page_no: pageNumber
        }

        console.log(payload)

        var responce = await orderEntryService.advanceSearch(payload);

        console.log(responce.data)



        var pageObj = {
            activePage: pageNumber,
            itemsCountPerPage: AdvanceSearch.limit,
            totalItemsCount: responce.data.total_count,
            pageRangeDisplayed: responce.data.total_page
        }

        setOthersOption(pageObj);
        setTableData(responce.data.data);


    }

    var CustomerModalIdSet = (id) => {
        // alert(id);
        setCustomerID(id);
    }

    const handlePageChange = (pageNumber) => {


        // You can also make an API call or update your data based on the new page number

        advanceSearchData(pageNumber);


    };


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




    useEffect(() => {
        // getCustomerList();


        console.log("SelectCustomerData  ", SelectCustomerData)

        if (SelectCustomerData != null) {

            setAdvanceSearch({ ...AdvanceSearch, customer_id: SelectCustomerData.id });
        } else {
            setAdvanceSearch({ ...AdvanceSearch, customer_id: '' });
        }

    }, [SelectCustomerData, EditModalChangeStatus])


    useEffect(() => {
        handlePageChange(1)
    }, [AdvanceSearch])



    return (
        <>
            <div className="order-search search-box">
                <h1>Orders Entry</h1>
                <span>Start an order for a customer.</span>
                <Link to="/order-entry">
                    <button type="button">Simple search
                        <img src={CircleRight} alt="" className="circle-right" />
                    </button>
                </Link>


                <div className="row d-lg-flex align-items-center top-row">
                    <div className="col-lg-5">
                        <div className="search-input autocomplete">
                            {/* <CustomerSelectDropdown options={CustomerData} setSelectCustomerData={setSelectCustomerData} EditModalChangeStatus={EditModalChangeStatus} /> */}

                            <CustomerAutoSearch setSelectCustomerData={setSelectCustomerData} EditModalChangeStatus={EditModalChangeStatus} />

                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="select-box">
                            <select className="form-select">
                                <option selected="">All States</option>
                                <option value={1}>FedEx Priority</option>
                                <option value={2}>FedEx Priority</option>
                                <option value={3}>FedEx Priority</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="select-box">
                            <select className="form-select" onChange={(e) => setAdvanceSearch({ ...AdvanceSearch, sales_rep_id: e.target.value })}>
                                <option value={""} selected="">All Sales Rep</option>
                                <option value={1}>Somnath halder</option>
                                <option value={2}>Akash Das</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="create-btn-sec pt-lg-0">
                            <img src={IonicIos} alt="" />

                            <button type="button"
                                className="create-btn"
                                data-bs-toggle="modal"
                                data-bs-target=".customer-create-form"
                            >Create new customer</button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-hover order-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Sales Rep</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>State</th>
                        <th>Last Order</th>
                        <th />
                    </tr>
                </thead>
                <tbody>

                    {TableData.length > 0 && (
                        TableData.map((item, index) => (<>
                            <tr key={index}>
                                <td className="company_name">
                                    {item.company_name}
                                    <div className="edit_name">
                                        <a href="#" className="edit_user"
                                            data-bs-toggle="modal"
                                            data-bs-target=".customer-edit-form"
                                            onClick={() => CustomerModalIdSet(item.id)}
                                        >
                                            Edit User |
                                        </a>
                                        <a href="#" className="remove_user">
                                            Remove
                                        </a>
                                    </div>
                                </td>
                                <td>{item.sales_rep_name}</td>
                                <td className="company_mail">{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.state_name}</td>
                                <td> {item.last_date && <Moment date={item.last_date} format="MM/DD/YYYY" />}  </td>
                                <td>
                                    <button
                                        type="button"
                                        className="new-order-btn btn btn-info green"
                                        onClick={() => selectedSingleCustomerGet(item.id)}
                                    >
                                        Start order
                                    </button>
                                </td>
                            </tr>
                        </>))
                    )}


                    {/* <tr>
                        <td className="company_name">
                            The Robin's Nest Flower Shoppe
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Anthony Vergara</td>
                        <td className="company_mail">
                            robinsnestflowers@zoominternet.net
                        </td>
                        <td>(814) 734-7117</td>
                        <td>PA</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="company_name">
                            Royal Event And Design
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Grace Perdomo</td>
                        <td className="company_mail">debi@royaleventsan sswsign.com</td>
                        <td>(704) 488-9717</td>
                        <td>NC</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="company_name">
                            101 Flowers
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Anthony Vergara</td>
                        <td className="company_mail">101.flowers@gmail.com</td>
                        <td>(818) 878-9101</td>
                        <td>CA</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="company_name">
                            The Robin's Nest Flower Shoppe
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Anthony Vergara</td>
                        <td className="company_mail">
                            robinsnestflowers@ zoominternet.net
                        </td>
                        <td>(814) 734-7117</td>
                        <td>PA</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="company_name">
                            Royal Event And Design
                            <div className="edit_name">
                                <a href="#" className="edit_user">
                                    Edit User |
                                </a>
                                <a href="#" className="remove_user">
                                    Remove
                                </a>
                            </div>
                        </td>
                        <td>Grace Perdomo</td>
                        <td className="company_mail">debi@royaleventsan sswsign.com</td>
                        <td>(704) 488-9717</td>
                        <td>NC</td>
                        <td>10/21/2021</td>
                        <td>
                            <button
                                type="submit"
                                className="new-order-btn btn btn-info green"
                            >
                                Start order
                            </button>
                        </td>
                    </tr> */}
                </tbody>
            </table>

            {/* -====== pagination =========== */}
            {TableData.length > 0 && <CustomPagination handlePageChange={handlePageChange} othersOption={othersOption} />}

            {/* ====== modal ======== */}
            <CustomerCreateModalForm />

            <CustomerEditModalForm id={CustomerID} Step={1} setEditModalChangeStatus={setEditModalChangeStatus} EditModalChangeStatus={EditModalChangeStatus} />

        </>
    )
}

export default AdvanceSearch;
