
class TokenHelper {

  getHeader() {
    return {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.getToken(),
      }
    }
  }


  getToken() {
    return localStorage.getItem('token');
  }



}

export default new TokenHelper();