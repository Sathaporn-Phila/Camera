import { Component, OnInit } from '@angular/core';
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'camera';

  public picture: any;

  public constructor() {
    this.picture = "https://placehold.it/200x200";
  }
  ngOnInit(){
    if (isAvailable()) {
      requestCameraPermissions()
        .then(
          fulfilled => {
            console.log('requestCameraPermissions fulfilled.');
          },
          rejected => {
            console.log('No camera permissions set.');
          }
        )
    } else {
      console.log('No camera detected of available.');
    }
  }

  capture(): void {
    var options = { width: 300, height: 300, keepAspectRatio: true, saveToGallery: false };

    takePicture(options)
      .then(imageAsset => {
        this.picture = imageAsset;
      }).catch(function (err) {
        console.log("Error -> " + err.message);
      });
  }
}
