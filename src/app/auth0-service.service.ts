import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';


@Injectable({
  providedIn: 'root'
})
export class Auth0ServiceService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  constructor() {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  auth0 = new auth0.WebAuth({
    clientID: 'THlcZ6pPcaaX4DkUF0qSRErkOQfZ1Xln',
    domain: 'rideforce.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200',
    scope: 'openid'
  });

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    console.log("handleAuthentication")
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    console.log("setSession")
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;

    //hit the back end

  }

  public renewSession(): void {
    console.log("renewSession")
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }
  public logout(): void {
    console.log("logout")
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Go back to the home route
    
  }

  public isAuthenticated(): boolean {
    
    console.log("isAuthenticated  ")
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }

}
