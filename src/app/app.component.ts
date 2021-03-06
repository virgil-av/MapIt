import { Component } from '@angular/core';
import {MarkerService} from "./services/marker.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //zoom level
  zoom: number = 10;
   //start position
  lat: number = 42.858217;
  lng: number = -70.929990;

  //Values
  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: string;

  // Markers
  markers: marker[] = [];

  constructor(private markerService: MarkerService){

    this.markers = this.markerService.getMarkers()
  }

  clickedMarker(marker: marker, index: number){
    console.log('Clicked Marker' + marker.name + 'at index' + index)
  }

  mapClicked($event: any){
    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }

    this.markers.push(newMarker);

  }

  markerDragEnd(marker: any, $event:any){
    console.log('dragEnd',marker,$event)
    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;

    this.markerService.updateMarker(updMarker, newLat, newLng)
  }

  addMarker(){
    if(this.markerDraggable == 'yes'){
      var isDraggable = true;
    }else{
      var isDraggable = false;
    }

    var newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }

    this.markers.push(newMarker);

    this.markerService.addMarker(newMarker);

  }


  removeMarker(marker){
    for(let i = 0; i < this.markers.length; i++){
      if(marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers.splice(i, 1)
      }
    }

    this.markerService.removeMarker(marker)
  }


}

//Marker Type
interface marker {
  name?: string;
  lat: number
  lng: number;
  draggable: boolean;
}

