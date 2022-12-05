import { Component, OnInit } from '@angular/core';

import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss'],
})
export class SideNavBarComponent implements OnInit {
  isD3Route: boolean = false;
  isGoogleMapRoute: boolean = true;
  isCreateTopologyRoute: boolean = false;

  isSearchingByLatAndLng: boolean = true;
  isSearchingByDeviceName: boolean = false;

  isSideBarOpen: boolean = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event?.url?.includes('createTopology')) {
          this.isCreateTopologyRoute = true;
          this.isGoogleMapRoute = false;
          this.isD3Route = false;
        }

        if (event?.url?.includes('d3')) {
          this.isD3Route = true;
          this.isGoogleMapRoute = false;
          this.isSearchingByLatAndLng = true;
          this.isSearchingByDeviceName = false;
          this.isCreateTopologyRoute = false;
          return;
        }
        if (event?.url?.includes('google-map')) {
          this.isD3Route = false;
          this.isGoogleMapRoute = true;
          this.isCreateTopologyRoute = false;
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

  handleSidebarToggle() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

  onSearch(event: any) {
    console.log(event.target, 'dsfsdf');
    event.preventDefault();
    const value = event.target?.['location']?.value || '';
    if (!value) return;
    if (value.includes(',')) {
      const values = value.split(',');
      const [latitude, longitude] = values.map((val: any) => Number(val));
      console.log(latitude, longitude);
      if (!isNaN(latitude) && !isNaN(longitude) && values.length === 2) {
        if (
          latitude > 90 ||
          latitude < -90 ||
          longitude < -180 ||
          longitude > 180
        ) {
          alert('Invalid Range for latitudes or longitudes');
          return;
        }

        this.router.navigate([], {
          queryParams: {
            latitude,
            longitude,
          },
        });
      } else {
        this.router.navigate([], {
          queryParams: {
            deviceName: value,
          },
        });
      }
    } else {
      this.router.navigate([], {
        queryParams: {
          deviceName: value,
        },
      });
    }
  }
}
