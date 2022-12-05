import { identifierName, IfStmt } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import {
  CommonModelComponentTopology,
  generateIdByType,
} from '../common-model-topology/common-model-topology';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { isValidDevice } from './helpers';
import { TopologyService } from 'src/app/Services/topology.service';

@Component({
  selector: 'app-create-topology',
  templateUrl: './create-topology.component.html',
  styleUrls: ['./create-topology.component.scss'],
})
export class CreateTopologyComponent implements OnInit {
  CUCPUrl: string = '../../../assets/Images/CUCP.png';
  CUUPUrl: string = '../../../assets/Images/CUUP.png';
  DUUrl: string = '../../../assets/Images/DU.png';
  CELLUrl: string = '../../../assets/Images/Tower.png';

  contextMenu: any;
  shareMenu: any;

  x: any;
  y: any;

  devices: any[] = [];

  dus: any[] = [];
  cuups: any[] = [];
  cucps: any[] = [];
  cells: any[] = [];

  lineStyles: string[] = [];
  extraCells: any[] = [];
  newData: any;
  constructor(
    private topologyService: TopologyService,
    private modalService: BsModalService,
    private nodeModal: BsModalRef
  ) {}

  ngOnInit(): void {
    this.clickEvent();
  }

  handleSubmit() {
    ////////// ----->  Post APi Data
    const isValid = this.devices.every((device: any) => isValidDevice(device));
    if (isValid) {
      alert('Data Submitted Successfully');

      this.topologyService
        .postData(this.devices)
        .subscribe((res) => console.log(res));
    } else {
      alert('Invalid Data Please check your data.');
    }
  }

