import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-neighbours-model',
  templateUrl: './neighbours-model.component.html',
  styleUrls: ['./neighbours-model.component.scss'],
})
export class NeighboursModelComponent implements OnInit {
  cucp: boolean = false;
  cuup: boolean = false;
  du: boolean = false;
  cells: boolean = false;
  neighbourParams: any = [];
  constructor(private options: ModalOptions, public modalRef: BsModalRef) {}
  ngOnInit(): void {
    this.neighbourParams = this.options.initialState as any;
    console.log(this.neighbourParams);
    this.viewCheck();
  }
  // To check the data coming from google maps view or cloud view
  viewCheck() {
    if (typeof this.neighbourParams.image === typeof {}) {
      console.log(typeof this.neighbourParams.image);
      console.log('true');
      // this.cucp = this.neighbourParams.image.url.includes("CUCP");
      // this.cuup = this.neighbourParams.image.url.includes("CUUP");
      this.du = this.neighbourParams.image.url.includes('DU');
      this.cells = this.neighbourParams.image.url.includes('Tower');
    } else {
      console.log(typeof this.neighbourParams.image);
      console.log('false');
      // this.cucp = this.neighbourParams.image.includes("CUCP");
      // this.cuup = this.neighbourParams.image.includes("CUUP");
      this.du = this.neighbourParams.image.includes('DU');
      this.cells = this.neighbourParams.image.includes('Tower');
    }
  }
}
