import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

 
  static readonly LOGIN_URL = 'https://ziedmalek.localtunnel.me/auth';
  
  static readonly REGISTER_URL = 'https://ziedmalek.localtunnel.me/users';

  static readonly GETALLUSER_URL = 'https://ziedmalek.localtunnel.me/users';

  static readonly CREATERES_URL = 'https://ziedmalek.localtunnel.me/reservs';

  static readonly GETTALLRES = 'https://ziedmalek.localtunnel.me/getreservs';

  static readonly CHANGEPUMPUSTATE = 'https://ziedmalek.localtunnel.me/changePumpeState';
  
  static readonly EDITRES = 'https://ziedmalek.localtunnel.me/EditReservoir/';

  static readonly DELETERES = 'https://ziedmalek.localtunnel.me/DeleteReservoir/'
  access: boolean;
  token: string;

  constructor(public http: Http) {}

  // Login
  public login(credentials) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post( AuthServiceProvider.LOGIN_URL, JSON.stringify(credentials), { headers: headers }).
          subscribe(res => {
            resolve(res.json());
          }, (err) => {
            if (err.statusText == "Unauthorized") {
              resolve(err);
            }
            else {
              reject(err);
            }
          });

      });
  }

  // Register
  public register(credentials) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(AuthServiceProvider.REGISTER_URL, JSON.stringify(credentials), { headers: headers }).
          subscribe(res => {
            resolve(res.json());
          }, (err) => {
            if (err.statusText == "Unauthorized") {
              resolve(err);
            }
            else {
              reject(err);
            }
          });
      });
  }

  //Get All users

  public GetAllUsers() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + localStorage.getItem("userToken"));
      this.http.get(AuthServiceProvider.GETALLUSER_URL, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          if (err.statusText == "Unauthorized") {
            resolve(err);
          }
          else {
            reject(err);
          }
        });

    });
  }

  //Create Res 

  public CreateRes(ResWithUsers: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + localStorage.getItem("userToken"));
      this.http.post(AuthServiceProvider.CREATERES_URL, JSON.stringify(ResWithUsers), { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          if (err.statusText == "Unauthorized") {
            resolve(err);
          }
          else {
            reject(err);
          }
        });

    });
  }

  // Get Reservoirs 
  public GetAllRes() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + localStorage.getItem("userToken"));
      this.http.get(AuthServiceProvider.GETTALLRES, { headers: headers }).
        subscribe(res => {
          console.log("i am here");
          resolve(res.json());
         
        }, (err) => {
          if (err.statusText == "Unauthorized") {
            resolve(err);
          }
          else {
            reject(err);
          }
        });

    });
  }

  // change pumpe state
  public ChangePumpeState(ResWithPumpeState: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + localStorage.getItem("userToken"));
      this.http.post(AuthServiceProvider.CHANGEPUMPUSTATE, JSON.stringify(ResWithPumpeState), { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          if (err.statusText == "Unauthorized") {
            resolve(err);
          }
          else {
            reject(err);
          }
        });

    });
  }

  // Edit reservoir 
  public EditReservoir(ResWithUsers: any, id: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + localStorage.getItem("userToken"));
      this.http.post(AuthServiceProvider.EDITRES + id, JSON.stringify(ResWithUsers), { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          if (err.statusText == "Unauthorized") {
            resolve(err);
          }
          else {
            reject(err);
          }
        });

    });
  }

  // Delete reservoir
  public DeleteReservoir(id: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + localStorage.getItem("userToken"));
      this.http.get(AuthServiceProvider.DELETERES + id, { headers: headers }).
        subscribe(res => {
          console.log("i am here");
          resolve(res.json());

        }, (err) => {
          if (err.statusText == "Unauthorized") {
            resolve(err);
          }
          else {
            reject(err);
          }
        });

    });
  }
  // Get Token
  public getToken() {
    return this.token;
  }

  // Logout
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
  get isAdmin() {
    return Number(localStorage.getItem("permission")) > 2;
  }
}
