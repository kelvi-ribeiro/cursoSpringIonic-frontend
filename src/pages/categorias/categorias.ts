import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  categorias:CategoriaDTO[];

  bucketUrl:String = API_CONFIG.bucketBaseUrl;


  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public categoriaService:CategoriaService
              ) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response=>{
      this.categorias = response;

    },
  error=>{});

  }

  showProdutos(categoria_id:string){
    console.log('see',categoria_id);

    this.navCtrl.push('ProdutosPage',{categoria_id:categoria_id});
  }



}
