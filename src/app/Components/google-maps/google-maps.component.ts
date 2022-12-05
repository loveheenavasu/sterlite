import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { CommonModelComponent } from '../common-model/common-model.component';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})

// export class GoogleMapsComponent implements OnInit {
//   modalRef!: BsModalRef;
//   topologyArr: any;

//   links: Array<any> = [];
//   nodes: Array<any> = [];

//   cucpDevice: boolean = false;
//   cuupDevice: boolean = false;
//   duDevice: boolean = false;

//   cucpArr: any[] = [];
//   cuupArr: any[] = [];
//   duArr: any[] = [];

//   cucpCells: boolean = false;
//   cuupCells: boolean = false;
//   duCells: boolean = false;

//   cucpCellsArr: any[] = [];
//   cuupCellsArr: any[] = [];
//   duCellsArr: any[][] = [];

//   zoomValue: number = 5;

//   // duSize: number = 64;
//   // CuupAndCucpSize: number = 64;
//   // cellsSize: number = 48;

//   duSize: number = 64/2;
//   CuupAndCucpSize: number = 64/2;
//   cellsSize: number = 48/2;

//   colorsUsed: string[] = [];
//   mapLat: number = 0;
//   mapLng: number = 0;

//   labelFontSize = this.zoomValue + 'px';

//   // gooooooooooooooo
//   // address = 'delhi';
//   // location: any = '';
//   // loading: boolean = false;

//   constructor(
//     private dashSer: DashboardService,
//     private modalService: BsModalService,
//     private nodeModal: BsModalRef,
//     private route: ActivatedRoute,
//     private ref: ChangeDetectorRef
//   ) {
//     route.queryParams.subscribe((params) => {
//       if ('latitude' in params && 'longitude' in params) {
//         this.mapLat = Number(params['latitude']);
//         this.zoomValue = 22;
//         this.mapLng = Number(params['longitude']);
//       } else if ('deviceName' in params) {
//         const node = this.nodes.find(
//           (_node) => _node.name === params['deviceName']
//         );
//         if (!node) {
//           if (this.nodes?.length !== 0) {
//             alert(`Device not found`);
//           }
//         } else {
//           // console.log(node);
//           this.mapLat = Number(node.attributes.latitude);
//           this.mapLng = Number(node.attributes.longitude);
//           this.zoomValue = 22;
//         }
//       }
//     });
//   }

//   ngOnInit(): void {
//     this.dashSer.getData().subscribe(
//       (res: any) => {
//         this.topologyArr = res;

//         //For DU's,CUCP's,CUUP's
//         for (let i = 0; i < this.topologyArr.topology.length; i++) {
//           if (this.topologyArr.topology[i].device.type === 'cucp') {
//             this.cucpArr.push(this.topologyArr.topology[i].device);
//             this.cucpDevice = true;

//             // For Cells
//             if (
//               this.topologyArr.topology[i].device.attributes.cells &&
//               this.topologyArr.topology[i].device.attributes.cells?.length != 0
//             ) {
//               this.cucpCellsArr =
//                 this.topologyArr.topology[i].device.attributes.cells;
//               this.cucpCells = true;
//             }
//           } else if (this.topologyArr.topology[i].device.type === 'du') {
//             this.duArr.push(this.topologyArr.topology[i].device);
//             this.duDevice = true;

//             // For Cells
//             if (
//               this.topologyArr.topology[i].device.attributes.cells &&
//               this.topologyArr.topology[i].device.attributes.cells?.length != 0
//             ) {
//               this.duCellsArr.push(
//                 this.topologyArr.topology[i].device.attributes.cells
//               );
//               this.topologyArr.topology[i].device.attributes.cells;
//               this.duCells = true;
//             }
//           } else {
//             this.cuupArr.push(this.topologyArr.topology[i].device);
//             this.cuupDevice = true;

//             //For Cells
//             if (
//               this.topologyArr.topology[i].device.attributes.cells &&
//               this.topologyArr.topology[i].device.attributes.cells?.length != 0
//             ) {
//               this.cuupCellsArr =
//                 this.topologyArr.topology[i].device.attributes.cells;
//               this.cuupCells = true;
//             }
//           }
//         }

