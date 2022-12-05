import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDs } from '../create-topology/create-topology.component';

@Component({
  selector: 'app-common-model-topology',
  templateUrl: './common-model-topology.html',
  styleUrls: ['./common-model-topology.scss'],
})
export class CommonModelComponentTopology implements OnInit {
  cucp: boolean = false;
  cuup: boolean = false;
  du: boolean = false;
  cells: boolean = false;
  serverType: string = '';
  server: any;
  cuups: any[] = [];
  gnbIDs: any[] = [];
  selectedCUUPs: string[] = [];
  cucps: any[] = [];
  selectedCUCPs: string[] = [];
  selectedGNBID?: string;
  setDevice: (device: any) => void = () => {};
  selectCells: any[] = [];
  selectedCellsIds: string[] = [];
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private options: ModalOptions,
    public modalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const initialState: any = this.options?.initialState;
    this.server = initialState?.device;
    this.setDevice = initialState?.setDevice;

    console.log(initialState, 'initialStateinitialStateinitialState');

    this.selectCells = initialState?.leftCells || [];
    this.cuups = initialState?.cuups || [];
    this.cucps = initialState?.cucps || [];
    this.gnbIDs = initialState?.gnbIDs || [];

    this.selectedCUUPs = this.cuups
      .filter((cuup) => cuup.isSelected)
      .map((cuup) => cuup.id);

    this.selectedCUCPs = this.cucps
      .filter((cucp) => cucp.isSelected)
      .map((cucp) => cucp.id);

    this.selectedCellsIds = this.selectCells
      .filter((cell) => cell.isSelected)
      .map((cell) => cell.id);

    this.serverType = this.server?.device?.type || this.server?.type;

    this.viewCheck();
    const attribute = this.server?.device?.attributes || {};

    switch (true) {
      case this.cucp:
        this.registerForm = this.formBuilder.group({
          cucpname: [attribute.cucpname || '', Validators.required],
          // gnbId: [attribute.gnbId || '', Validators.required],
          latitude: [
            attribute.latitude || '',
            [Validators.required, Validators.min(-90), Validators.max(90)],
          ],
          longitude: [
            attribute.longitude || '',
            [Validators.required, Validators.min(-180), Validators.max(180)],
          ],
          // pLMNId: [attribute.pLMNId || '', Validators.required],
          // userDefinedState: [
          //   attribute.userDefinedState || '',
          //   Validators.required,
          // ],
          // vendorName: [attribute.vendorName || '', Validators.required],
          // xnConnections: [attribute.xnConnections || '', Validators.required],
        });
        break;

      case this.cuup:
        this.registerForm = this.formBuilder.group({
          // gnbId: [attribute.gnbId || '', Validators.required],
          latitude: [
            attribute.latitude || '',
            [Validators.required, Validators.min(-90), Validators.max(90)],
          ],
          longitude: [
            attribute.longitude || '',
            [Validators.required, Validators.min(-180), Validators.max(180)],
          ],
          // userDefinedState: [
          //   attribute.userDefinedState || '',
          //   Validators.required,
          // ],
          // vendorName: [attribute.vendorName || '', Validators.required],
        });
        break;

      case this.du:
        this.registerForm = this.formBuilder.group({
          // cuups: [attribute.cuups || '', Validators.required],
          latitude: [
            attribute.latitude || '',
            [Validators.required, Validators.min(-90), Validators.max(90)],
          ],
          longitude: [
            attribute.longitude || '',

            [Validators.required, Validators.min(-180), Validators.max(180)],
          ],
          duName: [attribute.duName || '', Validators.required],
          // gnbId: [attribute.gnbId || '', Validators.required],
          // userDefinedState: [
          //   attribute.userDefinedState || '',
          //   Validators.required,
          // ],
          // vendorName: [attribute.vendorName || '', Validators.required],
        });
        break;

      case this.cells:
        this.registerForm = this.formBuilder.group({
          cellName: [attribute.cellName || '', Validators.required],
          // cellState: [attribute.cellState || '', Validators.required],
          // cellAzimuth: [attribute.cellAzimuth || '', Validators.required],
          latitude: [
            attribute.latitude || '',
            [Validators.required, Validators.min(-90), Validators.max(90)],
          ],
          longitude: [
            attribute.longitude || '',
            [Validators.required, Validators.min(-180), Validators.max(180)],
          ],
          // administrativeState: [
          //   attribute.administrativeState || '',
          //   Validators.required,
          // ],
          // arfcnDL: [attribute.arfcnDL || '', Validators.required],
          // arfcnUL: [attribute.arfcnUL || '', Validators.required],
          // bsChannelBwDL: [attribute.bsChannelBwDL || '', Validators.required],
          // cesSwitch: [attribute.cesSwitch || '', Validators.required],
          // energySavingControl: [
          //   attribute.energySavingControl || '',
          //   Validators.required,
          // ],
          // energySavingState: [
          //   attribute.energySavingState || '',
          //   Validators.required,
          // ],
          // isCoverageCell: [attribute.isCoverageCell || '', Validators.required],
          // pci: [attribute.pci || '', Validators.required],
          // localId: [attribute.localId || '', Validators.required],
          // operationalState: [
          //   attribute.operationalState || '',
          //   Validators.required,
          // ],
        });
        break;
    }
  }

  handleChange(event: any, type: 'CELL' | 'CUUP' | 'CUCP' | 'GNBID') {
    const ids = Array.from(event?.target?.selectedOptions).map(
      (ev: any) => ev.value
    );

    switch (type) {
      case 'CELL':
        this.selectedCellsIds = ids;
        break;
      case 'CUCP':
        this.selectedCUCPs = ids;
        break;
      case 'CUUP':
        this.selectedCUUPs = ids;
        break;
      case 'GNBID':
        this.selectedGNBID = event?.target?.value;
        break;
    }

    // if (type === 'CELL') {
    //   this.selectedCellsIds = ids;
    // } else if (type === 'CUUP') {
    //   this.selectedCUUPs = ids;
    // } else if (type === 'CUCP') {
    //   this.selectedCUCPs = ids;
    // } else if(type === 'CUCP')
  }

  onSubmit(event: any) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('Your data has been saved successfully');

    event.preventDefault();
    const data: any = {};
    formFields[this.serverType].forEach((field: string) => {
      data[field] = event.target?.[field]?.value;
    });

    this.setDevice({
      ...data,
      // @ts-ignore
      [IDs[this.serverType]]:
        // @ts-ignore
        this.server?.device?.attributes?.[IDs[this.serverType]],
      type: this.serverType,
      selectedCellsIds: this.selectedCellsIds,
      selectedCUUPs: this.selectedCUUPs,
      selectedCUCPs: this.selectedCUCPs,
      selectedGNBID: this.selectedGNBID,
    });

    this.close();
  }

  viewCheck() {
    this.cucp = this.serverType === 'CUCP';
    this.cuup = this.serverType === 'CUUP';
    this.du = this.serverType === 'DU';
    this.cells = this.serverType === 'CELL';
  }

  close() {
    this.modalRef.hide();
  }
}

