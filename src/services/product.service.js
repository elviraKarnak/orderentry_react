import axios from 'axios';
import TokenHelper from './TokenHelper';
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class ProductService {

    productSearch(payload) {
        return axios.get(REACT_APP_API_SERVICE_URL + `/product-search?product_name=${payload.product_name}&delivary_date=${payload.delivary_date}&limit=${payload.limit}&page_no=${payload.page_no}`,TokenHelper.getHeader());

    }
 


}


// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();
