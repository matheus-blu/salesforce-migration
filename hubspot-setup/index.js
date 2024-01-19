const axios = require('axios');
const { json } = require('express');
const fs = require('fs');
require("dotenv").config({path: "/Users/matheusjiran/Adhere/.env"});
const logger = require("/Users/matheusjiran/Adhere/models/winston.js")


const createBatchProperties = async (inputs, object) => {
    const config = { 
        method: 'post',
        url: `https://api.hubapi.com/crm/v3/properties/${object}/batch/create`,
        headers: {
            authorization: `Bearer ${process.env.HS_TEST_KEY}`,
            "content-type": "application/json"
        },
        data: {inputs}
    }
    console.log(config.data);
    const response = await axios.request(config);
    console.log(response.data);
};

const createProperty = async (input, object) => {
    const config = { 
        method: 'post',
        url: `https://api.hubapi.com/crm/v3/properties/${object}`,
        headers: {
            authorization: `Bearer ${process.env.ADHERE_HS_ACCOUNT}`,
            "content-type": "application/json"
        },
        data: input
    }
    console.log("Creating property: "+input.name)
    try {
        const response = await axios.request(config);
        console.log("Created!");
        logger.createSuccessLog.info(`${input.name} | ${input.label}`)
    } catch (e) {
        console.error("Error creating property: "+e.message+"\n"+e.data)
        logger.createErrorLog.error(`${input.name} | ${input.label} | Error ${e.message}`)
    }
};

const updateProperties = async (input, object) => {
    const config = { 
        method: 'patch',
        url: `https://api.hubapi.com/crm/v3/properties/${object}/${input.name}?archived=false`,
        headers: {
            authorization: `Bearer ${process.env.ADHERE_HS_ACCOUNT}`,
            "content-type": "application/json"
        },
        data: input
    }
    console.log(config.data);
    try {
        const response = await axios.request(config);
        console.log(response.data);
        logger.updateSuccessLog.info(`${input.name} | ${input.label}`)
    } catch (e) {
        console.error("Error updating property: "+e.message+"\n")
        logger.updateErrorLog.error(`${input.name} | ${input.label} | Error ${e.message}`)
    }
};

const deleteProperties = async (input, object) => {
    const config = { 
        method: 'delete',
        url: `https://api.hubapi.com/crm/v3/properties/${object}/${input.name}`,
        headers: {
            authorization: `Bearer ${process.env.ADHERE_HS_ACCOUNT}`,
        },
    }
    console.log(config.data);
    try {
        const response = await axios.request(config);
        console.log(response.data);
        logger.deleteSuccessLog.info(`${input.name} | ${input.label}`)
    } catch (e) {
        console.error("Error updating property: "+e.message+"\n")
        logger.deleteErrorLog.error(`${input.name} | ${input.label} | Error ${e.message}`)
    }
};

const readProperties = async (object_type) => {
    const url = `https://api.hubapi.com/crm/v3/properties/${object_type}?archived=false`;
    let config = {
        headers: {
            "authorization": `Bearer ${process.env.HS_TEST_ACC_KEY}`
        }
    }
    const response = await axios.get(url, config);
    let properties = [];
    for (const prop of response.data.results) {
        if (prop.groupName === "insightly" && prop.fieldType !== "phonenumber") {
            properties.push(prop);
        }
    }
    console.log(properties);
    fs.writeFileSync('deal_properties.json', JSON.stringify(properties));
    return properties;
}

const main = async () => {
    // CREATES PROPERTIES, ONE BY ONE, LOGGING RESULTS
    // const create_properties = JSON.parse(fs.readFileSync("/Users/matheusjiran/Adhere/data-analysis/account/update_account_fields_inputs.json"));
    // for (const property of create_properties) {
    //     // console.log(property)
    //     await createProperty(property, "companies")
    // }

    // UPDATES PROPERTIES, ONE BY ONE, LOGGING RESULTS
    const update_properties = JSON.parse(fs.readFileSync("/Users/matheusjiran/Adhere/data-analysis/account/update_account_fields_inputs.json"));
    for (const property of update_properties) {
        // console.log(property)
        await updateProperties(property, "companies")
    }

    // DELETE PROPERTIES, ONE BY ONE, LOGGING RESULTS
    // const update_properties = JSON.parse(fs.readFileSync("/Users/matheusjiran/Adhere/data-analysis/account/update_account_fields_inputs.json"));
    // for (const property of update_properties) {
    //     // console.log(property)
    //     await deleteProperties(property, "companies")
    // }
}

main();