import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerSchama } from "../../../schemas/customer.schema"

import Contact from './Contact';
import BillingAddr from './BillingAddr';
import ShippingAddr from './ShippingAddr';
import customer from '../../../services/customer.service';

import countryState from '../../../services/countryState.service';
import { toast } from "react-toastify";

function CreateModalFrom() {

    const [Step, setStep] = useState(1);

    const methods = useForm({
        resolver: yupResolver(CustomerSchama),
    });

    const { handleSubmit, reset, trigger } = methods;

    const [Country, setCountry] = useState([]);

    // ===== ship
    const [sameBillAddr, setsameBillAddr] = useState(false);

    const getCountries = async () => {
        var responce = await countryState.getAllCountry();
        // console.log(responce.data);
        setCountry([...responce.data.data])
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
        console.log(data);

        var same_bill_addr_status = data.same_bill_addr_status == null ? '0' : '1';

        var formdata = new FormData();
        formdata.append("company_name", data.company_name)
        formdata.append("firstname", data.firstname)
        formdata.append("lastname", data.lastname)
        formdata.append("email", data.email)
        formdata.append("phone", data.phone)

        // formdata.append("username", data.username)
        // formdata.append("customer_service_representative", data.customer_service_representative)
        // formdata.append("customer_no", data.customer_no)
        // formdata.append("password", data.password)
        // formdata.append("confirm_password", data.confirm_password)

        formdata.append("bill_addr_1", data.bill_addr_1)
        formdata.append("bill_addr_2", data.bill_addr_2)
        formdata.append("bill_country_id", data.bill_country_id)
        formdata.append("bill_state_id", data.bill_state_id)
        formdata.append("bill_city_name", data.bill_city_name)
        formdata.append("bill_zip_code", data.bill_zip_code)

        formdata.append("ship_contact_name", same_bill_addr_status === '0' ? data.ship_contact_name : "")
        formdata.append("ship_phone", same_bill_addr_status === '0' ? data.ship_phone : "")
        formdata.append("ship_addr_1", same_bill_addr_status === '0' ? data.ship_addr_1 : "")
        formdata.append("ship_addr_2", same_bill_addr_status === '0' ? data.ship_addr_2 : "")
        formdata.append("ship_country_id", same_bill_addr_status === '0' ? data.ship_country_id : "")
        formdata.append("ship_state_id", same_bill_addr_status === '0' ? data.ship_state_id : "")
        formdata.append("ship_city_name", same_bill_addr_status === '0' ? data.ship_city_name : "")
        formdata.append("ship_zip_code", same_bill_addr_status === '0' ? data.ship_zip_code : "")
        formdata.append("ship_method", data.ship_method)
        formdata.append("ship_delivery_ins", same_bill_addr_status === '0' ? data.ship_delivery_ins : "")
        formdata.append("same_bill_addr_status", same_bill_addr_status)

        var responce = await customer.create(formdata);



        console.log(responce.data)

        if (responce.data.status) {
            toast.success(responce.data.msg)
            reset();
            setStep(1)
        } else {
            toast.success(responce.data.error.msg)
        }

        setsameBillAddr(false);

    }

    useEffect(() => {
        getCountries();
    }, [])


    return (
        <>
            <FormProvider {...methods} >

                <form onSubmit={handleSubmit(onSubmitFinal)}>
                    {/* The Modal */}
                    <div className="modal customer-create-form" id="edit-flowershop"  >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">
                                        Create Customer
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
                                            <p className={`nav-link ${Step === 1 && 'active'}`}  >
                                                Contact
                                            </p>
                                        </li>
                                        <li className="nav-item">
                                            <p className={`nav-link ${Step === 2 && 'active'}`}  >
                                                Billing
                                            </p>
                                        </li>
                                        <li className="nav-item">
                                            <p className={`nav-link ${Step === 3 && 'active'}`} >
                                                Shipping
                                            </p>
                                        </li>
                                    </ul>
                                    <div className="tab-content">

                                        <div id="menu1" className={`container tab-pane ${Step === 1 && 'active show'}`} >
                                            {/* contact form */}
                                            {Step === 1 && <Contact onNext={onNext} onCancle={onCancle} />}
                                        </div>
                                        <div id="menu2" className={`container tab-pane fade  ${Step === 2 && 'active show'} `} >
                                            {/* bill addr */}
                                            {Step === 2 && <BillingAddr onNext={onNext} onBack={onBack} onCancle={onCancle} Country={Country} />}
                                        </div>
                                        <div id="menu3" className={`container tab-pane fade ${Step === 3 && 'active show'}`}
                                        >

                                            <ShippingAddr onNext={onNext} onBack={onBack} onCancle={onCancle} Country={Country} setsameBillAddr={setsameBillAddr} sameBillAddr={sameBillAddr} />


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

export default CreateModalFrom

