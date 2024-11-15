const validateRequired = (value) => !!value.length;


function validateData(data) {
    return {
        farm: !validateRequired(data.farm) ? 'Farm is Required' : '',
        cost: !validateRequired(data.cost) ? 'Cost is Required' : '',
        product_details: !validateRequired(data.product_details) ? 'Product Details is Required' : '',
    };
}


export { validateData,validateRequired };