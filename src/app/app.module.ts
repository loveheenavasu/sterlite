import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { D3ChartsComponent } from './Components/d3-charts/d3-charts.component';
import { CommonModelComponent } from './Components/common-model/common-model.component';
import { WithCloudComponent } from './Components/with-cloud/with-cloud.component';
import { WithOutCloudComponent } from './Components/with-out-cloud/with-out-cloud.component';
import { NeighboursModelComponent } from './Components/neighbours-model/neighbours-model.component';
import { GoogleMapsComponent } from './Components/google-maps/google-maps.component';
import { TopMenuBarComponent } from './Components/top-menu-bar/top-menu-bar.component';
import { SideNavBarComponent } from './Components/side-nav-bar/side-nav-bar.component';
// import { BackUpTopNavbarComponent } from './Components/back-up-top-navbar/back-up-top-navbar.component';
import { MenuContextComponent } from './Components/menu-context/menu-context.component';
import { CreateTopologyComponent } from './Components/create-topology/create-topology.component';
import { CommonModelComponentTopology } from './Components/common-model-topology/common-model-topology';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    D3ChartsComponent,
    CommonModelComponent,
    CommonModelComponentTopology,
    WithCloudComponent,
    WithOutCloudComponent,
    NeighboursModelComponent,
    GoogleMapsComponent,
    TopMenuBarComponent,
    SideNavBarComponent,
    // BackUpTopNavbarComponent,
    MenuContextComponent,
    CreateTopologyComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ModalModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA53q_QYYfOQVeTmMqAlmCTd8xbTa2PDhM',
      // apiKey : 'AIzaSyD_dtfaszEFY0hO-umTNCfKAVOE75nKIeA'
      // apiKey : 'AIzaSyCZsLG3zVvX02Oyu_c9N6eo8r5kgYHDPms'
    }),
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
