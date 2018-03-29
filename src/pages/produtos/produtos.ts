import { ProdutoService } from './../../services/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  produtos : ProdutoDTO[];

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public produtoService:ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');

    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response=>{
      this.produtos = response['content'];
      this.loadImageUrls();
    },error=>{

    });

  }

  loadImageUrls(){
    this.produtos.forEach(produto=>{
    this.produtoService.getSmallImageFromBucket(produto.id)
    .subscribe(response=>{
      produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${produto.id}-small.jpg`

    });
    },error=>{

    });
  }

  showDetails(produto_id){
    this.navCtrl.push('ProdutoDetailPage',{produto_id:produto_id});
  }

}
