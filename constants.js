module.exports = {
    outputFile: 'out.json',
    apponly : {    
        aad : {
            host : "https://login.microsoftonline.com/",
            tenantId: "ENTER_YOUR_TENANT_ID",
            tokenEndpoint : "/oauth2/v2.0/token"
        },
        application : {
            id : "ENTER_YOUR_CLIENT_ID",
            secret : "ENTER_YOUR_SECRET",
            callbackUrl : "http://localhost:3000/auth/callback"
        }
    }
}