//         this.setNodesAndLinks();
//       },
//       (err) => {
//         console.log('Topology Error Response --->', err);
//         console.log('Error --->', err.message);
//       }
//     );

//     // gooooooooooooooooooo
//     // this.showLocation();
//   }

//   // showLocation() {
//   //   this.addressToCoordinates();
//   // }

//   // addressToCoordinates() {
//   //   this.loading = true;
//   //   this.geocodeService
//   //     .geocodeAddress(this.address)
//   //     .subscribe((location: any) => {
//   //       this.location = location;
//   //       this.loading = false;
//   //       this.ref.detectChanges();
//   //     });
//   // }

//   setNodesAndLinks() {
//     for (let i: number = 0; i < this.duArr.length; i++) {
//       const lat = this.duArr[i].attributes.latitude;
//       const lng = this.duArr[i].attributes.longitude;

//       const linkColor = generateRandomColor(this.colorsUsed);
//       this.colorsUsed.push(linkColor);

//       this.nodes.push({
//         id: parseInt(this.duArr[i].attributes.duid),
//         name: this.duArr[i].attributes.duname,
//         label: {
//           text: this.duArr[i].attributes.duname,
//           color: 'white',
//           fontSize: '14px',
//         },
//         image: {
//           labelOrigin: { x: this.duSize / 2, y: this.duSize + 16 },
//           url: '../../../assets/Images/DU.png',
//           scaledSize: {
//             width: this.duSize,
//             height: this.duSize,
//           },
//         },
//         attributes: {
//           ...this.duArr[i].attributes,
//           latitude: lat,
//           longitude: lng,
//         },
//         type: this.duArr[i].type,
//       });

//       this.links.push({
//         source: {
//           id: parseInt(this.duArr[i].attributes.duid),
//           lat,
//           lng,
//           type: this.duArr[i].type,
//         },
//         target: {
//           id: parseInt(this.duArr[i].attributes.gnbId),
//         },
//         color: 'orange',
//       });

//       for (let j: number = 0; j < this.duArr[i].attributes.cuups.length; j++) {
//         this.links.push({
//           source: {
//             id: parseInt(this.duArr[i].attributes.duid),
//             lat,
//             lng,
//             type: this.duArr[i].type,
//           },
//           target: { id: parseInt(this.duArr[i].attributes.cuups[j]) },
//           color: 'orange',
//         });
//       }

//       for (let k: number = 0; k < this.duArr[i].attributes.cells.length; k++) {
//         this.links.push({
//           source: {
//             id: parseInt(this.duArr[i].attributes.duid),
//             lat,
//             lng,
//             type: this.duArr[i].type,
//           },
//           target: { id: parseInt(this.duArr[i].attributes.cells[k].cellId) },
//           color: linkColor,
//         });
//       }
//     }

//     for (let i: number = 0; i < this.cuupArr.length; i++) {
//       const _lat = this.cuupArr[i].attributes.latitude;
//       const _lng = this.cuupArr[i].attributes.longitude;

//       this.nodes.push({
//         id: parseInt(this.cuupArr[i].attributes.cuupid),
//         name: 'CUUP_' + (i + 1),
//         label: {
//           text: 'CUUP_' + (i + 1),
//           color: 'white',
//           fontSize: '14px',
//         },
//         image: {
//           labelOrigin: {
//             x: this.CuupAndCucpSize / 2,
//             y: this.CuupAndCucpSize + 16,
//           },
//           url: '../../../assets/Images/CUUP.png',
//           scaledSize: {
//             width: this.CuupAndCucpSize,
//             height: this.CuupAndCucpSize,
//           },
//         },
//         attributes: {
//           ...this.cuupArr[i].attributes,
//           latitude: _lat,
//           longitude: _lng,
//         },
//         type: this.cuupArr[i].type,
//       });

//       this.links.push({
//         source: {
//           id: parseInt(this.cuupArr[i].attributes.cuupid),
//           lat: _lat,
//           lng: _lng,
//           type: this.cuupArr[i].type,
//         },
//         target: {
//           id: parseInt(this.cuupArr[i].attributes.gnbId),
//         },
//         color: 'orange',
//       });
//     }

