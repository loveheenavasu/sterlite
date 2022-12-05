import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTopologyComponent } from './Components/create-topology/create-topology.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { GoogleMapsComponent } from './Components/google-maps/google-maps.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'google-map',
    pathMatch: 'full',
  },
  {
    path: 'd3',
    component: DashboardComponent,
  },
  {
    path: 'google-map',
    component: GoogleMapsComponent,
  },
  {
    path: 'createTopology',
    component: CreateTopologyComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
