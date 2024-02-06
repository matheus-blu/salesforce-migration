

const getEmailMessage = async (id, auth_token) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://adherehealth.my.salesforce.com/services/data/v59.0/sobjects/EmailMessage/${id}`,
        headers: { 
          'Authorization': `Bearer ${auth_token}`, 
          'Cookie': 'BrowserId=_L0hpZ3HEe6N20GWneITrQ; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
        }
    };
    const response = await axios.request(config);
    return response.data;
}

const getEvent = async (id, auth_token) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://adherehealth.my.salesforce.com/services/data/v59.0/sobjects/Event/${id}`,
        headers: { 
          'Authorization': `Bearer ${auth_token}`, 
          'Cookie': 'BrowserId=_L0hpZ3HEe6N20GWneITrQ; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
        }
    };
    const response = await axios.request(config);
    return response.data;
}