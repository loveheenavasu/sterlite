import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NeighboursModelComponent } from '../neighbours-model/neighbours-model.component';

@Component({
  selector: 'app-common-model',
  templateUrl: './common-model.component.html',
  styleUrls: ['./common-model.component.scss'],
})
export class CommonModelComponent implements OnInit {
  cucp: boolean = false;
  cuup: boolean = false;
  du: boolean = false;
  cells: boolean = false;
  OpenNeighbourCells: boolean = false;

  nodeParams: any = [];

  constructor(
    private modalService: BsModalService,
    private options: ModalOptions,
    public modalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.nodeParams = this.options.initialState as any;
    console.log('Model popup ---> ', this.nodeParams);
    this.viewCheck();
  }
  // To check the data coming from google maps view or cloud view
  viewCheck() {
    if (typeof this.nodeParams.image === typeof {}) {
      console.log(typeof this.nodeParams.image);
      console.log('true');
      this.cucp = this.nodeParams.image.url.includes('CUCP');
      this.cuup = this.nodeParams.image.url.includes('CUUP');
      this.du = this.nodeParams.image.url.includes('DU');
      this.cells = this.nodeParams.image.url.includes('Tower');
    } else {
      console.log(typeof this.nodeParams.image);
      console.log('false');
      this.cucp = this.nodeParams.image.includes('CUCP');
      this.cuup = this.nodeParams.image.includes('CUUP');
      this.du = this.nodeParams.image.includes('DU');
      this.cells = this.nodeParams.image.includes('Tower');
    }
  }

  openNeighboursOrCells() {
    this.close();
    if (this.cells) {
      const config: ModalOptions = {
        initialState: this.nodeParams,
        backdrop: 'static',
        class: 'modal-xl modal-dialog-centered',
        keyboard: false,
      };
      console.log(config, 'configconfig11');
      this.modalRef = this.modalService.show(NeighboursModelComponent, config);
      this.modalRef.content.closeBtnName = 'Close';
    } else {
      const config: ModalOptions = {
        initialState: this.nodeParams,
        backdrop: 'static',
        class: 'modal-xl modal-dialog-centered',
        keyboard: false,
      };
      console.log(config, 'configconfig2');

      this.modalRef = this.modalService.show(NeighboursModelComponent, config);
      this.modalRef.content.closeBtnName = 'Close';
    }
  }
  close() {
    this.modalRef.hide();
  }
}
