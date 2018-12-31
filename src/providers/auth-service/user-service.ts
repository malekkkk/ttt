import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class UserProviders {

  static readonly GETALLUSER_URL = 'https://192.168.1.3:8443/users';
  constructor(public http: Http) { }
  
}