//     for (let i: number = 0; i < this.cucpArr.length; i++) {
//       const __lat = this.cucpArr[i].attributes.latitude;
//       const __lng = this.cucpArr[i].attributes.longitude;

//       this.nodes.push({
//         id: parseInt(this.cucpArr[i].attributes.cucpid),
//         name: this.cucpArr[i].attributes.cucpname,
//         label: {
//           text: this.cucpArr[i].attributes.cucpname,
//           color: 'white',
//           fontSize: '14px',
//         },
//         image: {
//           labelOrigin: {
//             x: this.CuupAndCucpSize / 2,
//             y: this.CuupAndCucpSize + 16,
//           },
//           url: '../../../assets/Images/CUCP.png',
//           scaledSize: {
//             width: this.CuupAndCucpSize,
//             height: this.CuupAndCucpSize,
//           },
//         },
//         attributes: {
//           ...this.cucpArr[i].attributes,
//           latitude: __lat,
//           longitude: __lng,
//         },
//         type: this.cucpArr[i].type,
//       });

//       for (
//         let j: number = 0;
//         j < this.cucpArr[i].attributes.xnConnections.length;
//         j++
//       ) {
//         this.links.push({
//           source: {
//             id: parseInt(this.cucpArr[i].attributes.cucpid),
//             lat: __lat,
//             lng: __lng,
//             type: this.cucpArr[i].type,
//           },
//           target: {
//             id: parseInt(this.cucpArr[i].attributes.xnConnections[j]),
//           },
//           color: 'orange',
//         });
//       }
//     }

//     for (let i: number = 0; i < this.duCellsArr.length; i++) {
//       const cells = this.duCellsArr[i];

//       const linkColor = generateRandomColor(this.colorsUsed);

//       this.colorsUsed.push(linkColor);

//       for (let j = 0; j < cells.length; j++) {
//         const ___lat = cells[j].latitude;
//         const ___lng = cells[j].longitude;

//         this.nodes.push({
//           id: parseInt(cells[j].cellId),
//           name: cells[j].cellName,
//           label: {
//             text: cells[j].cellName,
//             color: 'white',
//             fontSize: '10px',
//           },
//           image: {
//             labelOrigin: { x: this.cellsSize / 2, y: this.cellsSize + 16 },
//             url: '../../../assets/Images/Tower.png',
//             scaledSize: {
//               width: this.cellsSize,
//               height: this.cellsSize,
//             },
//           },
//           attributes: { ...cells[j], latitude: ___lat, longitude: ___lng },
//           type: 'cell',
//         });

//         for (let k: number = 0; k < cells[j].neighbours.length; k++) {
//           this.links.push({
//             source: {
//               id: parseInt(cells[j].cellId),
//               lat: ___lat,
//               lng: ___lng,
//               type: 'cell',
//             },
//             target: {
//               id: parseInt(cells[j].neighbours[k].cellId),
//             },
//             color: linkColor,
//           });
//         }
//       }
//     }

//     this.links = this.links?.map((link) => {
//       const node = this.nodes.find((_node) => _node.id === link.target.id);
//       return {
//         ...link,
//         source: {
//           ...link.source,
//           lat: Number(link.source.lat),
//           lng: Number(link.source.lng),
//         },
//         target: {
//           ...link.target,
//           lat: Number(node.attributes.latitude),
//           lng: Number(node.attributes.longitude),
//           type: node?.type,
//         },
//       };
//     });
//   }

//   nodeDetailsPopup(node: any) {
//     const config: ModalOptions = {
//       initialState: node,
//       backdrop: 'static',
//       // class: 'modal-xl modal-dialog-centered',
//       class: 'modal-dialog-centered',
//       keyboard: false,
//     };
//     this.nodeModal = this.modalService.show(CommonModelComponent, config);
//     this.nodeModal.content.closeBtnName = 'Close';
//   }

//   onMarkerClick(node: any) {
//     this.nodeDetailsPopup(node);
//   }

//   onMouseOver(infoWindow: any, $event: any) {
//     infoWindow.open();
//   }

//   onMouseOut(infoWindow: any, $event: any) {
//     infoWindow.close();
//   }

//   onZoomChange(newZoomValue: number) {
//     this.zoomValue = newZoomValue;
//     // console.log(this.nodes);

//     this.handleImageAndTextSize();
//   }

