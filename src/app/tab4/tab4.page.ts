import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { location } from '../model/location';
import { OpenlocationPage } from '../pages/openlocation/openlocation.page';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public listalocations = [];

  constructor(private vibration: Vibration, private plat: Platform, private locationS: LocationService, private modalController: ModalController, private nativeStorage: NativeStorage, private authS: AuthService, private router: Router, public alertController: AlertController) { }


  ngOnInit() {
    this.cargaDatos();
    this.nativeStorage.setItem('myitem', { property: 'value', anotherProperty: 'anotherValue' }).then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }

  ionViewDidEnter() {
    //Mostrar loading
    this.cargaDatos();
  }

  public async openMap(location:location){
    //al pulsar en una localización abrirá google maps en esa localizacion
    const modal = await this.modalController.create({
      component: OpenlocationPage,
      cssClass: 'my-custom-class',
      componentProps:{
        location:location
      }
    });
    return await modal.present();
  }

  public cargaDatos($event = null) {
    try {
      this.locationS.readLocations().then((qs) => {
        this.listalocations = [];
        qs.forEach((d) => {
          let location = {
            id: d.id,
            ...d.data()
          }
          this.listalocations.push(location)
          //console.log(location)
        })
        if ($event) {
          $event.target.complete();
        }
      })
    } catch (error) {
      //error
    }
  }

  public deleteLoc(id:any){
    if(this.plat.is('cordova')){
      this.locationS.deleteLocation(id).then(()=>{
        //borrado
        let tmp=[];
        this.listalocations.forEach((loc)=>{
          if(loc.id!=id){
            tmp.push(loc);
          }
        })
        this.listalocations=tmp;
      }).catch(err=>{
  
      });
      this.vibration.vibrate([500,500,500]);
    }else{
      this.locationS.deleteLocation(id).then(()=>{
        //borrado
        let tmp=[];
        this.listalocations.forEach((loc)=>{
          if(loc.id!=id){
            tmp.push(loc);
          }
        })
        this.listalocations=tmp;
      }).catch(err=>{
  
      });
      //this.vibration.vibrate([500,500,500]);
    }
  }

  async presentAlertDelete(id:any){
    if(this.plat.is('cordova')){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Borrar',
        message: '¿Seguro que desea eliminar esta localizacion?',
        buttons:[
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Borrar',
            handler: () => {
              console.log('Confirm Okay');
              this.deleteLoc(id);
            }
          }
        ]
      });
      await alert.present();
    }else{
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Borrar',
      message: '¿Seguro que desea eliminar esta localizacion?',
      buttons:[
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Borrar',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteLoc(id);
          }
        }
      ]
    });
    await alert.present();
    }
    
  }


}
