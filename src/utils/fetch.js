import { Message } from "@mui/icons-material";
import axios from "axios";
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL_2;
const REACT_APP_WORDPRESS_API_SERVICE_URL = process.env.REACT_APP_WORDPRESS_API_SERVICE_URL;

    //Login POST API
    export async function  fmiOrderSystemAppAppLogin(userEmail,UserPasswoard) {
            const params = {
                login_user:userEmail,
                login_password:UserPasswoard,
            }
                const basicAuthcode = window.btoa(`${userEmail}:${UserPasswoard}`);
                const myHeaders = new Headers();
                myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
                myHeaders.append("Content-Type", "application/json");
                //myHeaders.append("Authorization", `Basic ${basicAuthcode}`);

                const fmiOrderSystemAppLoginResponse = await fetch(REACT_APP_API_SERVICE_URL+ '/api/v1/admin/login', {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(params),
                    });
    
                    const  fmiOrderSystemAppResult = await fmiOrderSystemAppLoginResponse.json();
                    console.log(fmiOrderSystemAppResult);
            
                    if(fmiOrderSystemAppLoginResponse.ok) {
                    window.sessionStorage.setItem( 'access-token', fmiOrderSystemAppResult.token);
                    window.sessionStorage.setItem( 'username', fmiOrderSystemAppResult.superadmin);
                    window.sessionStorage.setItem( 'useremail', fmiOrderSystemAppResult.email);
                    window.sessionStorage.setItem( 'login', true);
                    window.sessionStorage.setItem( 'user_type', fmiOrderSystemAppResult.user_type);
                    return true;
            
                    } else {
                        const error = new Error();
                   // error.message = healthAppLoginResponseResult.message || 'Something went wrong.';
                    }
                
        };




//Order List API
export async function fmiOrderSystemAppOrderList(payload) {



    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "application/json");


    const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/order/list', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
    });

    const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
    // console.log("order list", fmiOrderSystemAppResult);

    if (fmiOrderSystemAppResponse.ok) {

        // return { result: [] };
        return fmiOrderSystemAppResult;

    } else {
        const error = new Error();
        // error.message = healthAppLoginResponseResult.message || 'Something went wrong.';
    }

};


//Order Status Change API
export async function fmiOrderSystemAppOrderStatusChange(payload) {

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "application/json");


    const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/order/status-change', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
    });

    const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
    console.log("order status", fmiOrderSystemAppResult);
    // return;

    if (fmiOrderSystemAppResponse.ok) {

        // return { result: [] };
        return fmiOrderSystemAppResult;

    } else {
        const error = new Error();
        // error.message = healthAppLoginResponseResult.message || 'Something went wrong.';
    }

};



//Order Item Status Change API
export async function fmiOrderSystemAppOrderItemStatusChange(payload) {

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "application/json");


    const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/order/item/status-change', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
    });

    const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
    console.log("order status", fmiOrderSystemAppResult);
    // return;

    if (fmiOrderSystemAppResponse.ok) {

        // return { result: [] };
        return fmiOrderSystemAppResult;

    } else {
        const error = new Error();
        // error.message = healthAppLoginResponseResult.message || 'Something went wrong.';
    }

};


//Order Details List API
export async function fmiOrderSystemAppOrderDetailsList(payload) {

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "application/json");


    const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/order/list/details', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
    });

    const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
    // console.log("order list", fmiOrderSystemAppResult);

    if (fmiOrderSystemAppResponse.ok) {

        // return { result: [] };
        return fmiOrderSystemAppResult;

    } else {
        const error = new Error();
        // error.message = healthAppLoginResponseResult.message || 'Something went wrong.';
    }

};


// Customer Add API
export async function fmiOrderSystemAppCustomerSignup(payload) {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("Content-Type", "application/json");

    try {
        const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/user-add', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(payload),
        });

        if (fmiOrderSystemAppResponse.ok) {
            const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
            // Success
            return { status: true, result: fmiOrderSystemAppResult };
        } else {
            // Server-side error
            console.log("Server error:", fmiOrderSystemAppResponse.status);
            const errorData = await fmiOrderSystemAppResponse.json();
            console.log("Server errorData ",errorData)
            return { status: false, error: errorData };
        }
    } catch (error) {
        // Network error
        console.log("Network error:", error);
        return { status: "error", error: "Network error" };
    }
}


// Customer Order List API
export async function fmiOrderSystemAppCustomerOrderList(payload) {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "application/json");

    try {
        const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/order/customer-order-view', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(payload),
        });

        if (fmiOrderSystemAppResponse.ok) {
            const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
            // Success
            return { status: true, result: fmiOrderSystemAppResult };
        } else {
            // Server-side error
            console.log("Server error:", fmiOrderSystemAppResponse.status);
            const errorData = await fmiOrderSystemAppResponse.json();
            console.log("Server errorData ",errorData)
            return { status: false, error: errorData };
        }
    } catch (error) {
        // Network error
        console.log("Network error:", error);
        return { status: "error", error: "Network error" };
    }
}


