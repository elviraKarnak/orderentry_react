import { Message } from "@mui/icons-material";
import axios from "axios";
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL_2;
const REACT_APP_WORDPRESS_API_SERVICE_URL =
  process.env.REACT_APP_WORDPRESS_API_SERVICE_URL;

//Login POST API
export async function fmiOrderSystemAppAppLogin(userEmail, UserPasswoard) {
  const params = {
    login_user: userEmail,
    login_password: UserPasswoard,
  };
  const basicAuthcode = window.btoa(`${userEmail}:${UserPasswoard}`);
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
  myHeaders.append("Content-Type", "application/json");
  //myHeaders.append("Authorization", `Basic ${basicAuthcode}`);

  const fmiOrderSystemAppLoginResponse = await fetch(
    REACT_APP_API_SERVICE_URL + "/api/v1/admin/login",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(params),
    }
  );

  const fmiOrderSystemAppResult = await fmiOrderSystemAppLoginResponse.json();
  console.log(fmiOrderSystemAppResult);

  if (fmiOrderSystemAppLoginResponse.ok) {
    window.sessionStorage.setItem(
      "access-token",
      fmiOrderSystemAppResult.token
    );
    window.sessionStorage.setItem("username", fmiOrderSystemAppResult.username);
    window.sessionStorage.setItem("useremail", fmiOrderSystemAppResult.email);
    window.sessionStorage.setItem("login", true);
    window.sessionStorage.setItem("role_id", fmiOrderSystemAppResult.role_id);
    window.sessionStorage.setItem(
      "permisionData",
      JSON.stringify(fmiOrderSystemAppResult.permisionData)
    );
    window.sessionStorage.setItem(
      "farmUserList",
      JSON.stringify(fmiOrderSystemAppResult.farmUserList)
    );

    /////////////////////////////
    var paylaod = {
      authUser: {
        user_id: fmiOrderSystemAppResult.user_id,
        username: fmiOrderSystemAppResult.username,
        email: fmiOrderSystemAppResult.email,
        role_id: fmiOrderSystemAppResult.role_id,
        permisionData: fmiOrderSystemAppResult.permisionData,
      },
      farmUserList: fmiOrderSystemAppResult.farmUserList,
    };
    ////////////////////////////

    return {
      status: true,
      userData: paylaod,
    };

    // return true;
  } else {
    return {
      status: false,
      userData: {},
    };
    // const error = new Error();
    // error.message = healthAppLoginResponseResult.message || 'Something went wrong.';
  }
}

//Order List API
export async function fmiOrderSystemAppOrderList(payload) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
  myHeaders.append("token", window.sessionStorage.getItem("access-token"));
  myHeaders.append("Content-Type", "application/json");

  const fmiOrderSystemAppResponse = await fetch(
    REACT_APP_API_SERVICE_URL + "/api/v1/admin/order/list",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
    }
  );

  const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
  // console.log("order list", fmiOrderSystemAppResult);

  if (fmiOrderSystemAppResponse.ok) {
    // return { result: [] };
    return fmiOrderSystemAppResult;
  } else {
    const error = new Error();
    // error.message = healthAppLoginResponseResult.message || 'Something went wrong.';
  }
}

//Order Status Change API
export async function fmiOrderSystemAppOrderStatusChange(payload) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
  myHeaders.append("token", window.sessionStorage.getItem("access-token"));
  myHeaders.append("Content-Type", "application/json");

  const fmiOrderSystemAppResponse = await fetch(
    REACT_APP_API_SERVICE_URL + "/api/v1/admin/order/status-change",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
    }
  );

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
}

//Order Item Status Change API
export async function fmiOrderSystemAppOrderItemStatusChange(payload) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
  myHeaders.append("token", window.sessionStorage.getItem("access-token"));
  myHeaders.append("Content-Type", "application/json");

  const fmiOrderSystemAppResponse = await fetch(
    REACT_APP_API_SERVICE_URL + "/api/v1/admin/order/item/status-change",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
    }
  );

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
}

//Order Details List API
export async function fmiOrderSystemAppOrderDetailsList(payload) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
  myHeaders.append("token", window.sessionStorage.getItem("access-token"));
  myHeaders.append("Content-Type", "application/json");

  const fmiOrderSystemAppResponse = await fetch(
    REACT_APP_API_SERVICE_URL + "/api/v1/admin/order/list/details",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
    }
  );

  const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
  // console.log("order list", fmiOrderSystemAppResult);

  if (fmiOrderSystemAppResponse.ok) {
    // return { result: [] };
    return fmiOrderSystemAppResult;
  } else {
    const error = new Error();
    // error.message = healthAppLoginResponseResult.message || 'Something went wrong.';
  }
}

