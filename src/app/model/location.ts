import { Geoposition } from '@ionic-native/geolocation/ngx';
import { AngularDelegate } from '@ionic/angular';

export interface location{
    id?:any,
    position?:{
        latitude:any,
        longitude:any
    },
    titulo:any,
    email?:any,
    date?:any
}