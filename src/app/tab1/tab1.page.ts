import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  public listaNotas = [];

  constructor(private vibration:Vibration, private plat:Platform,private notasS: NotasService, private modalController:ModalController, private nativeStorage:NativeStorage, private authS:AuthService, private router:Router, public alertController: AlertController) { }

  public async logout(){
    await this.authS.logout();
    if(!this.authS.isLogged()){
      this.router.navigate(['/login'])
    }
  }
  
  ngOnInit(){
    this.cargaDatos();
    this.nativeStorage.setItem('myitem', {property:'value', anotherProperty: 'anotherValue'}).then(
      ()=> console.log('Stored item!'),
      error=> console.error('Error storing item', error)
    );
  }

  ionViewDidEnter() {
    //Mostrar loading
    //this.cargaDatos();
  }

  public cargaDatos($event=null){
    try {
      /*
      this.notasS.leeNotas().subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
        //ya ha llegado al servidor
        this.listaNotas=[];
        info.forEach((doc)=>{
          let nota={
            id:doc.id,
            ...doc.data()
          }
          this.listaNotas.push(nota);
        });
        //Ocultar el loading
        console.log(this.listaNotas); 
        if($event){
          $event.target.complete();
        }
      })*/
      this.notasS.leeNotas().then((qs)=>{
        this.listaNotas=[];
        qs.forEach((d)=>{
          let nota={
            id:d.id,
            ...d.data()
          }
         this.listaNotas.push(nota);
         console.log(nota)
        })
        if($event){
          $event.target.complete();
        }
      })
    } catch (err) {
      //error
    }
  }

  async presentAlertDelete(id:any){
    if(this.plat.is('cordova')){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Borrar',
        message: '¿Seguro que desea eliminar esta nota?',
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
              this.borraNota(id);
            }
          }
        ]
      });
      await alert.present();
    }else{
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Borrar',
      message: '¿Seguro que desea eliminar esta nota?',
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
            this.borraNota(id);
          }
        }
      ]
    });
    await alert.present();
    }
    
  }

  public borraNota(id:any){
    if(this.plat.is('cordova')){
      this.notasS.borraNota(id).then(()=>{
        //borrado
        let tmp=[];
        this.listaNotas.forEach((nota)=>{
          if(nota.id!=id){
            tmp.push(nota);
          }
        })
        this.listaNotas=tmp;
      }).catch(err=>{
  
      });
      this.vibration.vibrate([500,500,500]);
    }else{
      this.notasS.borraNota(id).then(()=>{
        //borrado
        let tmp=[];
        this.listaNotas.forEach((nota)=>{
          if(nota.id!=id){
            tmp.push(nota);
          }
        })
        this.listaNotas=tmp;
      }).catch(err=>{
  
      });
      //this.vibration.vibrate([500,500,500]);
    }
    
  }

  
  public async editaNota(nota:Nota){
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        nota:nota
      }
    });
    this.vibration.vibrate(1000);
    return await modal.present();
  }
}
