import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerSchama } from "../../../schemas/customer.schema"

import Contact from './Contact';
import BillingAddr from './BillingAddr';
import ShippingAddr from './ShippingAddr';

import countryState from '../../../services/countryState.service';
import { toast } from "react-toastify";
import customerService from '../../../services/customer.service';

function Index(props) {

    

    const [Step, setStep] = useState(1);
    const [CustomerData, setCustomerData] = useState(null);

    const methods = useForm({
        resolver: yupResolver(CustomerSchama),
    });

    const { handleSubmit, reset, trigger } = methods;

    const [Country, setCountry] = useState([]);

    // ===== ship ====
    const [sameBillAddr, setsameBillAddr] = useState(false);

    const getCountries = async () => {
        var responce = await countryState.getAllCountry();
        // console.log(responce.data);
        setCountry([...responce.data.data])
    }

    const getCustomer = async () => {
        // alert(props.id)
  
        var responce = await customerService.findOne(props.id);

        // console.log("single customerv ", responce.data);



        if (responce.data.status) {
            var customerData = responce.data.data[0];
            // alert(customerData.same_bill_addr_status);

            var same_bill_addr_status = customerData.same_bill_addr_status == 1 ? true : false;

            setsameBillAddr(same_bill_addr_status);

            reset({
                company_name: customerData.company_name,
                firstname: customerData.firstname,
                lastname: customerData.lastname,
                email: customerData.email,
                phone: customerData.phone,
                bill_addr_1: customerData.bill_addr.bill_addr_1,
                bill_addr_2: customerData.bill_addr.bill_addr_2,
                bill_country_id: customerData.bill_addr.bill_country_id,
                bill_state_id: customerData.bill_addr.bill_state_id,
                bill_city_name: customerData.bill_addr.bill_city_name,
                bill_zip_code: customerData.bill_addr.bill_zip_code,
                same_bill_addr_status: same_bill_addr_status,
                ship_method: customerData.ship_addr.ship_method,
                ship_contact_name: !same_bill_addr_status ? customerData.ship_addr.ship_contact_name : "",
                ship_phone: !same_bill_addr_status ? customerData.ship_addr.ship_phone : "",
                ship_addr_1: !same_bill_addr_status ? customerData.ship_addr.ship_addr_1 : "",
                ship_addr_2: !same_bill_addr_status ? customerData.ship_addr.ship_addr_2 : "",
                ship_country_id: !same_bill_addr_status ? customerData.ship_addr.ship_country_id : "",
                ship_state_id: !same_bill_addr_status ? customerData.ship_addr.ship_state_id : "",
                ship_city_name: !same_bill_addr_status ? customerData.ship_addr.ship_city_name : "",
                ship_zip_code: !same_bill_addr_status ? customerData.ship_addr.ship_zip_code : "",
                ship_delivery_ins: !same_bill_addr_status ? customerData.ship_addr.ship_delivery_ins : "",
            })

            setCustomerData(customerData);

        } else {
            reset();
        }
    }

    const onNext = async () => {
        var validate = false;
        if (Step === 1) {
            validate = await trigger(['company_name', 'firstname', 'lastname', 'email', 'phone']);
        }

        if (Step === 2) {
            validate = await trigger(['bill_addr_1', 'bill_country_id', 'bill_state_id', 'bill_city_name', 'bill_zip_code']);
        }

        // console.log(validate);
        if (validate)
            setStep((prev) => prev + 1)
    }

    const onBack = async () => {
        setStep((prev) => prev - 1)
    }

    const onCancle = async () => {
        reset();
        setStep(1);
    }


    const onSubmitFinal = async (data) => {
        // console.log(data);

        var same_bill_addr_status = data.same_bill_addr_status === true ? '1' : '0';
        

        var formdata = new FormData();
        formdata.append("company_name", data.company_name)
        formdata.append("firstname", data.firstname)
        formdata.append("lastname", data.lastname)
        formdata.append("email", data.email)
        formdata.append("phone", data.phone)
        formdata.append("bill_addr_1", data.bill_addr_1)
        formdata.append("bill_addr_2", data.bill_addr_2)
        formdata.append("bill_country_id", data.bill_country_id)
        formdata.append("bill_state_id", data.bill_state_id)
        formdata.append("bill_city_name", data.bill_city_name)
        formdata.append("bill_zip_code", data.bill_zip_code)
        formdata.append("ship_contact_name", !data.same_bill_addr_status ? data.ship_contact_name : "")
        formdata.append("ship_phone", !data.same_bill_addr_status ? data.ship_phone : "")
        formdata.append("ship_addr_1", !data.same_bill_addr_status ? data.ship_addr_1 : "")
        formdata.append("ship_addr_2", !data.same_bill_addr_status ? data.ship_addr_2 : "")
        formdata.append("ship_country_id", !data.same_bill_addr_status ? data.ship_country_id : "")
        formdata.append("ship_state_id", !data.same_bill_addr_status ? data.ship_state_id : "")
        formdata.append("ship_city_name", !data.same_bill_addr_status ? data.ship_city_name : "")
        formdata.append("ship_zip_code", !data.same_bill_addr_status ? data.ship_zip_code : "")
        formdata.append("ship_method", data.ship_method)
        formdata.append("ship_delivery_ins", !data.same_bill_addr_status ? data.ship_delivery_ins : "")
        formdata.append("same_bill_addr_status", same_bill_addr_status)


        formdata.append("customer_id", CustomerData.id)
        formdata.append("bill_id", CustomerData.bill_addr.id)
        formdata.append("ship_id", CustomerData.ship_addr.id)
     

        var responce = await customerService.update(formdata);



        // console.log(responce.data)

        if (responce.data.status) {
            toast.success(responce.data.msg)
            // reset();
            // setStep(1)
        } else {
            toast.success(responce.data.error.msg)
        }

        var ss=props.EditModalChangeStatus?false:true;
        props.setEditModalChangeStatus(ss);
        getCustomer()


    }

    useEffect(() => {
        getCountries();
        getCustomer();
        // console.log(props.Step)
        setStep(props.Step)
    }, [props.Step,props.id])


    return (
        <>
            <FormProvider {...methods} >

                <form onSubmit={handleSubmit(onSubmitFinal)}>
                    {/* The Modal */}
                    <div className="modal customer-edit-form" id="edit-flowershop"  >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">
                                        Edit The Flower Shop
                                    </h4>
                                    <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        onClick={onCancle}
                                    ></button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <p className={`nav-link ${Step === 1 && 'active'}`} onClick={() => setStep
                                                (1)}  >
                                                Contact
                                            </p>
                                        </li>
                                        <li className="nav-item">
                                            <p className={`nav-link ${Step === 2 && 'active'}`} onClick={() => setStep
                                                (2)} >
                                                Billing
                                            </p>
                                        </li>
                                        <li className="nav-item">
                                            <p className={`nav-link ${Step === 3 && 'active'}`} onClick={() => setStep
                                                (3)} >
                                                Shipping
                                            </p>
                                        </li>
                                    </ul>
                                    <div className="tab-content">

                                        <div id="menu1" className={`container tab-pane ${Step === 1 && 'active show'}`} >
                                            {/* contact form */}
                                             <Contact onCancle={onCancle} />
                                        </div>
                                        <div id="menu2" className={`container tab-pane fade  ${Step === 2 && 'active show'} `} >
                                            {/* bill addr */}
                                             <BillingAddr CustomerData={CustomerData} onCancle={onCancle} Country={Country} />
                                        </div>
                                        <div id="menu3" className={`container tab-pane fade ${Step === 3 && 'active show'}`}
                                        >

                                             <ShippingAddr CustomerData={CustomerData} onCancle={onCancle} Country={Country} setsameBillAddr={setsameBillAddr} sameBillAddr={sameBillAddr} />


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default Index



