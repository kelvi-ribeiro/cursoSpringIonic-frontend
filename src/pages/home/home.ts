import { Component } from '@angular/core';
import { IonicPage,NavController, MenuController } from 'ionic-angular';
import { CreadenciaisDTO } from '../../models/credenciaisdto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds:CreadenciaisDTO = {
    email:"",
    senha:""
  };

  constructor(
    public navCtrl: NavController,
    public menuCtrl:MenuController) {

  }

  login(){
    console.log(this.creds);

    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menuCtrl.swipeEnable(true);
  }

}
