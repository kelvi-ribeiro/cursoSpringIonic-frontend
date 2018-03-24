import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreadenciaisDTO } from '../models/credenciaisdto';
import { StorageService } from './storage.service';
@Injectable()
export class AuthService{

    constructor(
                public http:HttpClient,
                public storageService:StorageService
                ){

    }
  authenticate(creds:CreadenciaisDTO){
   return  this.http.post(`${API_CONFIG.baseUrl}/login`,
                      creds,
                    {
                      observe:'response',
                      responseType:'text'
                    });
  }
  sucessfulLogin(authorizationValue:string){

    let token = authorizationValue.substring(7);
    let user:LocalUser = {
      token:token
    };
    this.storageService.setLocalUser(user);
  }

  logout(){
    this.storageService.setLocalUser(null)
  }
}
