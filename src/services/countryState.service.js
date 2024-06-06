import axios from 'axios';
import TokenHelper from './TokenHelper';
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class countryStateService {

    getAllCountry() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/country', TokenHelper.getHeader());

    }

    getStateBycountryId(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/state/' + id, TokenHelper.getHeader());

    }


}


// eslint-disable-next-line import/no-anonymous-default-export
export default new countryStateService();
