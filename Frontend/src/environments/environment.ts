

export const configuration = {
    awsCognitoSettings: {
        domain: '',
        userPoolId: 'COGNITO_USER_POOL_ID',
        clientId: 'COGNITO_CLIENT_ID',
        authority: 'COGNITO_AUTHORITY',
        redirectUrl: 'https://monetary.antriksh.site/',
        logoutURL:'https://monetary.antriksh.site/',
        scope: ['openid', 'phone', 'email'],
        responseType: 'code',
    },
secretKey: 'Monetary'
};


