import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sterlite';

  isGoogleView! : boolean;
  isCloudView!  : boolean;
  locationUrl!  : string;

  contextMenu : any;
  shareMenu   : any;

  constructor(private router: Router) {}

  ngOnInit(): void {  
    this.isGoogleView  = true;
    this.isCloudView   = false;

    this.locationUrl = document.location.href; 
    this.urlLocation();
  }

  urlLocation() {
    if (this.locationUrl.includes('d3')) {
      this.isGoogleView = false;
      this.isCloudView  = true;
    }
    else if (this.locationUrl.includes('google-map')) {
      this.isGoogleView = true;
      this.isCloudView  = false;
    }
  }

  googleViewClick() {
    this.isGoogleView = true;
    this.isCloudView = false;
  }

  cloudViewClick() {
    this.isGoogleView = false;
    this.isCloudView = true;
  }
}
