export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    console.log('not a porno');
    if (user && user.access_token) {
        console.log('213');
        return new Headers({ 'Authorization': 'Bearer ' + user.access_token,
                // 'Accept': 'application/json',
                // 'Access-Control-Allow-Credentials': true,
                // 'Access-Control-Allow-Methods':'GET',
                // 'Access-Control-Allow-Headers': 'X-PINGARUNER',
                // 'Access-Control-Request-Method': 'GET',
                'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/json' 
        });
    } else {
        return {};
    }
}