  // Context Menu for the click event
  clickEvent() {
    this.contextMenu = document.querySelector('.wrapper');
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault(); //preventing default context menu of the browser
      this.x = e.offsetX;
      this.y = e.offsetY;
      let winWidth = window.innerWidth;
      let winHeight = window.innerHeight;
      let cmWidth = this.contextMenu.offsetWidth;
      let cmHeight = this.contextMenu.offsetHeight;
      // If x is greater than window width - contextMenu width then set the x value
      // to window width - contextMenu width else set x to the offsetX. Similarly to Y

      this.x = this.x > winWidth - cmWidth ? winWidth - cmWidth : this.x;
      this.y = this.y > winHeight - cmHeight ? winHeight - cmHeight : this.y;
      this.contextMenu.style.left = `${this.x}px`;
      this.contextMenu.style.top = `${this.y}px`;
      this.contextMenu.style.visibility = 'visible';
    });
    document.addEventListener(
      'click',
      () => (this.contextMenu.style.visibility = 'hidden')
    );
  }

  openDeviceModal(device: any) {
    // to calculate the cells with isSelected(by any DU) status.
    let leftCells: any[] = [];
    const cuups: any[] = [];
    const cucps: any[] = [];
    const gnbIDs: any[] = [];

    if (device?.device?.type === 'CUCP') {
      this.cucps.forEach((cucp) => {
        const cucpId = cucp?.device?.attributes?.cucpid;
        if (cucpId == device?.device?.attributes?.cucpid) {
          // DO Nothing
        } else if (
          device.device?.attributes?.xnConnections?.includes?.(cucpId)
        ) {
          cucps.push({
            id: cucpId,
            isSelected: true,
          });
        } else {
          cucps.push({
            id: cucpId,
            isSelected: false,
          });
        }
      });
    }

    if (device?.device?.type === 'CUUP') {
      this.cuups.forEach((cuup) => {
        const cuupId = cuup?.device?.attributes?.cuupid;
        console.log(device.device?.attributes?.cuups, cuupId);
        if (cuupId == device?.device?.attributes?.cuupid) {
          // DO Nothing
        } else if (device.device?.attributes?.cuups?.includes?.(cuupId)) {
          cuups.push({
            id: cuupId,
            isSelected: true,
          });
        } else {
          cuups.push({
            id: cuupId,
            isSelected: false,
          });
        }
      });

      this.cucps.forEach((cucp) => {
        const gnbId = cucp?.device?.attributes?.gnbId;
        if (gnbId == device?.device?.attributes?.gnbId) {
          gnbIDs.push({
            id: gnbId,
            isSelected: true,
          });
        } else {
          gnbIDs.push({
            id: gnbId,
            isSelected: false,
          });
        }
      });
    }

    if (device?.device?.type === 'DU') {
      this.cucps.forEach((cucp) => {
        const gnbId = cucp?.device?.attributes?.gnbId;
        if (gnbId == device?.device?.attributes?.gnbId) {
          gnbIDs.push({
            id: gnbId,
            isSelected: true,
          });
        } else {
          gnbIDs.push({
            id: gnbId,
            isSelected: false,
          });
        }
      });
      this.cells.forEach((cell) => {
        if (!('selectedBy' in cell && cell.selectedBy?.id)) {
          leftCells.push({
            id: cell.cellId,
            isSelected: false,
          });
        } else if (cell.selectedBy?.id == device.device.attributes.duid) {
          leftCells.push({
            id: cell.cellId,
            isSelected: true,
          });
        }
      });

      this.cuups.forEach((cuup) => {
        const cuupId = cuup?.device?.attributes?.cuupid;
        if (device.device?.attributes?.cuups?.includes?.(cuupId)) {
          cuups.push({
            id: cuupId,
            isSelected: true,
          });
        } else {
          cuups.push({
            id: cuupId,
            isSelected: false,
          });
        }
      });
    }

    // calculating cells which has been linked as neighbour cells  and which are yet to be linked

    if (device?.type == 'CELL') {
      // debugger;
      if ('selectedBy' in device && device?.selectedBy?.id) {
        // finding cells which are selected by same DU
        leftCells = this.cells
          .filter(
            (cell) =>
              cell?.selectedBy?.id == device?.selectedBy?.id &&
              cell?.cellId !== device?.cellId
          )
          .map((cell) => ({
            id: cell.cellId,
            isSelected: !!device?.neighbours?.find(
              (cl: any) => cl.cellId == cell?.cellId
            ),
          }));
      }
    }
    let _device = device;

    if (device?.type == 'CELL') {
      const { type, cellId, image, ...others } = _device;

      _device = {
        device: {
          type,
          image,
          attributes: {
            cellId,
            type,
            ...others,
          },
        },
      };
    }

    const config: ModalOptions = {
      initialState: {
        device: _device,
        leftCells,
        cuups,
        cucps,
        gnbIDs,
        setDevice: this.setDevice.bind(this),
      },
      backdrop: 'static',
      class: 'modal-dialog-centered',
      keyboard: false,
    };
    this.nodeModal = this.modalService.show(
      CommonModelComponentTopology,
      config
    );
    this.nodeModal.content.closeBtnName = 'Close';
  }

  setDevice(_device: any) {
    const {
      selectedCellsIds,
      selectedCUUPs,
      selectedCUCPs,
      selectedGNBID,
      ...device
    } = _device;

    if (device.type !== 'CELL') {
      if (device.type == 'DU') {
        this.addCellToDU(device.duid, selectedCellsIds);
        console.log(this.devices, 'gfchjklljhgfh');
        this.addCuupsToDU(device.duid, selectedCUUPs);
        this.addGnbIdToDU(device.duid, selectedGNBID);
        // this.addCucpsToDU(device.duid, selectedCUCPs);
      } else if (device?.type === 'CUCP') {
        // this.addCUUPToCUCPs(device.cucpid, selectedGNBID);
        this.addXnConnectionsToCUCP(device.cucpid, selectedCUCPs);
      } else if (device?.type === 'CUUP') {
        this.addGnbIdToCUUP(device.cuupid, selectedGNBID);
        this.addCUUPsToCUUP(device.cuupid, selectedCUUPs);
      }

      const deviceIndex = this.devices?.findIndex((dv) => {
        return (
          // @ts-ignore
          dv.device.attributes[IDs[dv.device.type]] ==
          // @ts-ignore
          device[IDs[device.type]]
        );
      });

      if (deviceIndex > -1) {
        this.devices![deviceIndex]!.device!.attributes = {
          ...this.devices?.[deviceIndex]?.device?.attributes,
          ...device,
        };
      }
    } else {
      // for neighbour cells
      const { selectedCellsIds, ...device } = _device;

      const unselectedCells: string[] = [];

      this.cells = this.cells.map((cell) => {
        if (cell.cellId == device.cellId) {
          if ('neighbours' in cell) {
            cell.neighbours?.forEach((cl: any) => {
              if (!selectedCellsIds.includes(cl?.cellId)) {
                unselectedCells.push(cl?.cellId);
              }
            });
          }
          return {
            ...device,
            ...cell,
            neighbours: selectedCellsIds.map((cl: string) => ({ cellId: cl })),
          };
        } else if (selectedCellsIds.includes(cell.cellId)) {
          if (
            !!cell?.neighbours?.find?.((cl: any) => cl.cellId == device.cellId)
          ) {
            return cell;
          }
          return {
            ...cell,
            neighbours: [
              ...(cell?.neighbours || []),
              { cellId: device.cellId },
            ],
          };
        } else {
          return { ...cell };
        }
      });

      unselectedCells.forEach((cell) => {
        const cellIndex = this.cells.findIndex((cl) => cl.cellId == cell);

        if (cellIndex >= 0) {
          this.cells![cellIndex]!.neighbours = (
            this.cells?.[cellIndex]?.neighbours || []
          ).filter((cl: any) => cl.cellId != device.cellId);
        }
      });
      // debugger;
      this.addNeighbourCell(device?.cellId, selectedCellsIds);
    }
    this.extractUsableData();
    this.handleExtraCells();
    this.initChart();
    console.log(this.devices, 'fghjklkjhfghjklkjhg');
  }

  handleExtraCells() {
    this.extraCells = this.cells.filter((cell) => !('selectedBy' in cell));
  }

  imageLoader(imageUrl: any) {
    let device: 'CUCP' | 'CUUP' | 'DU' | 'CELL';

    switch (imageUrl) {
      case this.CUCPUrl:
        device = 'CUCP';
        break;
      case this.CUUPUrl:
        device = 'CUUP';
        break;
      case this.DUUrl:
        device = 'DU';
        break;
      case this.CELLUrl:
        device = 'CELL';
        break;
      default:
        device = '' as any;
    }

    let newData: any;

    if (device !== 'CELL') {
      const id = generateIdByType(device as any);
      newData = {
        device: {
          image: imageUrl,
          type: device,
          attributes: {
            [IDs[device]]: id,
          },
        },
      };

      if (device === 'CUCP') {
        newData.device.attributes = {
          ...newData.device.attributes,
          gnbId: id,
        };
      }

      this.devices.push(newData);
      this.extractUsableData();
      this.initChart();

      console.log(this.devices, 'this.devices_this.devices');
    } else {
      newData = {
        cellId: generateIdByType(device as any),
        image: imageUrl,
        type: 'CELL',
      };
      this.cells.push(newData);
      this.handleExtraCells();
    }
  }

  extractUsableData() {
    this.dus = [];
    this.cucps = [];
    this.cuups = [];

    this.devices.forEach((device) => {
      if (device?.device?.type == 'DU') {
        this.dus.push(device);
      }
      if (device?.device?.type == 'CUCP') {
        this.cucps.push(device);
      }
      if (device?.device?.type == 'CUUP') {
        this.cuups.push(device);
      }
    });
  }

  addCuupsToDU(duID: string, cuupIDs: string[]) {
    const deviceIndex = this.devices.findIndex(
      (device) =>
        device.device.type == 'DU' && device.device?.attributes?.duid == duID
    );
    if (deviceIndex >= 0) {
      this.devices[deviceIndex]!.device!.attributes = {
        ...this.devices[deviceIndex]?.device?.attributes,
        cuups: cuupIDs,
      };
    }
  }

  addXnConnectionsToCUCP(cucpID: string, connections: string[]) {
    const deviceIndex = this.devices.findIndex(
      (device) =>
        device?.device?.type == 'CUCP' &&
        device.device?.attributes?.cucpid == cucpID
    );

    const unselectedConnections: string[] = [];

    const previousConnections =
      this.devices?.[deviceIndex]?.device?.attributes?.xnConnections;

    if (Array.isArray(previousConnections)) {
      previousConnections.forEach((con) => {
        if (!connections.includes(con)) {
          unselectedConnections.push(con);
        }
      });
    }

    unselectedConnections.forEach((con) => {
      const deviceIndex = this.devices.findIndex(
        (dv) =>
          dv?.device?.type === 'CUCP' && dv?.device?.attributes?.cucpid == con
      );

      if (deviceIndex >= 0) {
        this.devices![deviceIndex]!.device!.attributes = {
          ...this.devices?.[deviceIndex]?.device?.attributes,
          xnConnections: (
            this.devices?.[deviceIndex]?.device?.attributes?.xnConnections || []
          ).filter((cn: string) => cn != cucpID),
        };
      }
    });

    if (deviceIndex >= 0) {
      this.devices[deviceIndex]!.device!.attributes = {
        ...this.devices[deviceIndex]?.device?.attributes,
        xnConnections: connections,
      };
    }

    // to make the xnConnections to the selected connections as well.

    connections.forEach((connection) => {
      // debugger;
      const deviceIndex = this.devices.findIndex(
        (dv) =>
          dv?.device?.type === 'CUCP' &&
          dv?.device?.attributes?.cucpid == connection
      );

      if (deviceIndex >= 0) {
        if (
          !this.devices[
            deviceIndex
          ]?.device?.attributes?.xnConnections?.includes(cucpID)
        ) {
          this.devices[deviceIndex]!.device!.attributes = {
            ...this.devices[deviceIndex]?.device?.attributes,
            xnConnections: Array.from(
              new Set([
                ...(this.devices[deviceIndex]?.device?.attributes
                  ?.xnConnections || []),
                cucpID,
              ])
            ),
          };
        }
      }
    });
  }

  addCUUPsToCUUP(cuupID: string, cuupIDs: string[]) {
    const deviceIndex = this.devices.findIndex(
      (device) =>
        device?.device?.type == 'CUUP' &&
        device?.device?.attributes?.cuupid == cuupID
    );

    const unselectedConnections: string[] = [];

    if (deviceIndex >= 0) {
      const previousConnections =
        this.devices[deviceIndex]?.device?.attributes?.cuups || [];

      if (Array.isArray(previousConnections)) {
        previousConnections.forEach((cuup_id) => {
          if (!cuupIDs.includes(cuup_id)) {
            unselectedConnections.push(cuup_id);
          }
        });
      }

      this.devices[deviceIndex]!.device!.attributes = {
        ...this.devices[deviceIndex]?.device?.attributes,
        cuups: cuupIDs,
      };
    }

    if (unselectedConnections.length > 0) {
      unselectedConnections.forEach((connection) => {
        const deviceIndex = this.devices.findIndex(
          (dv) =>
            dv?.device?.type === 'CUUP' &&
            dv?.device?.attributes?.cuupid == connection
        );

        if (deviceIndex >= 0) {
          this.devices![deviceIndex]!.device!.attributes = {
            ...this.devices?.[deviceIndex]?.device?.attributes,
            cuups: (
              this.devices?.[deviceIndex]?.device?.attributes?.xnConnections ||
              []
            ).filter((cn: string) => cn != cuupID),
          };
        }
      });
    }
    cuupIDs.forEach((id) => {
      const devIndex = this.devices.findIndex(
        (d) => d.device.type === 'CUUP' && d.device?.attributes?.cuupid == id
      );

      if (devIndex >= 0) {
        this.devices[devIndex]!.device!.attributes = {
          ...this.devices[devIndex]!.device!.attributes,
          cuups: Array.from(
            new Set([
              ...(this.devices[devIndex]?.device?.attributes?.cuups || []),
              cuupID,
            ])
          ),
        };
      }
    });

    console.log(this.devices, 'sadasdsadasdasdasdadas');
  }

  addGnbIdToCUUP(cuupID: string, gnbID: string) {
    const deviceIndex = this.devices.findIndex(
      (dv) =>
        dv?.device?.type === 'CUUP' && dv?.device?.attributes?.cuupid == cuupID
    );

    this.devices![deviceIndex]!.device!.attributes = {
      ...this.devices?.[deviceIndex]?.device?.attributes,
      gnbId: gnbID || '',
    };
  }

  addGnbIdToDU(duId: string, gnbID: string) {
    const deviceIndex = this.devices.findIndex(
      (dv) => dv?.device?.type === 'DU' && dv?.device?.attributes?.duid == duId
    );

    this.devices![deviceIndex]!.device!.attributes = {
      ...this.devices?.[deviceIndex]?.device?.attributes,
      gnbId: gnbID || '',
    };
  }

  addCellToDU(duID: string, cellIDs: string[]) {
    this.cells.forEach((cell, index) => {
      if ('selectedBy' in cell && cell.selectedBy.id == duID) {
        // means the id has beed unselected so add it back to cells array.
        if (!cellIDs.includes(cell.cellId)) {
          const { selectedBy: _, ...leftOverFields } = cell;
          this.cells[index] = { ...leftOverFields };
        }
      }
    });

    this.cells = this.cells.map((cell) => {
      // const { neighbourCells, ...leftCells } = cell;
      if (cellIDs.includes(cell.cellId)) {
        return {
          ...cell,
          selectedBy: {
            id: duID,
            type: 'DU',
          },
        };
      } else {
        return cell;
      }
    });

    const duDeviceIndex = this.devices.findIndex(
      (device) =>
        device?.device?.type == 'DU' && device?.device?.attributes?.duid == duID
    );

    const cells = cellIDs.map((cellId) =>
      this.cells.find((cell) => cell.cellId == cellId)
    );

    if (duDeviceIndex >= 0) {
      this.devices[duDeviceIndex].device.attributes = {
        ...this.devices[duDeviceIndex].device.attributes,
        cells: cells,
      };
    }
  }
  addNeighbourCell(cellId: string, neighbourCellIDs: string[]) {
    const cell = this.cells.find((cl) => cl.cellId == cellId);

    if (cell.selectedBy) {
      const duDeviceIndex = this.devices.findIndex(
        (device) =>
          device.device.type == 'DU' &&
          device.device.attributes.duid == cell?.selectedBy?.id
      );
      this.devices[duDeviceIndex]!.device!.attributes!.cells = this.devices[
        duDeviceIndex
      ]?.device?.attributes?.cells?.map((cell: any) => {
        const _cell = this.cells.find((cl) => cl.cellId == cell.cellId);
        const { cellName, latitude, longitude } = _cell;
        // debugger;
        if ('neighbours' in _cell) {
          return {
            ...cell,
            cellName,
            latitude,
            longitude,
            neighbours: _cell?.neighbours || [],
          };
        } else {
          return { ...cell, cellName, latitude, longitude };
        }
      });
    }
  }

  /////////////////////////////////////////////////////////////////

  topologyArr: any;

  links: Array<any> = [];
  nodes: Array<any> = [];

  cucpDevice: boolean = false;
  cuupDevice: boolean = false;
  duDevice: boolean = false;

  cucpArr: any[] = [];
  cuupArr: any[] = [];
  duArr: any[] = [];

  cucpCells: boolean = false;
  cuupCells: boolean = false;
  duCells: boolean = false;

  cucpCellsArr: any[] = [];
  cuupCellsArr: any[] = [];
  duCellsArr: any[][] = [];
  cloudsArray: any[] = [];
  cloudName: any[] = ['Cloud'];

  /**
   * Chart related properties
   */
  data: any = [];
  link: any;
  node: any;
  cloudRect: any = {};

  margin = { top: 0, right: 20, bottom: 0, left: 20 };

  width = 400;
  height = 400;

  deviceSize = 36;
  tooltipHeight = 70;

  cellsWidthHandler: Function = () => {};
  cuupAndCucpWidthHandler: Function = () => {};
  duWidthHandler: Function = () => {};
  heightHandler: Function = () => {};

  reInitialize() {
    const parent = document.getElementById('my_dataviz');
    while (parent && parent.firstChild) {
      parent.firstChild.remove();
    }

    this.topologyArr;

    this.links = [];
    this.nodes = [];

    this.cucpDevice = false;
    this.cuupDevice = false;
    this.duDevice = false;

    this.cucpArr = [];
    this.cuupArr = [];
    this.duArr = [];

    this.cucpCells = false;
    this.cuupCells = false;
    this.duCells = false;

    this.cucpCellsArr = [];
    this.cuupCellsArr = [];
    this.duCellsArr = [];
    this.cloudsArray = [];
    this.cloudName = ['Cloud'];

    /**
     * Chart related properties
     */
    this.data = [];
    this.link;
    this.node;

    this.width = 400;
    this.height = 400;

    this.deviceSize = 36;
    this.tooltipHeight = 70;

    this.cellsWidthHandler = () => {};
    this.cuupAndCucpWidthHandler = () => {};
    this.duWidthHandler = () => {};
    this.heightHandler = () => {};

    this.margin = { top: 0, right: 20, bottom: 0, left: 20 };
  }

  initChart() {
    // might delete it later
    this.reInitialize();

    this.topologyArr = {
      topology: this.devices,
    };
    for (let i = 0; i < this.topologyArr.topology.length; i++) {
      if (this.topologyArr.topology[i].device.type == 'CUCP') {
        this.cucpArr.push(this.topologyArr.topology[i].device);
        this.cucpDevice = true;

        // For Cells
        if (
          this.topologyArr.topology[i].device.attributes.cells &&
          this.topologyArr.topology[i].device.attributes.cells?.length != 0
        ) {
          this.cucpCellsArr =
            this.topologyArr.topology[i].device.attributes.cells;
          this.cucpCells = true;
        }
      } else if (this.topologyArr.topology[i].device.type == 'DU') {
        this.duArr.push(this.topologyArr.topology[i].device);
        this.duDevice = true;

        // For Cells

        if (
          this.topologyArr.topology[i].device.attributes.cells &&
          this.topologyArr.topology[i].device.attributes.cells?.length != 0
        ) {
          this.duCellsArr.push(
            this.topologyArr.topology[i].device.attributes.cells
          );
          this.topologyArr.topology[i].device.attributes.cells;
          this.duCells = true;
        }
      } else {
        this.cuupArr.push(this.topologyArr.topology[i].device);
        this.cuupDevice = true;

        //For Cells
        if (
          this.topologyArr.topology[i].device.attributes.cells &&
          this.topologyArr.topology[i].device.attributes.cells?.length != 0
        ) {
          this.cuupCellsArr =
            this.topologyArr.topology[i].device.attributes.cells;
          this.cuupCells = true;
        }
      }
    }
    const combinedCUUPSandCUCPs = this.cuupArr.length + this.cucpArr.length;

    // calculate width of svg based on the manimun number of devices

    const maxLenghtDevices = Math.max(
      this.duArr.length,
      combinedCUUPSandCUCPs,
      this.duCellsArr.flat().length
    );

    if (maxLenghtDevices > 12) {
      this.deviceSize = 32;
    } else if (maxLenghtDevices > 36) {
      this.deviceSize = 28;
    }

    if (maxLenghtDevices > 3) {
      if (window.innerHeight >= 100 * maxLenghtDevices) {
        this.height = 100 * maxLenghtDevices;
      } else {
        this.height = window.innerHeight;
      }
    }

    this.heightHandler = d3
      .scaleBand()
      .domain(['Cs', 'DUs', 'CELLs'])
      .range([0, this.height]);
    // }
    this.width = Math.max(maxLenghtDevices * (this.deviceSize * 3), 400) * 0.9;
    this.setNodeLinks();
  }

  addLink(source: any, target: any, color: string, isCurved: boolean) {
    // debugger
    const hasAlreadyALink = !!this.links.find(
      (link) => link.source.id == target.id && link.target.id == source.id
    );
    if (!hasAlreadyALink) {
      this.links.push({
        source,
        target,
        color,
        isCurved,
      });
    }
  }

  setNodeLinks() {
    const cucpIDs = this.cucpArr.map((d) => d?.attributes?.cucpid).reverse();
    const cuupIDs = this.cuupArr.map((d) => d?.attributes?.cuupid);

    let cellsWidthSpacer: number = 100;

    if (this.duCellsArr.flat().length > 0) {
      cellsWidthSpacer = this.width / this.duCellsArr.flat().length / 2;
    }

    let cuupAndCucpWidthSpacer: number = 100;

    if (cucpIDs.length > 0 || cuupIDs.length > 0) {
      cuupAndCucpWidthSpacer =
        this.width / (cucpIDs.length + cuupIDs.length) / 2;
    }

    const heightSpacer =
      this.height / (this.duCellsArr.flat().length > 2 ? 4 : 3) / 2;

    let duWidthSpacer: number = 100;
    if (this.duArr.length > 0) {
      duWidthSpacer = this.width / this.duArr.length / 2;
    }

    this.cellsWidthHandler = d3
      .scaleBand()
      .domain(this.duCellsArr.flat().map((d) => d.cellId + ''))
      .range([0, this.width]);

    this.cuupAndCucpWidthHandler = d3
      .scaleBand()
      .domain([...cucpIDs, ...cuupIDs])
      .range([0, this.width]);

    console.log(this.duArr.map((du) => du.attributes.duid));
    this.duWidthHandler = d3
      .scaleBand()
      .domain(this.duArr.map((du) => du.attributes.duid))
      .range([0, this.width]);

    for (let i: number = 0; i < this.duArr.length; i++) {
      const x =
        this.duWidthHandler(this.duArr[i]?.attributes?.duid) + duWidthSpacer;
      const y = (this.heightHandler('DUs') as number) + heightSpacer;

      this.nodes.push({
        id: parseInt(this.duArr[i].attributes.duid),
        name: this.duArr[i].attributes.duName,
        image: '../../../assets/Images/DU.png',
        attributes: { ...this.duArr[i].attributes, type: 'DU' },
        type: 'DUs',
        x,
        y,
      });

      console.log(this.nodes, '-----', this.duArr[i]);

      if (this.duArr[i]?.attributes?.gnbId) {
        // this.links.push({
        //   source: {
        //     id: parseInt(this.duArr[i].attributes.duid),
        //     x,
        //     y,
        //     type: 'DUs',
        //   },
        //   target: {
        //     id: parseInt(this.duArr[i].attributes.gnbId),
        //   },
        //   color: 'orange',
        // });
        const source = {
          id: parseInt(this.duArr[i].attributes.duid),
          x,
          y,
          type: 'DUs',
        };
        const target = {
          id: parseInt(this.duArr[i].attributes.gnbId),
        };

        this.addLink(source, target, 'orange', false);
      }

      for (let j: number = 0; j < this.duArr[i].attributes.cuups?.length; j++) {
        // this.links.push({
        //   source: {
        //     id: parseInt(this.duArr[i].attributes.duid),
        //     x,
        //     y,
        //     type: 'Cs',
        //   },
        //   target: { id: parseInt(this.duArr[i].attributes.cuups[j]) },
        //   color: 'orange',
        // });

        const source = {
          id: parseInt(this.duArr[i].attributes.duid),
          x,
          y,
          type: 'Cs',
        };

        const target = { id: parseInt(this.duArr[i].attributes.cuups[j]) };

        this.addLink(source, target, 'orange', false);
      }

      // for (let j: number = 0; j < this.duArr[i].attributes.cucps?.length; j++) {
      //   this.links.push({
      //     source: {
      //       id: parseInt(this.duArr[i].attributes.duid),
      //       x,
      //       y,
      //       type: 'Cs',
      //     },
      //     target: { id: parseInt(this.duArr[i].attributes.cucps[j]) },
      //     color: 'orange',
      //   });
      // }

      for (let k: number = 0; k < this.duArr[i].attributes.cells?.length; k++) {
        // this.links.push({
        //   source: {
        //     id: parseInt(this.duArr[i].attributes.duid),
        //     x,
        //     y,
        //     type: 'DUs',
        //   },
        //   target: { id: parseInt(this.duArr[i].attributes.cells[k].cellId) },
        //   color: 'red',
        // });

        const source = {
          id: parseInt(this.duArr[i].attributes.duid),
          x,
          y,
          type: 'DUs',
        };

        const target = {
          id: parseInt(this.duArr[i].attributes.cells[k].cellId),
        };

        this.addLink(source, target, 'red', false);
      }
    }

    for (let i: number = 0; i < this.cuupArr.length; i++) {
      const x =
        this.cuupAndCucpWidthHandler(this.cuupArr[i].attributes.cuupid) +
        cuupAndCucpWidthSpacer;
      const y = (this.heightHandler('Cs') as number) + heightSpacer;

      this.nodes.push({
        id: parseInt(this.cuupArr[i].attributes.cuupid),
        name: 'CUUP_' + (i + 1),
        image: '../../../assets/Images/CUUP.png',
        attributes: { ...this.cuupArr[i].attributes, type: 'CUUP' },
        type: 'Cs',
        x,
        y,
      });

      if (this.cuupArr[i]?.attributes?.gnbId) {
        // this.links.push({
        //   source: {
        //     id: parseInt(this.cuupArr[i].attributes.cuupid),
        //     x,
        //     y,
        //     type: 'DUs',
        //   },
        //   target: {
        //     id: parseInt(this.cuupArr[i].attributes.gnbId),
        //   },
        //   color: 'orange',
        // });

        const source = {
          id: parseInt(this.cuupArr[i].attributes.cuupid),
          x,
          y,
          type: 'DUs',
        };

        const target = {
          id: parseInt(this.cuupArr[i].attributes.gnbId),
        };

        this.addLink(source, target, 'orange', true);
      }

      for (
        let j: number = 0;
        j < this?.cuupArr[i]?.attributes?.cuups?.length;
        j++
      ) {
        // this.links.push({
        //   source: {
        //     id: parseInt(this?.cuupArr[i]?.attributes?.cuupid),
        //     x,
        //     y,
        //     type: 'Cs',
        //   },
        //   target: {
        //     id: parseInt(this?.cuupArr[i]?.attributes?.cuups[j]),
        //   },
        //   color: 'black',
        // });

        const source = {
          id: parseInt(this?.cuupArr[i]?.attributes?.cuupid),
          x,
          y,
          type: 'Cs',
        };

        const target = {
          id: parseInt(this?.cuupArr[i]?.attributes?.cuups[j]),
        };

        this.addLink(source, target, 'black', true);
      }
    }
    for (let i: number = 0; i < this.cucpArr.length; i++) {
      const x =
        this.cuupAndCucpWidthHandler(this.cucpArr[i].attributes.cucpid) +
        cuupAndCucpWidthSpacer;
      const y = (this.heightHandler('Cs') as number) + heightSpacer;

      this.nodes.push({
        id: parseInt(this.cucpArr[i].attributes.cucpid),
        name: this.cucpArr[i].attributes.cucpname,
        image: '../../../assets/Images/CUCP.png',
        attributes: { ...this.cucpArr[i].attributes, type: 'CUCP' },
        type: 'Cs',
        x,
        y,
      });

      for (
        let j: number = 0;
        j < this.cucpArr[i].attributes.xnConnections?.length;
        j++
      ) {
        // this.links.push({
        //   source: {
        //     id: parseInt(this.cucpArr[i].attributes.cucpid),
        //     x,
        //     y: y,
        //     type: 'Cs',
        //   },
        //   target: {
        //     id: parseInt(this.cucpArr[i].attributes.xnConnections[j]),
        //     incrementer: j * 2,
        //   },
        //   color: 'green',
        // });

        const source = {
          id: parseInt(this.cucpArr[i].attributes.cucpid),
          x,
          y: y,
          type: 'Cs',
        };

        const target = {
          id: parseInt(this.cucpArr[i].attributes.xnConnections[j]),
          incrementer: j * 2,
        };

        this.addLink(source, target, 'green', true);
      }
    }

    // let firstRowAddition = true;
    // let secondRowAddition = false;
    for (let i: number = 0; i < this.duCellsArr.length; i++) {
      const cells = this.duCellsArr[i];
      // const cellsVerticalSpacer = heightSpacer / cells.length / 2;
      for (let j = 0; j < cells.length; j++) {
        const x = this.cellsWidthHandler(cells[j].cellId) + cellsWidthSpacer;
        let y = (this.heightHandler('CELLs') as number) + heightSpacer;

        let type = 'CELLs';

        this.nodes.push({
          id: parseInt(cells[j].cellId),
          name: cells[j].cellName,
          image: '../../../assets/Images/Tower.png',
          attributes: { ...cells[j], type: 'CELL' },
          type,
          x,
          y,
        });

        for (let k: number = 0; k < cells[j]?.neighbours?.length; k++) {
          // this.links.push({
          //   source: {
          //     id: parseInt(cells[j].cellId),
          //     x,
          //     y,
          //     type: 'CELLs',
          //   },
          //   target: {
          //     id: parseInt(cells[j].neighbours[k].cellId),
          //   },
          //   color: 'blue',
          // });

          const source = {
            id: parseInt(cells[j].cellId),
            x,
            y,
            type: 'CELLs',
          };
          const target = {
            id: parseInt(cells[j].neighbours[k].cellId),
          };

          this.addLink(source, target, 'blue', true);
        }
      }
    }

    this.links = this.links?.map((link) => {
      const node = this.nodes.find((_node) => _node.id == link.target.id);
      return {
        ...link,
        target: {
          ...link.target,
          x: node?.x,
          y: node?.y,
          type: node?.type,
        },
      };
    });
    this.generateChart();
  }

  generateChart() {
    let marginLeft =
      (window.innerWidth - this.width) / 2 < 0
        ? this.margin.left
        : (window.innerWidth - this.width) / 2;

    let marginTop =
      (window.innerHeight - this.height) / 2 < 0
        ? this.margin.top
        : (window.innerHeight - this.height) / 2;

    var svg = d3
      .select('#my_dataviz')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')')
      .style('overflow', 'overlay');

    const links: any[] = [];
    const curvedLinks: any[] = [];
    var Gen = d3
      .line()
      .x((p: any) => p.x)
      .y((p: any) => p.y)
      .curve(d3.curveBasis);

    this.links.forEach((link) => {
      if (!link.isCurved) {
        links.push({
          line: d3.linkVertical()({
            source: [
              link.source.x + this.deviceSize / 2,
              link.source.y + this.deviceSize / 2,
            ],
            target: [
              link.target.x + this.deviceSize / 2,
              link.target.y + this.deviceSize / 2,
            ],
          }),
          ...link,
        });
      } else {
        const src_x = link.source.x + this.deviceSize / 2;
        const src_y = link.source.y + this.deviceSize / 2;

        const tar_x = link.target.x + this.deviceSize / 2;
        const tar_y = link.target.y + this.deviceSize / 2;

        const max = Math.max(src_x, tar_x);
        const min = Math.min(src_x, tar_x);

        const mid_x = (src_x + tar_x) / 2;
        const mid_y = tar_y - 25;

        curvedLinks.push({
          points: [
            { x: src_x, y: src_y },
            { x: mid_x, y: mid_y },
            { x: tar_x, y: tar_y },
          ],
          ...link,
        });
      }
    });

    curvedLinks.forEach((link) => {
      console.log(link, 'linklinklinklinklinklink');
      svg
        .append('path')
        .attr('d', Gen(link.points))
        .attr('stroke', link.color)
        .attr('fill', 'none');
    });

    links.forEach((link) => {
      svg
        .append('path')
        .attr('d', link.line)
        .attr('stroke', link.color)
        .attr('fill', 'none');
    });

    // this.link = svg

    //   .selectAll('line')
    //   .data(this.links)
    //   .enter()
    //   .append('line')
    //   .attr('x1', (d) => {
    //     return d.source.x + this.deviceSize / 2;
    //   })
    //   .attr('y1', (d) => {
    //     return d.source.y + this.deviceSize / 2;
    //   })
    //   .attr('x2', (d) => {
    //     return d.target.x + this.deviceSize / 2;
    //   })
    //   .attr('y2', (d) => {
    //     return d.target.y + this.deviceSize / 2;
    //   })
    //   .style('stroke', (d) => d.color)
    //   .style('stroke-width', 0.5);

    // adds each node as a group

    const g = svg.selectAll('.node').data(this.nodes).enter().append('g');

    const tooltip = svg.append('g');
    let tooltipWidth = 0;

    g.append('image')
      .attr('xlink:href', function (d) {
        return d.image;
      })
      .attr('width', this.deviceSize + 'px')
      .attr('height', this.deviceSize + 'px')
      .attr('y', (d) => d.y)
      .attr('x', (d) => d.x)
      .style('cursor', 'pointer')
      .on('click', (item) => {
        let device;
        if (item.type !== 'CELLs') {
          device = this.devices.find(
            (dv) =>
              // @ts-ignore
              dv?.device?.attributes[IDs[item?.attributes?.type]] == item?.id
          );
        } else {
          device = this.cells.find((cell: any) => cell.cellId == item.id);
        }
        this.openDeviceModal(device);
      })
      .on('mouseover', (d) => {
        tooltip
          .append('rect')
          .attr('width', 100)
          .attr('height', this.tooltipHeight)
          .attr('fill', '#208db8')
          .style('opacity', 0)
          .attr(
            'y',
            d.y +
              (d.type == 'SECOND_ROW_CELLs'
                ? -(this.tooltipHeight + 5)
                : this.deviceSize + 5) +
              'px'
          )
          .attr('x', function () {
            return d.x + 'px';
          })
          .style('opacity', 1);

        tooltip
          .append('text')
          .text('ID: ' + d.id)
          .attr('font-weight', '500')
          .attr('width', function (d) {
            tooltipWidth = this.getBoundingClientRect().width;
            return tooltipWidth;
          })
          .attr('fill', 'white')
          .attr(
            'y',
            d.y +
              (d.type == 'SECOND_ROW_CELLs' ? -50 : this.deviceSize + 30) +
              'px'
          )
          .attr('x', function () {
            return d.x + 10 + 'px';
          });

        tooltip
          .append('text')
          .text('Name: ' + d.name)
          .attr('font-weight', '500')
          .attr('height', function () {
            if (this.getBoundingClientRect().width > tooltipWidth) {
              tooltipWidth = this.getBoundingClientRect().width;
            }
            return tooltipWidth;
          })
          .attr('fill', 'white')
          .attr(
            'y',
            d.y +
              (d.type == 'SECOND_ROW_CELLs'
                ? -(30 - 5)
                : this.deviceSize + 30 + 25) +
              'px'
          )
          .attr('x', function () {
            return d.x + 10 + 'px';
          });

        tooltip.select('rect').attr('width', () => {
          return tooltipWidth + 20;
        });

        const diff =
          d.x +
          tooltipWidth +
          20 -
          (this.width + this.margin.left + this.margin.right);

        if (diff > 0) {
          tooltip.select('rect').attr('x', d.x - diff - 20 + 'px');
          tooltip.selectAll('text').attr('x', d.x - diff - 10);
        }
      })
      .on('mouseleave', (d) => {
        tooltip.select('rect').remove();
        tooltip.selectAll('text').remove();
      });

    g.append('text')
      .attr('y', (d) => d.y + 20 + this.deviceSize + 'px')
      .attr('font-size', '16px')
      .attr('font-weight', '500')
      .style('fill', 'green')
      .text((d) => {
        return d.name;
      })
      .attr('x', function (d) {
        return (
          d.x -
          this.getBoundingClientRect().width / 2 +
          this.getBoundingClientRect().width / 2 / 2 +
          'px'
        );
      });
  }
}

export const IDs = {
  CUCP: 'cucpid',
  CUUP: 'cuupid',
  DU: 'duid',
  CELL: 'cellId',
};
