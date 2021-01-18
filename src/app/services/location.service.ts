import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { location } from '../model/location';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private myCollection:AngularFirestoreCollection<any>;

  constructor(private authS:AuthService,private fire:AngularFirestore) { 
    this.myCollection= fire.collection<any>(environment.locationCollection);
  }

  addLocation(newLocation:location):Promise<any>{
    return this.myCollection.add(newLocation);
  }

  readLocations():Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
    return this.myCollection.ref.where('email','==',this.authS.user.email).get();
  }

  readLocation(id:any):Observable<any>{
    return this.myCollection.doc(id).get();
  }

  //la localizacion no se puede actualizar

  deleteLocation(id:any):Promise<void>{
    return this.myCollection.doc(id).delete();
  }
}