//   handleImageAndTextSize() {
//     const updatedNodes = [];

//     const size = 5 * this.zoomValue || 5;

//     for (let i = 0; i < this.nodes.length; i++) {
//       const label = {
//         ...this.nodes[i].label,
//         fontSize: this.zoomValue * 2 + 'px',
//       };
//       const image = {
//         ...this.nodes[i].image,
//         labelOrigin: { x: size / 2, y: size + 16 },
//         scaledSize: { height: size, width: size },
//         // scaledSize: { height: size /2 , width: size /2 },
//       };

//       updatedNodes.push({
//         ...this.nodes[i],
//         label,
//         image,
//       });
//     }

//     this.nodes = updatedNodes;
//   }

//   lineWidth: number = 2;
// }
export class GoogleMapsComponent implements OnInit {
  modalRef!: BsModalRef;
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

  zoomValue: number = 5;

  colorsUsed: string[] = [];
  mapLat: number = 0;
  mapLng: number = 0;

  labelFontSize = getFontSieBasedOnZoom(this.zoomValue);

  // gooooooooooooooo
  // address = 'delhi';
  // location: any = '';
  // loading: boolean = false;

  constructor(
    private dashSer: DashboardService,
    private modalService: BsModalService,
    private nodeModal: BsModalRef,
    private route: ActivatedRoute // gooooooooooooo // private ref: ChangeDetectorRef, // private geocodeService: GeocodeService
  ) {
    route.queryParams.subscribe((params) => {
      if ('latitude' in params && 'longitude' in params) {
        this.mapLat = Number(params['latitude']);
        this.zoomValue = 22;
        this.mapLng = Number(params['longitude']);
      } else if ('deviceName' in params) {
        const node = this.nodes.find(
          (_node) =>
            _node.name.toLowerCase() === params['deviceName'].toLowerCase()
        );
        if (!node) {
          if (this.nodes?.length !== 0) {
            // alert(`Device not found`);
            alert(`Not found`);
          }
        } else {
          // console.log(node);
          this.mapLat = Number(node.attributes.latitude);
          this.mapLng = Number(node.attributes.longitude);
          this.zoomValue = 22;
        }
      }
    });
  }