// Customer Add API
export async function fmiOrderSystemAppCustomerSignup(payload) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
  myHeaders.append("Content-Type", "application/json");

  try {
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL + "/api/v1/admin/user-add",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
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
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL + "/api/v1/admin/order/customer-order-view",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
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
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL +
        "/api/v1/admin/order/customer-order-status-change",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
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
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL + "/api/v1/admin/product/add",
      {
        method: "POST",
        headers: myHeaders,
        body: payload,
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
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
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL + "/api/v1/admin/product/edit",
      {
        method: "POST",
        headers: myHeaders,
        body: payload,
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
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
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL + "/api/v1/admin/product/list",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
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
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL + "/api/v1/admin/order/post",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
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
    const getWpProducts = await axios.get(
      REACT_APP_WORDPRESS_API_SERVICE_URL +
        "/getproducts/v1/product_listing?model=landed&date_text=06/20/2023&page_no=1&pact=&pcolor&psource&isbybunch&searchquery&filter_opt"
    );
    //console.log(getWpProducts);
    if (getWpProducts.status == "200") {
      const products = getWpProducts.data;
      //console.log(products.items);
      return products.items;
    } else {
      console.log("Server error:", getWpProducts.status);
      const errorData = await getWpProducts.json();
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

/// get category list
export async function categoryList(payload = {}) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
  myHeaders.append("token", window.sessionStorage.getItem("access-token"));
  myHeaders.append("Content-Type", "application/json");

  try {
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL + "/api/v1/admin/category/list",
      {
        method: "POST",
        headers: myHeaders,
        // body: JSON.stringify(payload),
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

/// get color list
export async function colorList(payload = {}) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
  myHeaders.append("token", window.sessionStorage.getItem("access-token"));
  myHeaders.append("Content-Type", "application/json");

  try {
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL + "/api/v1/admin/color/list",
      {
        method: "POST",
        headers: myHeaders,
        // body: JSON.stringify(payload),
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

// Product Add API
export async function ProductAdd(payload) {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/product/add`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

// Product Entry Add API
export async function ProductEntryAdd(payload) {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/stating-inventory/productEntry`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: payload,
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

// Product Edit API
export async function ProductEdit(payload) {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/product/edit`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

// Product get API
export async function fetchProducts_2(payload = {}) {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/product/list`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      // data: payload,
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return fmiOrderSystemAppResult.results;
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

// Product delete API
export async function ProductDelete(payload) {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/product/delete`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: payload,
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

// Product Order entry Search API
export async function fmiOrderSystemAppProductOrderEntrySearch(payload) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
  myHeaders.append("token", window.sessionStorage.getItem("access-token"));
  myHeaders.append("Content-Type", "application/json");

  try {
    const fmiOrderSystemAppResponse = await fetch(
      REACT_APP_API_SERVICE_URL + "/api/v1/admin/product/order-entry-list",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
      }
    );

    if (fmiOrderSystemAppResponse.ok) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.json();
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.json();
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

// let axiosApiCall = async (url,methodType,Data) => {

//   const myHeaders = new Headers ();

//   let config = {
//     method: methodType,
//     maxBodyLength: Infinity,
//     url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/stating-inventory/list`,
//     headers: {
//       'x-api-key': 'b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9',
//       token: window.sessionStorage.getItem ('access-token'),
//       'Content-Type': 'application/json',
//     }
//   };

// }

export const getStagingInventoryList = async () => {
  try {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/stating-inventory/list`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

export const getStagingInventoryProductSearch = async (paylaod) => {
  try {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/stating-inventory/productSearchList?search_text=${paylaod}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

//Sataging Inventory Item Status Change API
export async function SatagingInventoryItemStatusChange(payload) {
  try {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/stating-inventory/itemsStatusChange`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: payload,
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

//Sataging Inventory Item Bluk Status Change API
export async function SatagingInventoryItemBlukStatusChange(payload) {
  try {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/stating-inventory/itemsBlukStatusChange`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

export async function orderItemUpdateApi(payload) {
  try {
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/order/item/update`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

export async function getUserRolesApi() {
  try {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/role-list`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

export async function getUserListApi() {
  try {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/user-list`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

export async function createUserApi(payload) {
  try {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/user-add`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

export async function editUserApi(userId, payload) {
  try {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/user-edit/${userId}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

export async function deleteUserApi(userId) {
  try {
    let config = {
      method: "DELETE",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/user-del/${userId}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

export async function getMenuModulesApi() {
  try {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/get-menu-modules`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

export async function editRolePermissionApi(id, payload) {
  try {
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/update-role-permission/${id}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
}

// # FARM API START
export const farmOrderListAPi = async (farm_id = null) => {
  try {
    var url = `${REACT_APP_API_SERVICE_URL}/api/v1/admin/farm/order-list`;

    if (farm_id) {
      url = `${REACT_APP_API_SERVICE_URL}/api/v1/admin/farm/order-list?farm_id=${farm_id}`;
    }

    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

export const farmOrderUpdateApi = async (order_id, payload) => {
  try {
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/farm/order-update/${order_id}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

export const farmOrderUpdateBYAdminApi = async (order_id, payload) => {
  try {
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/farm/order-update-by-admin/${order_id}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

export const farmOrderItemUpdateApi = async (id, payload) => {
  try {
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/farm/order-item-update/${id}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

/**
 *
 * @param {*} payload
 * @param {string|number} payload.order_id
 * @param {string} payload.status [accepted | canceled]
 * @returns {Promise}
 */
export const farmOrderStatusUpdateApi = async (payload) => {
  try {
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/farm/order-status-change`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

/**
 *
 * @param {*} payload
 * @param {string|number} payload.id [order meta id]
 * @param {string} payload.status [accepted | canceled]
 * @returns {Promise}
 */
export const farmOrderItemStatusUpdateApi = async (payload) => {
  try {
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/farm/order-item-status-change`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

/**
 * @param {*} payload
 * @param {string} payload.id
 * @param {file object} payload.invoice_file
 */
export const farmInvoiceFileUploadApi = async (payload) => {
  try {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/farm/invoice-file-upload`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

/**
 * @param {*} payload
 * @param {string} payload.id
 */
export const farmInvoiceFileDeleteApi = async (payload) => {
  try {
    let config = {
      method: "DELETE",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/farm/invoice-file-delete`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const fmiOrderSystemAppResponse = await axios.request(config);

    if (fmiOrderSystemAppResponse.status === 200) {
      const fmiOrderSystemAppResult = await fmiOrderSystemAppResponse.data;
      // Success
      return { status: true, result: fmiOrderSystemAppResult };
    } else {
      // Server-side error
      console.log("Server error:", fmiOrderSystemAppResponse.status);
      const errorData = await fmiOrderSystemAppResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error: "Network error" };
  }
};

// # FARM API END

// ---------------------------  Customer API START ----------------------------------->

export const customerAddApi = async (payload) => {
  try {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/customer/customer-add`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const customerAddResponse = await axios.request(config);

    if (customerAddResponse.status === 200) {
      const responseResult = await customerAddResponse.data;
      // Success
      return { status: true, result: responseResult };
    } else {
      // Server-side error
      console.log("Server error:", customerAddResponse.status);
      const errorData = await customerAddResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error };
  }
};

export const findAllCustomersApi = async () => {
  try {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/customer/customer-list`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    const customersListResponse = await axios.request(config);

    if (customersListResponse.status === 200) {
      const responseResult = await customersListResponse.data;
      // Success
      return { status: true, result: responseResult };
    } else {
      // Server-side error
      console.log("Server error:", customersListResponse.status);
      const errorData = await customersListResponse.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error };
  }
};

// ----------------------------------------- Customer API END -----------------------------------X

// ------------------------------------------ Customer Address API Start -------------------------

export const AddcustomerAddressApi = async (payload) => {
  try {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/customer/customer-addr-add`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const responseResult = await response.data;
      // Success
      return { status: true, result: responseResult };
    } else {
      // Server-side error
      console.log("Server error:", response.status);
      const errorData = await response.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error };
  }
};

export const editCustomerAddressApi = async (payload, address_id) => {
  try {
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/customer/customer-addr-edit/${address_id}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const responseResult = await response.data;
      // Success
      return { status: true, result: responseResult };
    } else {
      // Server-side error
      console.log("Server error:", response.status);
      const errorData = await response.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error };
  }
};

export const setDefaultAddressApi = async (user_id, data) => {
  console.log("====== this is set default address api ======\n", user_id, data);
  try {
    let config = {
      method: "PATCH",
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/customer/customer-addr-set-default`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    // const response = await axios.request(config);

    const response = await fetch(
      `${REACT_APP_API_SERVICE_URL}/api/v1/admin/customer/customer-addr-set-default`,
      config
    );

    if (response.status === 200) {
      const responseResult = await response.data;
      // Success
      return { status: true, result: responseResult };
    } else {
      // Server-side error
      console.log("Server error:", response.status);
      const errorData = await response.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error };
  }
};

export const getSingleCustomerAddressApi = async (user_id) => {
  console.log("====== selected customer id ======\n", user_id);
  try {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/v1/admin/customer/customer-addr-list?user_id=${user_id}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    // const response = await axios.request(config);
    const response = await fetch(
      `${REACT_APP_API_SERVICE_URL}/v1/admin/customer/customer-addr-list?user_id=${user_id}`,
      config
    );

    console.log("====== response ======\n", response);

    if (response.status === 200) {
      const responseResult = await response.data;
      // Success
      return { status: true, result: responseResult };
    } else {
      // Server-side error
      console.log("Server error:", response.status);
      const errorData = await response.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error };
  }
};

export const deleteCustomerAddressApi = async (address_id) => {
  try {
    let config = {
      method: "DELETE",
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_SERVICE_URL}/api/v1/admin/customer/customer-addr-delete/${address_id}`,
      headers: {
        "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
        token: window.sessionStorage.getItem("access-token"),
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const responseResult = await response.data;
      // Success
      return { status: true, result: responseResult };
    } else {
      // Server-side error
      console.log("Server error:", response.status);
      const errorData = await response.data;
      console.log("Server errorData ", errorData);
      return { status: false, error: errorData };
    }
  } catch (error) {
    // Network error
    console.log("Network error:", error);
    return { status: "error", error };
  }
};
