import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import customerService from '../../services/customer.service';
import { toast } from 'react-toastify';

// const options = [
//     { customer_no: 'John Doe', company_name: 'Manager', customer_name: '123-456-7890',phone:'121211221'},
//     { name: 'Jane Smith', title: 'Developer', phone: '987-654-3210', label: "bb" },
//     // Add more options here
// ];

const CustomerSelectDropdown = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [Options, setOptions] = useState([]);



    const getCustomerList = async (inputValue) => {
        if (inputValue.length > 0 && inputValue != " ") {
            var responce = await customerService.findAll(inputValue);

            console.log(responce.data)

            const options = responce.data.data.filter((i) => {
                return (i.customer_name = `${i.firstname} ${i.lastname}`);
            })

            setOptions(options)
            setSearchInput(inputValue);
        }
    }

    const handleChange = async (selectedOption) => {
        console.log("selectedOption ", selectedOption)
        if (selectedOption != null) {

            // ======= api call ====== //
            var responce = await customerService.findOne(selectedOption.id);
            if (responce.data.status) {
                props.setSelectCustomerData(responce.data.data[0])
            } else {
                toast.error(responce.data.msg)
            }
        } else {
            props.setSelectCustomerData(null)
        }

        setSelectedOption(selectedOption);

    };

    const handleInputChange = (inputValue) => {
        // alert(1)
        getCustomerList(inputValue);
    };

    const filterOptions = (option) => {
        const { customer_no, company_name, customer_name, phone } = option.data;
        const searchValue = searchInput.toLowerCase();

        return (
            customer_no.includes(searchValue) ||
            company_name.toLowerCase().includes(searchValue) ||
            customer_name.toLowerCase().includes(searchValue) ||
            phone.includes(searchValue)
        );
    };

    const getOptionLabel = (option) => {
        if (selectedOption != null)
            return (<>{option.company_name}</>)
        return (<>{option.company_name} <br /> {option.customer_name}</>)
    }

    useEffect(() => {
        handleChange(selectedOption)
    }, [props.EditModalChangeStatus])


    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            onInputChange={handleInputChange}
            options={Options}
            filterOption={filterOptions}
            getOptionLabel={getOptionLabel}
            getOptionValue={(option) => option.customer_name}
            placeholder={"Type Customer Name"}
            isClearable={false}
            isSearchable={true}
            isOptionSelected={() => { return props.setSelectCustomerData(null); }}

        />
    );
};

export default CustomerSelectDropdown;
