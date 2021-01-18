import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { duration } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService{

  darkMode: boolean = true;
 
  constructor(public toastController:ToastController, private storage:NativeStorage, private translate:TranslateService,public loadingController: LoadingController) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  async init(){
    let u=null;
    try{
      u= await this.storage.getItem('theme');
    }catch{
      u=null;
    }
    if(u!=null){
      this.darkMode=u;
      if(!u){
        document.body.classList.toggle('dark');
      }
    }
    return u;
    
  }

  traducction(){
    this.translate.setDefaultLang('en');
    
    try{
      //Selecciona el idioma del dispositivo
      this.translate.use(this.translate.getBrowserLang());
    }catch(err){
      //en caso de no ser ni español ni ingles, pone por defecto el ingles
      this.translate.use('en')
    }
  }

  traducctionphrase(n:string):string{
    return this.translate.instant(n);
  }

  changelang(){
    if(this.translate.currentLang=='es'){
      this.translate.use('en');
    }else{
      this.translate.use('es')
    }
  }

  async change() {

    this.darkMode = !this.darkMode;
    console.log(this.darkMode);
    document.body.classList.toggle('dark');

    
    await this.storage.setItem('theme',this.darkMode);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner: 'crescent',
      duration: 2000
    });
    await loading.present();
  }

  async presentToast(msg: string, col: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: 2000,
      position: "top",
    });
    toast.present();
  }

}
