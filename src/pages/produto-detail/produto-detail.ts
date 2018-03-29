import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  produto: ProdutoDTO;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public produtoService:ProdutoService
            ) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.fidById(produto_id)
    .subscribe(response=>{
      this.produto = response;
      this.getImageUrlIfExists()
    },error=>{

    });
  }

  getImageUrlIfExists(){
    this.produtoService.getimageFromBucket(this.produto.id)
    .subscribe(response=>{
      this.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.produto.id}.jpg`
    },error=>{

    });
  }
}
