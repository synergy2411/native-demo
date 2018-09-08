import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geofence } from '@ionic-native/geofence';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private geo: Geolocation,
    private camera: Camera,
    private geofence: Geofence,
    private alertCtrl : AlertController) {
    
  }


  addGeofence() {

    this.geofence.initialize().then(
      // resolved promise does not return a value
      () => {
        const alert = this.alertCtrl.create({
          message : 'Geofence Initializeed!'
        });
        alert.present();
      },
      (err) => {
        const alert = this.alertCtrl.create({
        message : 'Geofence Error!' + err
      })
      alert.present();
    })

    //options describing geofence
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude: 12.9842079, //center of geofence radius
      longitude: 80.2459844,
      radius: 5, //radius to edge of geofence in meters
      transitionType: 3, //see 'Transition Types' below
      notification: { //notification settings
        id: 1, //any unique ID
        title: 'You crossed a fence', //notification title
        text: 'You just arrived to Gliwice city center.', //notification body
        openAppOnClick: true //open app when notification is tapped
      }
    }

    this.geofence.addOrUpdate(fence).then(
      () => {
        const alert = this.alertCtrl.create({
          message : 'Geofence Added with Device'
        })
        alert.present();
      },
      (err) => {
        const alert = this.alertCtrl.create({
          message : 'Geofence failed to add'
        })
        alert.present();
      }
    );
  }


  openCamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
    }, (err) => {
      console.log("Error Occured.", err);
    });

  }

lat : any;
lng : any;
locationIsSet = false;

  getMyLocation() {
    this.geo.getCurrentPosition().then((position) => {
      const alert = this.alertCtrl.create({
        title : 'Getting Position',
        subTitle : 'Got Current Position',
        message : 'Lat : '+ position.coords.latitude + "Lang : " + position.coords.longitude,
        buttons : [{
          text : 'Ok'
        }]
      });
      alert.present();
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.locationIsSet = true;
      
    }, (error) => {
      console.log("Error Occured!", error);
    })

  }

}
