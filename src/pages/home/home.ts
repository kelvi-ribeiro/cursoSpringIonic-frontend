import { Component } from '@angular/core';
import { IonicPage,NavController, MenuController } from 'ionic-angular';
import { CreadenciaisDTO } from '../../models/credenciaisdto';
import { AuthService } from '../../services/auth.service';

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
    public menuCtrl:MenuController,
    public auth:AuthService) {

  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response=>{
      this.auth.sucessfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');

    },
    error=>{});

  }

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menuCtrl.swipeEnable(true);
  }

}
