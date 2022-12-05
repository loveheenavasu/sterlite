import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  dataSub = new Subject();

  // _url = 'http://172.30.161.160:9200/5g-radio-network-22/_search';

  // _url = 'http://172.30.161.160:9200/5g-radio-network-23/_search';

  // _url = 'http://172.30.161.54:9200/5g-radio-network-21/_search';

  // _url = '../../../assets/SampleJson/Topology2.json';

  // _url = '../../../assets/SampleJson/Topology_1Du_6Cells.json';

  // _url = '../../../assets/SampleJson/Topology_2Dus_4Cells.json';

  // _url = '../../../assets/SampleJson/Topology_9Dus_6Cells.json';

  // _url = '../../../assets/SampleJson/Topology_10Dus_7Cells.json';

  // _url = '../../../assets/SampleJson/Topology_10Dus_6Cells.json';

  // _url = '../../../assets/SampleJson/Topology_11Dus_5Cells.json';

  // _url = '../../../assets/SampleJson/Topology_11Dus_4Cells.json';

  // _url = '../../../assets/SampleJson/Topology_11Dus_3Cells.json';

  // _url = '../../../assets/SampleJson/newTopology.json';

  // // With change in the Latitude & Longitude's in json's

  // _url = '../../../assets/SampleJson/L&LTopology_1Du_6Cells.json';

  _url = '../../../assets/SampleJson/L&LTopology_10Dus_6Cells.json';

  constructor(private _Http: HttpClient) {}

  passDataMethod(val: any) {
    this.dataSub.next(val);
  }

  getData() {
    console.log('Current URL --->', this._url);
    return this._Http.get(this._url);
  }
}
