import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-top-menu-bar',
  templateUrl: './top-menu-bar.component.html',
  styleUrls: ['./top-menu-bar.component.scss'],
})
export class TopMenuBarComponent implements OnInit {
  isD3Route = false;
  isGoogleMapRoute = true;
  isCreateTopologyRoute: boolean = false;

  isSearchingByLatAndLng = true;
  isSearchingByDeviceName = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event?.url?.includes('createTopology')) {
          this.isCreateTopologyRoute = true;
        }

        if (event?.url?.includes('d3')) {
          this.isD3Route = true;
          this.isGoogleMapRoute = false;
          this.isSearchingByLatAndLng = true;
          this.isSearchingByDeviceName = false;
          return;
        }
        if (event?.url?.includes('google-map')) {
          this.isD3Route = false;
          this.isGoogleMapRoute = true;
        }
      }
    });
  }

  ngOnInit(): void {}

  onSearchByChange(event: any) {
    console.log(event.target.value, 'dsfsdf');
    if (event.target.value === 'deviceName') {
      this.isSearchingByDeviceName = true;
      this.isSearchingByLatAndLng = false;
      return;
    }
    if (event.target.value === 'latAndLng') {
      this.isSearchingByDeviceName = false;
      this.isSearchingByLatAndLng = true;
      return;
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    const latitude = event.target['latitude']?.value;
    const longitude = event.target['longitude']?.value;
    const deviceName = event.target['deviceName']?.value;

    if (this.isSearchingByDeviceName && deviceName) {
      this.router.navigate([], {
        queryParams: {
          deviceName: deviceName,
        },
      });
      return;
    }
    if (this.isSearchingByLatAndLng && latitude && longitude) {
      this.router.navigate([], {
        queryParams: {
          latitude,
          longitude,
        },
      });
    }
  }
}
