import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nota } from '../model/nota';
import { location } from '../model/location' ;
import { AuthService } from '../services/auth.service';
import { NotasService } from '../services/notas.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../services/location.service';
import * as moment from 'moment';
import { UtilitiesService } from '../services/utilities.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks:FormGroup;
  public locations:FormGroup;
  private options: GeolocationOptions;
  private currentpos: Geoposition;
  private latitude: number;
  private longitude: number;

  constructor(private alertController:AlertController,private utilities:UtilitiesService,private geolocation:Geolocation, private authS:AuthService, private vibration:Vibration,private formBuilder:FormBuilder, private locationSer:LocationService,private notasS:NotasService) {
    this.tasks=this.formBuilder.group({
      title:['',Validators.required],
      description:['']
    });
    this.locations=this.formBuilder.group({
      //localizacion y fecha
      position:[this.geolocation.getCurrentPosition(this.options).then((pos:Geoposition)=>{
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
      })],
      date:[''],
      titulo:['',Validators.required],
    });
  }

  
  public async sendLocation(){
    try{
      await this.utilities.presentLoading();

      let data:location={
        position:{latitude:this.latitude,longitude:this.longitude},
        date:moment().format("DD-MM-YYYY  HH:mm:ss"),
        email:this.authS.user.email,
        titulo:this.locations.get('titulo').value
      }
  
      this.locationSer.addLocation(data).then((respuesta)=>{
        this.locations.setValue({
          position:{
            latitude:'',
            longitude:''
          },
          date:'',
          titulo:'',
        })
        this.utilities.loadingController.dismiss();
        this.utilities.presentToast(this.utilities.traducctionphrase('SAVELOC'),"success");
      }).catch((err)=>{
        this.utilities.loadingController.dismiss();
        this.utilities.presentToast(this.utilities.traducctionphrase('ERRORSLOC'),"danger");
        console.log(err);
      })
    }catch(err){
      console.log(err);
      //Si no está conectado la ubicacion
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "GPS",
        message: this.utilities.traducctionphrase('ERRORGPS'),
        buttons:[
          {
            text: "OK",
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present()
    }
    
  }

  public async sendForm(){
    await this.utilities.presentLoading();
    let data:Nota={
      titulo:this.tasks.get('title').value,
      texto:this.tasks.get('description').value,
      email:this.authS.user.email
    } 
    this.notasS.agregaNota(data).then((respuesta)=>{
      this.tasks.setValue({
        title:'',
        description:'',
      })
      this.utilities.loadingController.dismiss();
      this.utilities.presentToast(this.utilities.traducctionphrase('SAVENOTE'),"success");
    }).catch((err)=>{
      this.utilities.loadingController.dismiss();
      this.utilities.presentToast(this.utilities.traducctionphrase('ERRORSN'),"danger");
      console.log(err);
    });
  }
}
