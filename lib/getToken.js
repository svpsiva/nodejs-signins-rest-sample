const Constants = require('../constants')
var request = require('request')

module.exports = (cb) => {
    request.post({
        url: Constants.apponly.aad.host + Constants.apponly.aad.tenantId + Constants.apponly.aad.tokenEndpoint,
        form: {
            client_id : Constants.apponly.application.id,
            scope : "https://graph.microsoft.com/.default",
            grant_type : "client_credentials",
            client_secret : Constants.apponly.application.secret,
            redirect_uri : Constants.apponly.application.callbackUrl
        }
    }, function (err, httpResponse, body) {
        var response = JSON.parse(body)
        if(err || !response || response.error) {
            console.error("Error fetching access token for your application. Make sure to update constants.js with your application's settings. ")
            return cb(err || response.error || 'Error', null)
        }

        return cb(null, response.access_token)
    })
}
