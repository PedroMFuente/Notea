import { Component, Input, OnInit } from '@angular/core';
import { location } from 'src/app/model/location';
import { Map, tileLayer, marker } from "leaflet";

@Component({
  selector: 'app-openlocation',
  templateUrl: './openlocation.page.html',
  styleUrls: ['./openlocation.page.scss'],
})
export class OpenlocationPage{

  @Input('location') location:location;
  map:Map;

  constructor() { }

  ionViewDidEnter(){
    this.initMap();
  }

  public initMap(){
    this.map = new Map('map').setView([this.location.position.latitude,this.location.position.longitude],21);
    //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    //ssets/map/{z}/{x}/{y}.png
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    }).addTo(this.map);

    marker([this.location.position.latitude,this.location.position.longitude],{draggable:false}).addTo(this.map);
  }
}
