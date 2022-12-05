import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopologyService {
  dataSub = new Subject();
  _url = '../../../assets/SampleJson10Dus_6Cells.json';

  constructor(private _Http: HttpClient) {}
  passDataMethod(val: any) {
    this.dataSub.next(val);
  }
  postData(body: any) {
    console.log('Current URL --->', this._url);
    return this._Http.post(this._url, body);
  }
}
