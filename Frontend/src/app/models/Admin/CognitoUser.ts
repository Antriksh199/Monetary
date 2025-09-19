/**
 * @fileoverview This file defines a TypeScript class to model user data
 * returned from an AWS Cognito ID token.
 */

/**
 * Represents a user object with attributes and claims from a
 * decoded AWS Cognito ID token.
 */
export class CognitoUser {
    /**
     * Access Token Hash.
     */
    public at_hash: string;
  
    /**
     * The unique identifier for the user. Maps to the 'sub' claim.
     */
    public sub: string;
  
    /**
     * The status of the user's email verification.
     */
    public email_verified: boolean;
  
    /**
     * The URL of the token issuer.
     */
    public iss: string;
  
    /**
     * The username in the Cognito user pool.
     */
    public cognitoUsername: string;
  
    /**
     * The user's email address.
     */
    public email: string;
  
    /**
     * The user's given name or first name.
     */
    public given_name: string;
  
    /**
     * The unique identifier for the token's origin.
     */
    public origin_jti: string;
  
    /**
     * The audience for the token.
     */
    public aud: string;
  
    /**
     * The purpose of the token (e.g., "id").
     */
    public token_use: string;
  
    /**
     * The authentication time in Unix seconds.
     */
    public auth_time: number;
  
    /**
     * The token's expiration time in Unix seconds.
     */
    public exp: number;
  
    /**
     * The user's family name or last name.
     */
    public family_name: string;
  
    /**
     * The token's issued-at time in Unix seconds.
     */
    public iat: number;
  
    /**
     * The JWT ID for the token.
     */
    public jti: string;
  
    /**
     * Creates an instance of CognitoUser from a decoded token object.
     * @param data The raw data object from the Cognito ID token.
     */
    constructor(data: any) {
      this.at_hash = data.at_hash;
      this.sub = data.sub;
      this.email_verified = data.email_verified;
      this.iss = data.iss;
      this.cognitoUsername = data['cognito:username'];
      this.email = data.email;
      this.given_name = data.given_name;
      this.origin_jti = data.origin_jti;
      this.aud = data.aud;
      this.token_use = data.token_use;
      this.auth_time = data.auth_time;
      this.exp = data.exp;
      this.family_name = data.family_name;
      this.iat = data.iat;
      this.jti = data.jti;
    }
  }
  