const idCreator = function* (num: number) {
  let i = num;
  while (true) {
    i++;
    yield i.toString();
  }
};

const cuupIdCreator = idCreator(10000);
const cucpIdCreator = idCreator(1000);
const duIdCreator = idCreator(100);
const cellIdCreator = idCreator(100000);

const generatecuupId = () => cuupIdCreator.next().value;
const generatecucpId = () => cucpIdCreator.next().value;
const generateduId = () => duIdCreator.next().value;
const generatecellId = () => cellIdCreator.next().value;

export function generateIdByType(type: 'CUUP' | 'CUCP' | 'DU' | 'CELL') {
  switch (type) {
    case 'CUCP':
      return generatecucpId();
    case 'CUUP':
      return generatecuupId();
    case 'DU':
      return generateduId();
    case 'CELL':
      return generatecellId();
  }
}

const formFields: any = {
  CUUP: [
    // 'cuupid',
    // 'gnbId',
    'latitude',
    'longitude',
    // 'userDefinedState',
    // 'vendorName',
  ],
  CUCP: [
    // 'cucpid',
    'cucpname',
    // 'gnbId',
    'latitude',
    'longitude',
    // 'pLMNId',
    // 'userDefinedState',
    // 'vendorName',
    // 'xnConnections',
  ],
  DU: [
    // 'duid',
    // 'cuups',
    'duName',
    // 'gnbId',
    'latitude',
    'longitude',
    // 'userDefinedState',
    // 'vendorName',
  ],
  CELL: [
    // 'cellId',
    'cellName',
    // 'cellState',
    // 'cellAzimuth',
    'latitude',
    'longitude',
    // 'administrativeState',
    // 'arfcnDL',
    // 'arfcnUL',
    // 'bsChannelBwDL',
    // 'cesSwitch',
    // 'energySavingControl',
    // 'energySavingState',
    // 'isCoverageCell',
    // 'pci',
    // 'localId',
    // 'operationalState',
  ],
};
