const authParams ={
    clientId: "???",
    clientSecret: "???",
    scope: "profile email",
    responseType: "code",
    approvalPrompt: "force",
    accessType: "offline",
    redirectUri: "http://localhost:3000/auth_code",
    grantType: "authorization_code"   
}

const data = require(client_secret.json);

authParams.clientId = data.client_id;