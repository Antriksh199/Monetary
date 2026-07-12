

export const configuration = {
    awsCognitoSettings: {
        domain: '',
        userPoolId: 'GH_COGNITO_USER_POOL_ID',
        clientId: 'GH_COGNITO_CLIENT_ID',
        authority: 'GH_COGNITO_AUTHORITY',
        redirectUrl: 'https://monetary.antriksh.site/',
        logoutURL:'https://monetary.antriksh.site/',
        scope: ['openid', 'phone', 'email'],
        responseType: 'code',
    },
secretKey: 'Monetary'
};