// Customer Order Status Change API
export async function fmiOrderSystemAppCustomerOrderStatusChange(payload) {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "application/json");

    try {
        const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/order/customer-order-status-change', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(payload),
        });

        if (fmiOrderSystemAppResponse.ok) {
            const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
            // Success
            return { status: true, result: fmiOrderSystemAppResult };
        } else {
            // Server-side error
            console.log("Server error:", fmiOrderSystemAppResponse.status);
            const errorData = await fmiOrderSystemAppResponse.json();
            console.log("Server errorData ",errorData)
            return { status: false, error: errorData };
        }
    } catch (error) {
        // Network error
        console.log("Network error:", error);
        return { status: "error", error: "Network error" };
    }
}



// Product Add API
export async function fmiOrderSystemAppProductAdd(payload) {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "multipart/form-data");

    try {
        const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/product/add', {
            method: 'POST',
            headers: myHeaders,
            body: payload,
        });

        if (fmiOrderSystemAppResponse.ok) {
            const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
            // Success
            return { status: true, result: fmiOrderSystemAppResult };
        } else {
            // Server-side error
            console.log("Server error:", fmiOrderSystemAppResponse.status);
            const errorData = await fmiOrderSystemAppResponse.json();
            console.log("Server errorData ",errorData)
            return { status: false, error: errorData };
        }
    } catch (error) {
        // Network error
        console.log("Network error:", error);
        return { status: "error", error: "Network error" };
    }
}


// Product Edit API
export async function fmiOrderSystemAppProductEdit(payload) {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "multipart/form-data");

    try {
        const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/product/edit', {
            method: 'POST',
            headers: myHeaders,
            body: payload,
        });

        if (fmiOrderSystemAppResponse.ok) {
            const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
            // Success
            return { status: true, result: fmiOrderSystemAppResult };
        } else {
            // Server-side error
            console.log("Server error:", fmiOrderSystemAppResponse.status);
            const errorData = await fmiOrderSystemAppResponse.json();
            console.log("Server errorData ",errorData)
            return { status: false, error: errorData };
        }
    } catch (error) {
        // Network error
        console.log("Network error:", error);
        return { status: "error", error: "Network error" };
    }
}


// Product Search API
export async function fmiOrderSystemAppProductSearch(payload) {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "application/json");

    try {
        const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/product/list', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(payload),
        });

        if (fmiOrderSystemAppResponse.ok) {
            const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
            // Success
            return { status: true, result: fmiOrderSystemAppResult };
        } else {
            // Server-side error
            console.log("Server error:", fmiOrderSystemAppResponse.status);
            const errorData = await fmiOrderSystemAppResponse.json();
            console.log("Server errorData ",errorData)
            return { status: false, error: errorData };
        }
    } catch (error) {
        // Network error
        console.log("Network error:", error);
        return { status: "error", error: "Network error" };
    }
}



// Order Add API
export async function fmiOrderSystemAppOrderAdd(payload) {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
    myHeaders.append("token", window.sessionStorage.getItem("access-token"));
    myHeaders.append("Content-Type", "application/json");

    try {
        const fmiOrderSystemAppResponse = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/order/post', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(payload),
        });

        if (fmiOrderSystemAppResponse.ok) {
            const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
            // Success
            return { status: true, result: fmiOrderSystemAppResult };
        } else {
            // Server-side error
            console.log("Server error:", fmiOrderSystemAppResponse.status);
            const errorData = await fmiOrderSystemAppResponse.json();
            console.log("Server errorData ",errorData)
            return { status: false, error: errorData };
        }
    } catch (error) {
        // Network error
        console.log("Network error:", error);
        return { status: "error", error: "Network error" };
    }
}




  export const fetchProducts = async () => {
    try {
    const getWpProducts = await axios.get(REACT_APP_WORDPRESS_API_SERVICE_URL+'/getproducts/v1/product_listing?model=landed&date_text=06/20/2023&page_no=1&pact=&pcolor&psource&isbybunch&searchquery&filter_opt');
    //console.log(getWpProducts);   
    if(getWpProducts.status == "200"){
        const products = getWpProducts.data;
        //console.log(products.items);
        return products.items;
       }else{
        console.log("Server error:", getWpProducts.status);
        const errorData = await getWpProducts.json();
        console.log("Server errorData ",errorData)
        return { status: false, error: errorData };
       }
    } catch (error) {
        // Network error
        console.log("Network error:", error);
        return { status: "error", error: "Network error" };
    }
  };