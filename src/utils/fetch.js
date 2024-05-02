const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;



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
                    return true;
            
                    } else {
                        const error = new Error();
                   // error.message = healthAppLoginResponseResult.message || 'Something went wrong.';
                    }
                
        };