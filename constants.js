module.exports = {
    outputFile: 'out.json',
    apponly : {    
        aad : {
            host : "https://login.microsoftonline.com/",
            tenantId: "8312f407-43a4-460c-a612-e2ec5b679c66",
            tokenEndpoint : "/oauth2/v2.0/token"
        },
        application : {
            id : "6786a669-effe-48ee-9b16-ef63fb5a24f7",
            secret : "-:M2Bt:dQZ@ymF6GuPivuZniP4fAhhE6",
            callbackUrl : "http://localhost:3000/auth/callback"
        }
    }
}