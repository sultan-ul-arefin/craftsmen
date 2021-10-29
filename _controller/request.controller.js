const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
const config = require("../config.json")
const decode_base64 = require("../_service/decode.js")

// routes
router.get('/', firstStep);

module.exports = router;

function firstStep(req, res, next) {
    const configarationOne = {
        headers: {
            'Content-Type': config.type,
            'x-api-key': config.apiKey,
        }
    };
    const body = {
        "email": config.myEmail
    }
    axios.post(`${config.endPoint}`, body, configarationOne)
        .then((response) => {
            console.info(response)
            if (response.statusCode == 200) {
                const configarationTwo = {
                    headers: {
                        'Content-Type': config.type,
                        'x-api-key': config.apiKey,
                        'accesstoken': response.accessToken
                    }
                };
                axios.get(`${response.instructions.urlObject.protcol}://${response.instructions.urlObject.domain}/${response.instructions.urlObject.path}/${response.instructions.urlObject.resource}?email=${config.myEmail}`, configarationTwo)
                    .then((res) => {
                        console.info(res)
                        if (res.statusCode == 200) {


                            let newArray = JSON.parse(res.urlObject);
                            let last = '';
                            let string = '';
                            newArray.forEach(element => {

                                if (element.length != 50) {
                                    last = element
                                }
                                else {
                                    string += element
                                }
                                string + last


                            });
                            res.json({ message: decode_base64(string) })
                                .catch(next);

                        }
                    })
            }
        });


}
