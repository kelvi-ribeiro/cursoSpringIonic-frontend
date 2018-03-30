import { ProdutoService } from './../../services/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
              public produtoService:ProdutoService,
              public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }
  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response=>{
      this.produtos = response['content'];
      loader.dismiss();
      this.loadImageUrls();
    },error=>{
      loader.dismiss();

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

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content:"Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher){
    setTimeout(()=>{
      this.loadData();
      refresher.complete();
    },1500);
  }

}
