const Constants = require('./constants.js');
var request = require('request');
var fs = require('fs');
const getToken = require('./lib/getToken.js');

var logCount = 0;

var fetchLogs = (token, url, cb) => {
    console.log("Downloading from :" + url);

    request.get(url, {
        'auth': {
            'user': null,
            'pass': null,
            'sendImmediately': true,
            'bearer': token
        }
    }, function (err, httpResponse, body) {
        var response = JSON.parse(body);
        if (err || !response || response.error) {
            return cb(err || response.error || 'Error')
        }

        var nextLink = response['@odata.nextLink']
        var values = response.value;
        if (values)
            writeLogsToFile(values);

        if (!nextLink) {
            console.log("Download complete. Saved " + logCount + " logs to " + Constants.outputFile);
            return cb();
        } else
            fetchLogs(token, nextLink, cb)
    }
    );
}

var initFile = () => fs.writeFileSync(Constants.outputFile, '[');
var writeLogsToFile = (values) => {
    for (var i = 0; i < values.length; i++) {
        fs.appendFileSync(Constants.outputFile, JSON.stringify(values[i]) + ',\r\n')
    }
    logCount += values.length
};
var closeFile = () => fs.appendFileSync(Constants.outputFile, '{}\r\n]');

getToken((err, token) => {
    if (err)
        process.exit(1);

    console.log('Retreived token');

    var nextLink = 'https://graph.microsoft.com/v1.0/auditLogs/signIns'
    initFile();
    fetchLogs(token, nextLink, function (err) {
        closeFile();
        if (err) {
            console.error(err);
        }
    })
});


