require("dotenv").config({path: "/Users/matheusjiran/Adhere/.env"})
const axios = require('axios');


const getAccessToken = async () => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9IHf89I1t8hpKfbuQe8j7Rxv8CQviINg3MIr03Ll5gM1YA4fI5uH7PzkndpqHnUnHSu6XePASZyF8rlyW&client_secret=B8EF526307FA1236B96950BFA60FF250AA6465B8D3DEB23B4BD63A54A8A8E066&username=matheus-bz-adhere@bluleadz.com&password=hpw!apy4qug0ZPW.cbe',
        headers: { 
          'Cookie': 'BrowserId=_L0hpZ3HEe6N20GWneITrQ; CookieConsentPolicy=0:0; LSKey-c$CookieConsentPolicy=0:0'
        }
    };
      
    const response = await axios.request(config);
    console.log(response.data);
    return response.data.access_token;
}

const getAccounts = async (access_token) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://adherehealth.my.salesforce.com/services/data/v59.0/query/?q=SELECT+Id,Name+FROM+Account',
        headers: { 
          'Authorization': `Bearer ${access_token}`, 
        //   'Cookie': 'BrowserId=_L0hpZ3HEe6N20GWneITrQ; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
        }
    };
    const response = await axios.request(config);
    console.log(response.data);
}

const main = async () => {
    const accounts = await getAccounts(await getAccessToken());
}

main();