const express = require('express')
const router = new express.Router()
const sgMail = require('@sendgrid/mail');
var request = require("request");

router.post('/sendEmail', async (req, res) => {
    try {
        const { to, from, subject, content } = req.body

        var options = { 
            method: 'POST',
            url: 'https://api.sendgrid.com/v3/mail/send',
            headers: 
            { 'content-type': 'application/json',
                "authorization": 'Bearer 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' 
            },
            body: { personalizations: 
            [ { to: [ { email: to} ],
               // dynamic_template_data: { verb: '', adjective: '', noun: '', currentDayofWeek: '' },
                subject: subject } ],
           from: { email: from },
           content: [
               {
                   type : "text/plain",
                   value : content
               }
           ],
         // template_id: 'd-8096b5dacb254c8b882816f22d1d11fe' 
        },
      json: true 
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.status(200).json({ status: 200, result: `Mail sent sucessfully` })
    })

    } catch (e) {
        res.status(500).json({ status: 500, error: e.toString() })
    }
})

module.exports = router
