import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  public user=null;

  constructor(private google:GooglePlus, private authS:AuthService, private router:Router,private storage:NativeStorage, public alertController: AlertController) {}

  ngOnInit(){
    this.user={
      token: this.authS.user.token,
      name: this.authS.user.name,
      avatar: this.authS.user.avatar
    };
    console.log("AAAAAAAAAAAA"+this.user);
  }

  ionViewDidEnter(){
    this.user={
      token: this.authS.user.token,
      name: this.authS.user.name,
      avatar: this.authS.user.avatar
    };
  }

  async presentAlertOut(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar Sesión',
      message: '¿Seguro que desea cerrar sesión?',
      buttons:[
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Salir',
          handler: () => {
            console.log('Confirm Okay');
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }

  public async logout(){
    let u=await this.authS.logout();
    this.router.navigate(['/login']);
  }

}