  ngOnInit(): void {
    this.dashSer.getData().subscribe(
      (res: any) => {
        console.log(res);
        this.topologyArr = res;
        // this.topologyArr = res.hits.hits[0]._source;
        console.log(this.topologyArr);

        //For DU's,CUCP's,CUUP's

        for (let i = 0; i < this.topologyArr.topology.length; i++) {
          // debugger
          if (this.topologyArr.topology[i].device.type === 'cucp') {
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
          } else if (this.topologyArr.topology[i].device.type === 'du') {
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

        this.setNodesAndLinks();
      },
      (err) => {
        console.log('Topology Error Response --->', err);
        console.log('Error --->', err.message);
      }
    );

    // gooooooooooooooooooo
    // this.showLocation();
  }

  // showLocation() {
  //   this.addressToCoordinates();
  // }

  // addressToCoordinates() {
  //   this.loading = true;
  //   this.geocodeService
  //     .geocodeAddress(this.address)
  //     .subscribe((location: any) => {
  //       this.location = location;
  //       this.loading = false;
  //       this.ref.detectChanges();
  //     });
  // }

  setNodesAndLinks() {
    for (let i: number = 0; i < this.duArr.length; i++) {
      const lat = this.duArr[i].attributes.latitude;
      const lng = this.duArr[i].attributes.longitude;

      const linkColor = generateRandomColor(this.colorsUsed);
      this.colorsUsed.push(linkColor);

      console.log(getFontSieBasedOnZoom(this.zoomValue));

      this.nodes.push({
        id: parseInt(this.duArr[i].attributes.duid),
        name: this.duArr[i].attributes.duname,
        label: {
          text: this.duArr[i].attributes.duname,
          color: 'white',
          fontSize: getFontSieBasedOnZoom(this.zoomValue),
        },
        image: {
          labelOrigin: getLabelOriginBasedOnZoomValue(this.zoomValue),
          url: '../../../assets/Images/DU.png',
          scaledSize: getScaledSizeBasedOnoomValue(this.zoomValue),
        },
        attributes: {
          ...this.duArr[i].attributes,
          latitude: lat,
          longitude: lng,
        },
        type: this.duArr[i].type,
      });

      this.links.push({
        source: {
          id: parseInt(this.duArr[i].attributes.duid),
          lat,
          lng,
          type: this.duArr[i].type,
        },
        target: {
          id: parseInt(this.duArr[i].attributes.gnbId),
        },
        color: 'orange',
      });

      for (let j: number = 0; j < this.duArr[i].attributes.cuups.length; j++) {
        this.links.push({
          source: {
            id: parseInt(this.duArr[i].attributes.duid),
            lat,
            lng,
            type: this.duArr[i].type,
          },
          target: { id: parseInt(this.duArr[i].attributes.cuups[j]) },
          color: 'orange',
        });
      }

      for (let k: number = 0; k < this.duArr[i].attributes.cells.length; k++) {
        this.links.push({
          source: {
            id: parseInt(this.duArr[i].attributes.duid),
            lat,
            lng,
            type: this.duArr[i].type,
          },
          target: { id: parseInt(this.duArr[i].attributes.cells[k].cellId) },
          color: linkColor,
        });
      }
    }

    for (let i: number = 0; i < this.cuupArr.length; i++) {
      const _lat = this.cuupArr[i].attributes.latitude;
      const _lng = this.cuupArr[i].attributes.longitude;

      // const size = getNodeSieBasedOnZoom(this.zoomValue);

      this.nodes.push({
        id: parseInt(this.cuupArr[i].attributes.cuupid),
        name: 'CUUP_' + (i + 1),
        label: {
          text: 'CUUP_' + (i + 1),
          color: 'white',
          fontSize: getFontSieBasedOnZoom(this.zoomValue),
        },
        image: {
          labelOrigin: getLabelOriginBasedOnZoomValue(this.zoomValue),
          url: '../../../assets/Images/CUUP.png',
          scaledSize: getScaledSizeBasedOnoomValue(this.zoomValue),
        },
        attributes: {
          ...this.cuupArr[i].attributes,
          latitude: _lat,
          longitude: _lng,
        },
        type: this.cuupArr[i].type,
      });

      this.links.push({
        source: {
          id: parseInt(this.cuupArr[i].attributes.cuupid),
          lat: _lat,
          lng: _lng,
          type: this.cuupArr[i].type,
        },
        target: {
          id: parseInt(this.cuupArr[i].attributes.gnbId),
        },
        color: 'orange',
      });
    }

    for (let i: number = 0; i < this.cucpArr.length; i++) {
      const __lat = this.cucpArr[i].attributes.latitude;
      const __lng = this.cucpArr[i].attributes.longitude;

      this.nodes.push({
        id: parseInt(this.cucpArr[i].attributes.cucpid),
        name: this.cucpArr[i].attributes.cucpname,
        label: {
          text: this.cucpArr[i].attributes.cucpname,
          color: 'white',
          fontSize: getFontSieBasedOnZoom(this.zoomValue),
        },
        image: {
          labelOrigin: getLabelOriginBasedOnZoomValue(this.zoomValue),
          url: '../../../assets/Images/CUCP.png',
          scaledSize: getScaledSizeBasedOnoomValue(this.zoomValue),
        },
        attributes: {
          ...this.cucpArr[i].attributes,
          latitude: __lat,
          longitude: __lng,
        },
        type: this.cucpArr[i].type,
      });

      for (
        let j: number = 0;
        j < this.cucpArr[i].attributes.xnConnections.length;
        j++
      ) {
        this.links.push({
          source: {
            id: parseInt(this.cucpArr[i].attributes.cucpid),
            lat: __lat,
            lng: __lng,
            type: this.cucpArr[i].type,
          },
          target: {
            id: parseInt(this.cucpArr[i].attributes.xnConnections[j]),
          },
          color: 'orange',
        });
      }
    }

    for (let i: number = 0; i < this.duCellsArr.length; i++) {
      const cells = this.duCellsArr[i];

      const linkColor = generateRandomColor(this.colorsUsed);

      this.colorsUsed.push(linkColor);

      for (let j = 0; j < cells.length; j++) {
        const ___lat = cells[j].latitude;
        const ___lng = cells[j].longitude;

        this.nodes.push({
          id: parseInt(cells[j].cellId),
          name: cells[j].cellName,
          label: {
            text: cells[j].cellName,
            color: 'white',
          },
          image: {
            labelOrigin: getLabelOriginBasedOnZoomValue(this.zoomValue),
            url: '../../../assets/Images/Tower.png',
            scaledSize: getScaledSizeBasedOnoomValue(this.zoomValue),
          },
          attributes: { ...cells[j], latitude: ___lat, longitude: ___lng },
          type: 'cell',
        });

        for (let k: number = 0; k < cells[j].neighbours.length; k++) {
          this.links.push({
            source: {
              id: parseInt(cells[j].cellId),
              lat: ___lat,
              lng: ___lng,
              type: 'cell',
            },
            target: {
              id: parseInt(cells[j].neighbours[k].cellId),
            },
            color: linkColor,
          });
        }
      }
    }

    this.links = this.links?.map((link) => {
      const node = this.nodes.find((_node) => _node.id === link.target.id);
      return {
        ...link,
        source: {
          ...link.source,
          lat: Number(link.source.lat),
          lng: Number(link.source.lng),
        },
        target: {
          ...link.target,
          lat: Number(node.attributes.latitude),
          lng: Number(node.attributes.longitude),
          type: node?.type,
        },
      };
    });
  }

  nodeDetailsPopup(node: any) {
    const config: ModalOptions = {
      initialState: node,
      backdrop: 'static',
      // class: 'modal-xl modal-dialog-centered',
      class: 'modal-dialog-centered',
      keyboard: false,
    };
    this.nodeModal = this.modalService.show(CommonModelComponent, config);
    this.nodeModal.content.closeBtnName = 'Close';
  }

  onMarkerClick(node: any) {
    this.nodeDetailsPopup(node);
  }

  onMouseOver(infoWindow: any, $event: any) {
    infoWindow.open();
  }

  onMouseOut(infoWindow: any, $event: any) {
    infoWindow.close();
  }

  onZoomChange(newZoomValue: number) {
    this.zoomValue = newZoomValue;
    // console.log(this.nodes);
    console.log(this.nodes[3].image.scaledSize);

    this.handleImageAndTextSize();
  }

  handleImageAndTextSize() {
    const updatedNodes = [];

    for (let i = 0; i < this.nodes.length; i++) {
      const label = {
        ...this.nodes[i].label,
        fontSize: getFontSieBasedOnZoom(this.zoomValue),
      };
      const image = {
        ...this.nodes[i].image,
        labelOrigin: getLabelOriginBasedOnZoomValue(this.zoomValue),
        scaledSize: getScaledSizeBasedOnoomValue(this.zoomValue),
      };

      updatedNodes.push({
        ...this.nodes[i],
        label,
        image,
      });
    }

    this.nodes = updatedNodes;
  }

  lineWidth: number = 1;
}

function generateRandomColor(colorsUsed: string[]) {
  // debugger
  let color: string = getBrightColor();

  if (colorsUsed.length === 0) {
    return color;
  }

  while (colorsUsed.includes(color)) {
    color = getBrightColor();
  }

  return color;
}

function getBrightColor() {
  // debugger
  const color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
  return color;
}

function getFontSieBasedOnZoom(zoom: number) {
  return zoom * 1.3 + 'px';
}

function getLabelOriginBasedOnZoomValue(zoom: number) {
  const size = 5 * zoom || 5;

  return { x: size / 2, y: size + 16 };
}

function getScaledSizeBasedOnoomValue(zoom: number) {
  const size = 5 * zoom || 5;

  return {
    width: size,
    height: size,
  };
}

/**
 * This method is just for testing purpose.
 * Once we have correct latitudes and longitudes we can remove the usage of this function.
 *
 * @param location
 * @returns
 */
function getUpdatedLocation(location: string): number {
  // return Number(location);
  let locationInNumber = Number(location);

  const randomIndex = Math.floor(Math.random() * 2); // 0 for minus, 1 for plus ;
  console.log(Math.random() * 2);

  if (randomIndex === 0) {
    locationInNumber -= Math.random();
  } else {
    locationInNumber += Math.random();
  }

  return locationInNumber;
}
