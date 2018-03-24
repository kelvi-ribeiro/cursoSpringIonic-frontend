import { StorageService } from './../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteDTO } from '../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../config/api.config';
@Injectable()
export class ClienteService{
    constructor(public http:HttpClient,
               public storageService:StorageService){

    }
    findByEmail(email:string):Observable<ClienteDTO>{
      let token = this.storageService.getLocalUser().token;
      let authHeader:HttpHeaders = new HttpHeaders({'Authorization':'Bearer ' + token});

      return this.http.get<ClienteDTO>(
        `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
          {'headers':authHeader});

    }

    getImageFromBucket(id:string):Observable<any>{
      let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
      return this.http.get(url,{responseType:'blob'});
    }
}
