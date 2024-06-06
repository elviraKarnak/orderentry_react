import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import customerService from '../../services/customer.service';
import { toast } from 'react-toastify';

function CustomerAutoSearch(props) {

    const [Results, setResults] = useState([]);
    const [SelectObj,setSelectObj]=useState({});

    // note: the id field is mandatory
    const items = [
        {
            id: 0,
            customer_name: "Cobol",
            company_name: "company 1",
            customer_no: "123",
            phone: "1234567890"
        },
        {
            id: 1,
            customer_name: "JavaScript",
            company_name: "company 2",
            customer_no: "1234",
            phone: "1234567890"
        },
        {
            id: 2,
            customer_name: "Basic",
            company_name: "company 3",
            customer_no: "12345",
            phone: "1234567890"
        },
        {
            id: 3,
            customer_name: "PHP",
            company_name: "company 4",
            customer_no: "123456",
            phone: "1234567890"
        },
        {
            id: 4,
            customer_name: "Java",
            company_name: "company 5",
            customer_no: "1234567",
            phone: "1234567890"
        },
    ];

    const getCustomerList = async (inputValue) => {
        if (inputValue.length > 0 && inputValue != " ") {
            var responce = await customerService.findAll(inputValue);

            // console.log(responce.data)

            const options = responce.data.data.filter((i) => {
                return (i.customer_name = `${i.firstname} ${i.lastname}`);
            })

            setResults(options)


        }
    }

    const getCustomerById = async (id) => {
         
        if (id !== undefined || id !== null || id !== "") {

            var responce = await customerService.findOne(id);

            if (responce.data.status) {
                // console.log(responce.data.data[0])
                props.setSelectCustomerData(responce.data.data[0])
            } else {
                toast.error(responce.data.msg)
                props.setSelectCustomerData(null)
            }


        }
    }

    const getSingleCustomer = async () => {

        if (Object.keys(SelectObj).length > 0) {
            // ========= perticular customer api call =======
            var responce = await customerService.findOne(SelectObj.id);
            if (responce.data.status) {
                // console.log(responce.data.data[0])
                props.setSelectCustomerData(responce.data.data[0])
            } else {
                toast.error(responce.data.msg)
                props.setSelectCustomerData(null)
            }

        } else {
            props.setSelectCustomerData(null)
        }
    }



    const handleOnSearch = async (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log("Search ", string, results);

        await getCustomerList(string.toLowerCase())

    };





    const handleOnSelect = async (item) => {
        // the item selected
        console.log("selected ", item);


        // ========= perticular customer api call =======
        setSelectObj(item)
    };



    // Function to render the items in the dropdown
    const handleRenderItem = (item, isHighlighted) => (
        <div key={item.id}>
            {item.company_name} <br /> {item.customer_name}
        </div >
    );

    useEffect(() => {
        getSingleCustomer()
    }, [props.EditModalChangeStatus,SelectObj])


    useEffect(() => {
        // console.log("props  ", JSON.stringify(props))
        if (props.CustomerId) {
            // alert(props.CustomerId)
            getCustomerById(props.CustomerId)
        }

    }, [props.CustomerId])


    return (
        <ReactSearchAutocomplete
            items={Results}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            formatResult={handleRenderItem}
            fuseOptions={{ keys: ["phone", "company_name", "customer_no", "customer_name"] }}
            resultStringKeyName="company_name"
            autoFocus
            placeholder="Type Customer Name"
            styling={{ zIndex: 4 }}
            showClear={false}
        />
    )
}

export default CustomerAutoSearch