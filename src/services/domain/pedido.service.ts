import { PedidoDTO } from './../../models/pedido.dto';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PedidoService{

    constructor(public http:HttpClient){

    }

    insert(obj:PedidoDTO){
      return this.http.post(
        `${API_CONFIG.baseUrl}/pedidos`,
        obj,
        {
          observe:'response',
          responseType:'text'
        }
      )
    }



}