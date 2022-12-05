import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/Services/dashboard.service';
// import { Links, Nodes } from '../NodesModel';
import * as d3 from 'd3';
import { CommonModelComponent } from '../common-model/common-model.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

// export class DashboardComponent implements OnInit {

//   modalRef!   : BsModalRef;
//   topologyArr : any;

//   links : Array<any> = [];
//   nodes : Array<any> = [];

//   // cucpDevice : boolean = false;
//   // cuupDevice : boolean = false;
//   // duDevice   : boolean = false;

//   cucpArr : any[] = [];
//   cuupArr : any[] = [];
//   duArr   : any[] = [];

//   // cucpCells : boolean = false;
//   // cuupCells : boolean = false;
//   // duCells   : boolean = false;

//   cucpCellsArr : any[] = [];
//   cuupCellsArr : any[] = [];
//   duCellsArr   : any[] = [];

//   /**
//    * Chart related properties
//    */
//   data  : any = [];
//   link  : any;
//   node  : any;

//   margin  = {top: 10, right: 30, bottom: 30, left: 20};
//   width   = 400 - this.margin.left - this.margin.right;
//   height  = 400 - this.margin.top - this.margin.bottom;

//   constructor(private dashSer : DashboardService,private modalService: BsModalService, private nodeModal: BsModalRef) {

//   }

//   ngOnInit(): void {
//     this.dashSer.getData().subscribe((res : any) => {
//       this.topologyArr = res;
//       console.log('topology--->',this.topologyArr);

//       //For DU's,CUCP's,CUUP's
//       for(let i = 0; i < this.topologyArr.topology.length;i++) {
//         if(this.topologyArr.topology[i].device.type ==='cucp') {
//           this.cucpArr.push(this.topologyArr.topology[i].device);

//           // For Cells
//           if((this.topologyArr.topology[i].device.attributes.cells) && this.topologyArr.topology[i].device.attributes.cells?.length !=0) {
//             this.cucpCellsArr =  this.topologyArr.topology[i].device.attributes.cells;
//             console.log('cucp cells--->',this.cucpCellsArr);
//           }
//         }
//         else if(this.topologyArr.topology[i].device.type ==='du') {
//           this.duArr.push(this.topologyArr.topology[i].device);

//           // For Cells
//           if(this.topologyArr.topology[i].device.attributes.cells && this.topologyArr.topology[i].device.attributes.cells?.length != 0) {
//               this.duCellsArr =  this.topologyArr.topology[i].device.attributes.cells;
//               console.log('du cells--->',this.duCellsArr);
//           }
//         }
//         else {
//           this.cuupArr.push(this.topologyArr.topology[i].device);

//           //For Cells
//           if(this.topologyArr.topology[i].device.attributes.cells &&  this.topologyArr.topology[i].device.attributes.cells?.length != 0) {
//               this.cuupCellsArr =  this.topologyArr.topology[i].device.attributes.cells;
//               console.log('cuup cells--->',this.cuupCellsArr);
//           }
//         }
//       }
//       this.setNodeLinks();
//      })
//   }

//   setNodeLinks() {
//       for(let i: number = 0; i < this.duArr.length; i++) {
//           this.nodes.push({id: parseInt(this.duArr[i].attributes.duid), name: this.duArr[i].attributes.duname, image: '../../../assets/Images/DU.png',Attributes: this.duArr[i].attributes});
//           this.links.push({source: parseInt(this.duArr[i].attributes.duid), target: parseInt(this.duArr[i].attributes.gnbId)});

//           for(let j: number = 0; j < this.duArr[i].attributes.cuups.length; j++) {
//             this.links.push({source: parseInt(this.duArr[i].attributes.duid), target: parseInt(this.duArr[i].attributes.cuups[j])});
//           }

//           for(let k: number = 0; k < this.duArr[i].attributes.cells.length; k++) {
//             this.links.push({source: parseInt(this.duArr[i].attributes.duid), target: parseInt(this.duArr[i].attributes.cells[k].cellId)});
//           }
//       }

//       for(let i: number = 0; i < this.cuupArr.length; i++) {
//           this.nodes.push({id: parseInt(this.cuupArr[i].attributes.cuupid), name: 'CUUP_' + i,image: '../../../assets/Images/CUUP.png',Attributes: this.cuupArr[i].attributes});
//           this.links.push({source: parseInt(this.cuupArr[i].attributes.cuupid), target: parseInt(this.cuupArr[i].attributes.gnbId)});
//         }

//       for(let i: number = 0; i < this.cucpArr.length; i++) {
//           this.nodes.push({id: parseInt(this.cucpArr[i].attributes.cucpid), name: this.cucpArr[i].attributes.cucpname,image: '../../../assets/Images/CUCP.png',Attributes: this.cucpArr[i].attributes});

//           for(let j: number = 0; j < this.cucpArr[i].attributes.xnConnections.length; j++) {
//             this.links.push({source: parseInt(this.cucpArr[i].attributes.cucpid), target: parseInt(this.cucpArr[i].attributes.xnConnections[j])});
//           }
//       }

//       for(let i: number = 0; i < this.duCellsArr.length; i++) {
//         this.nodes.push({id: parseInt(this.duCellsArr[i].cellId), name: this.duCellsArr[i].cellName,image: '../../../assets/Images/Tower.png',Attributes: this.duCellsArr[i]});

//         for(let j: number = 0; j < this.duCellsArr[i].neighbours.length; j++) {
//           this.links.push({source: parseInt(this.duCellsArr[i].cellId), target: parseInt(this.duCellsArr[i].neighbours[j].cellId)});
//         }

//       }
//       console.log('Nodes --->',this.nodes);
//       console.log('Links --->',this.links);
//       this.generateChart();
//   }

//   generateChart() {
//     const ticked = () =>{
//       this.link
//       .attr("x1", function(dd: any) { return dd.source.x; })
//       .attr("y1", function(dd: any) { return dd.source.y; })
//       .attr("x2", function(dd: any) { return dd.target.x; })
//       .attr("y2", function(dd: any) { return dd.target.y; });

//       this.node.attr("transform", function(d: any) {
//         return "translate(" + d.x + "," + d.y + ")";
//     });
//     }

//       var svg = d3.select("#my_dataviz")
//       .append("svg")
//         .attr("width", this.width + this.margin.left + this.margin.right)
//         .attr("height", this.height + this.margin.top + this.margin.bottom)
//         .append("g")
//         .attr("transform",
//               "translate(" + this.margin.left + "," + this.margin.top + ")");

//       var g = svg.append("g");
//       this.link = svg
//       .selectAll("line")
//       .data(this.links)
//       .enter()
//       .append("line")
//       .style("stroke", "#00BE4F")

//       // adds each node as a group
//     this.node = g.selectAll(".node")
//             .data(this.nodes)
//             .enter().append("g")
//             .append("image")
//             .attr("xlink:href", function(d) {
//               // console.log(d);
//               return d.image;
//             })
//             .attr("width", "30px")
//             .attr("height", "30px")
//             .on( "click",  this.nodeDetailsPopup.bind(this))

//             // https://www.seekpng.com/png/full/2-20321_clouds-clipart-for-kid-png-cloud-clipart.png

//       var simulation = d3.forceSimulation(this.nodes)                 // Force algorithm is applied to data.nodes
//       .force("link", d3.forceLink()
//             .distance(30)                                   // This force provides links between nodes
//             .id((e: any) => e.id )                                    // This provide  the id of a node
//             .links(this.links)                                        // and this the list of links
//       )
//       .force("charge", d3.forceManyBody().strength(-450))             // This adds repulsion between nodes. Play with the -400 for the repulsion strength
//       .force("center", d3.forceCenter(this.width / 2, this.height / 2))     // This force attracts nodes to the center of the svg area
//       .on("end", ticked);

//   }

//   nodeDetailsPopup(node: any) {
//     console.log(node);
//     const config: ModalOptions = {
//       initialState: node,
//       backdrop: 'static',
//       // class: 'modal-xl modal-dialog-centered',
//       class: 'modal-dialog-centered',
//       keyboard: false
//     };
//     this.nodeModal = this.modalService.show( CommonModelComponent, config);
//     this.nodeModal.content.closeBtnName = 'Close';
//   }

//   setImage(): any {
//     this.nodes.forEach((node) => {
//       return node.image;
//     })
//   }

// }
export class DashboardComponent implements OnInit {
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

  constructor(
    private dashSer: DashboardService,
    private modalService: BsModalService,
    private nodeModal: BsModalRef
  ) {}

  ngOnInit(): void {
    this.dashSer.getData().subscribe((res: any) => {
      console.log(res);
      this.topologyArr = res;
      // this.topologyArr = res.hits.hits[0]._source;
      console.log(this.topologyArr);

      //For DU's,CUCP's,CUUP's
      for (let i = 0; i < this.topologyArr.topology.length; i++) {
        if (this.topologyArr.topology[i].device.type === 'cucp') {
          this.cucpArr.push(this.topologyArr.topology[i].device);
          this.cucpDevice = true;

          // For Cells
          // if (
          //   this.topologyArr.topology[i].device.attributes.cells &&
          //   this.topologyArr.topology[i].device.attributes.cells?.length != 0
          // ) {
          //   this.cucpCellsArr =
          //     this.topologyArr.topology[i].device.attributes.cells;
          //   this.cucpCells = true;
          // }
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
            // this.topologyArr.topology[i].device.attributes.cells;
            this.duCells = true;
          }
        } else {
          this.cuupArr.push(this.topologyArr.topology[i].device);
          this.cuupDevice = true;

          //For Cells
          // if (
          //   this.topologyArr.topology[i].device.attributes.cells &&
          //   this.topologyArr.topology[i].device.attributes.cells?.length != 0
          // ) {
          //   this.cuupCellsArr =
          //     this.topologyArr.topology[i].device.attributes.cells;
          //   this.cuupCells = true;
          // }
        }
      }
      // debugger

      // calculate width of svg based on the manimun number of devices
      const maxLenghtDevices = Math.max(
        this.duArr.length,
        this.cuupArr.length,
        this.cucpArr.length,
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

      // setting the heightHandler acc to the cells length
      if (this.duCellsArr.flat().length > 2) {
        this.heightHandler = d3
          .scaleBand()
          .domain(['Cs', 'DUs', 'FIRST_ROW_CELLs', 'SECOND_ROW_CELLs'])
          // .domain(['Cs', 'DUs', 'SECOND_ROW_CELLs'])
          .range([0, this.height]);
      } else {
        this.heightHandler = d3
          .scaleBand()
          .domain(['Cs', 'DUs', 'CELLs'])
          .range([0, this.height]);
      }
      this.width =
        Math.max(maxLenghtDevices * (this.deviceSize * 2), 400) * 0.9;
      this.setNodeLinks();
    });
  }

  setNodeLinks() {
    const cucpIDs = this.cucpArr.map((d) => d?.attributes?.cucpid).reverse();
    const cuupIDs = this.cuupArr.map((d) => d?.attributes?.cuupid);

    const cellsWidthSpacer = this.width / this.duCellsArr.flat().length / 2;

    const cuupAndCucpWidthSpacer =
      this.width / (cucpIDs.length + cuupIDs.length) / 2;

    const heightSpacer =
      this.height / (this.duCellsArr.flat().length > 2 ? 4 : 3) / 2;

    const duWidthSpacer = this.width / this.duArr.length / 2;

    console.log(this.duCellsArr.flat().map((d) => d.cellId + ''));
    console.log(
      this.duCellsArr.flat().map((d) => d.latitude + ',' + d.longitude)
    );
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

      // console.log('DU Array');
      // console.log('i --->'+i,this.duWidthHandler(this.duArr[i]?.attributes?.duid),this.heightHandler('DUs') as number);
      // console.log('x --->'+x,'y --->'+y);

      this.nodes.push({
        id: parseInt(this.duArr[i].attributes.duid),
        name: this.duArr[i].attributes.duname,
        image: '../../../assets/Images/DU.png',
        attributes: this.duArr[i].attributes,
        type: 'DUs',
        x,
        y,
      });

      this.links.push({
        source: {
          id: parseInt(this.duArr[i].attributes.duid),
          x,
          y,
          type: 'DUs',
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
            x,
            y,
            type: 'Cs',
          },
          target: { id: parseInt(this.duArr[i].attributes.cuups[j]) },
          color: 'orange',
        });
      }

      for (let k: number = 0; k < this.duArr[i].attributes.cells.length; k++) {
        this.links.push({
          source: {
            id: parseInt(this.duArr[i].attributes.duid),
            x,
            y,
            type: 'DUs',
          },
          target: { id: parseInt(this.duArr[i].attributes.cells[k].cellId) },
          color: 'red',
        });
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
        attributes: this.cuupArr[i].attributes,
        type: 'Cs',
        x,
        y,
      });
      this.links.push({
        source: {
          id: parseInt(this.cuupArr[i].attributes.cuupid),
          x,
          y,
          type: 'Cs',
        },
        target: {
          id: parseInt(this.cuupArr[i].attributes.gnbId),
        },
        color: 'orange',
      });
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
        attributes: this.cucpArr[i].attributes,
        type: 'Cs',
        x,
        y,
      });

      for (
        let j: number = 0;
        j < this.cucpArr[i].attributes.xnConnections.length;
        j++
      ) {
        this.links.push({
          source: {
            id: parseInt(this.cucpArr[i].attributes.cucpid),
            x,
            y,
            type: 'Cs',
          },
          target: {
            id: parseInt(this.cucpArr[i].attributes.xnConnections[j]),
          },
          color: 'orange',
        });
      }
    }

    // let firstRowAddition = true;
    let secondRowAddition = false;
    for (let i: number = 0; i < this.duCellsArr.length; i++) {
      const cells = this.duCellsArr[i];
      const cellsVerticalSpacer = heightSpacer / cells.length / 2;
      for (let j = 0; j < cells.length; j++) {
        const x = this.cellsWidthHandler(cells[j].cellId) + cellsWidthSpacer;
        let y = (this.heightHandler('CELLs') as number) + heightSpacer;

        let type = 'CELLs';

        // to make the cells move up and down a bit
        if (cells.length > 2) {
          if (j % 2 === 0) {
            type = 'SECOND_ROW_CELLs';
            y = (this.heightHandler(type) as number) + heightSpacer;

            y += secondRowAddition
              ? j * cellsVerticalSpacer
              : -j * cellsVerticalSpacer;

            secondRowAddition = !secondRowAddition;
          } else {
            type = 'SECOND_ROW_CELLs';
            y =
              (this.heightHandler(type) as number) +
              heightSpacer +
              (secondRowAddition
                ? (j / 2) * cellsVerticalSpacer
                : -(j / 2) * cellsVerticalSpacer);
            secondRowAddition = !secondRowAddition;
          }
          // y += i % 2 === 0 ? heightSpacer / 4 : -heightSpacer / 2;
        }

        this.nodes.push({
          id: parseInt(cells[j].cellId),
          name: cells[j].cellName,
          image: '../../../assets/Images/Tower.png',
          attributes: cells[j],
          type,
          x,
          y,
        });

        for (let k: number = 0; k < cells[j].neighbours.length; k++) {
          this.links.push({
            source: {
              id: parseInt(cells[j].cellId),
              x,
              y,
              type: 'CELLs',
            },
            target: {
              id: parseInt(cells[j].neighbours[k].cellId),
            },
            color: 'blue',
          });
        }
      }
    }

    this.links = this.links?.map((link) => {
      const node = this.nodes.find((_node) => _node.id === link.target.id);
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

    let cloudsArr: any[] = [];
    const CUUPsANSCUCPs: any[] = [];
    const DUs: any[] = [];

    this.nodes.forEach((node) => {
      if (node.type === 'Cs') {
        CUUPsANSCUCPs.push(node);
      } else if (node.type === 'DUs') {
        DUs.push(node);
      }
    });

    if (CUUPsANSCUCPs.length >= DUs.length) {
      cloudsArr = CUUPsANSCUCPs;
    } else {
      cloudsArr = DUs;
    }

    const xAxis = cloudsArr.map((cloud) => cloud.x).sort((a, b) => a - b);
    const extraCloudWidth = Math.min(duWidthSpacer, cuupAndCucpWidthSpacer) / 2;

    let firstCloud: any = {};
    let lastClound: any = {};

    xAxis.forEach((xPos, index) => {
      const upperCloud: any = {};
      const lowerCloud: any = {};

      const upperExtraCloud: any = {};
      const lowerExtraCloud: any = {};

      upperCloud.cx = xPos + 15;
      lowerCloud.cx = xPos + 15;

      upperCloud.cy = this.heightHandler('Cs') + heightSpacer + 15;
      lowerCloud.cy = this.heightHandler('DUs') + heightSpacer + 15;

      upperCloud.rx = extraCloudWidth * 2;
      lowerCloud.rx = extraCloudWidth * 2;

      upperCloud.ry = heightSpacer;
      lowerCloud.ry = heightSpacer;

      upperExtraCloud.cx = upperCloud.cx + extraCloudWidth * 2;
      lowerExtraCloud.cx = lowerCloud.cx + extraCloudWidth * 2;

      upperExtraCloud.cy = upperCloud.cy;
      lowerExtraCloud.cy = lowerCloud.cy;

      upperExtraCloud.rx = extraCloudWidth * 2;
      lowerExtraCloud.rx = extraCloudWidth * 2;

      upperExtraCloud.ry = upperCloud.ry;
      lowerExtraCloud.ry = lowerCloud.ry;

      if (Math.random() < 0.5) {
        upperExtraCloud.cy += 15;
        lowerExtraCloud.cy += 15;
      } else {
        upperExtraCloud.cx += extraCloudWidth / 4;
        lowerExtraCloud.cx += extraCloudWidth / 4;
      }

      if (index === 0) {
        firstCloud = { ...upperCloud };
        upperCloud.cx += upperCloud.rx / 6;
        upperCloud.rx -= upperCloud.rx / 6;
        upperCloud.cy += upperCloud.ry / 6;
        upperCloud.ry += upperCloud.ry / 6;

        lowerCloud.cx += lowerCloud.rx / 6;
        lowerCloud.rx -= lowerCloud.rx / 6;
        lowerCloud.cy -= lowerCloud.ry / 6;
        lowerCloud.ry += lowerCloud.ry / 6;
      }

      if (index === xAxis.length - 1) {
        lastClound = { ...lowerCloud };
        upperCloud.cx -= upperCloud.rx / 6;
        upperCloud.rx -= upperCloud.rx / 6;
        upperCloud.cy += upperCloud.ry / 6;
        upperCloud.ry += upperCloud.ry / 6;

        lowerCloud.cx -= lowerCloud.rx / 6;
        lowerCloud.rx -= lowerCloud.rx / 6;
        lowerCloud.cy -= lowerCloud.ry / 6;
        lowerCloud.ry += lowerCloud.ry / 6;
      }

      if (index === 0 || index === xAxis.length - 1) {
        if (this.duArr.length < 5) {
          this.cloudsArray.push(lowerCloud, upperCloud);
          // this.cloudsArray.push(upperCloud);
        }
      } else {
        this.cloudsArray.push(lowerCloud, upperCloud);
        // this.cloudsArray.push(upperCloud);
      }

      this.cloudsArray.push(
        ...(index < xAxis.length - 1 ? [upperExtraCloud, lowerExtraCloud] : [])
      );
    });

    this.cloudRect.x = firstCloud.cx;
    this.cloudRect.y = firstCloud.cy - this.deviceSize;

    this.cloudRect.width = lastClound.cx - this.cloudRect.x;

    this.cloudRect.height = lastClound.cy - this.cloudRect.y + this.deviceSize;

    if (this.duArr.length > 5) {
      const circularCloudFront: any = {};
      const circularCloudEnd: any = {};

      circularCloudFront.cx = this.cloudRect.x;
      circularCloudFront.cy = this.cloudRect.y + this.cloudRect.height / 2;

      circularCloudFront.rx = extraCloudWidth * 1.5;
      circularCloudFront.ry = this.cloudRect.height / 1.5;

      circularCloudEnd.cx = this.cloudRect.x + this.cloudRect.width;
      circularCloudEnd.cy = this.cloudRect.y + this.cloudRect.height / 2;

      circularCloudEnd.rx = extraCloudWidth * 1.5;
      circularCloudEnd.ry = this.cloudRect.height / 1.5;

      this.cloudsArray = [
        circularCloudFront,
        ...this.cloudsArray,
        circularCloudEnd,
      ];
    }
    this.generateChart();
  }

  generateChart() {
    // const ticked = () => {
    //   this.link
    //     .attr('x1', function (dd: any) {
    //       return dd.source.x;
    //     })
    //     .attr('y1', function (dd: any) {
    //       return dd.source.y;
    //     })
    //     .attr('x2', function (dd: any) {
    //       return dd.target.x;
    //     })
    //     .attr('y2', function (dd: any) {
    //       return dd.target.y;
    //     });

    //   this.node.attr('transform', function (d: any) {
    //     return 'translate(' + d.x + ',' + d.y + ')';
    //   });
    // };

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

    svg
      .selectAll('ellipse')
      .data(this.cloudsArray)
      .enter()
      .append('ellipse')
      .attr('cx', (d) => d.cx)
      .attr('cy', (d) => d.cy)
      .attr('rx', (d) => d.rx)
      .attr('ry', (d) => d.ry)
      .attr('fill', '#bddef1')
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.5);

    svg
      .append('rect')
      .attr('width', this.cloudRect.width)
      .attr('height', this.cloudRect.height)
      .attr('x', this.cloudRect.x)
      .attr('y', this.cloudRect.y)
      .attr('fill', '#bddef1');

    const links = this.links.map((link) => {
      return {
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
      };
    });

    links.forEach((link) => {
      svg
        .append('path')
        .attr('d', link.line)
        .attr('stroke', link.color)
        .attr('fill', 'none')
        .style('stroke-width', 0.7);
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
      .attr('y', (d) => d.y + 'px')
      .attr('x', (d) => d.x + 'px')
      .style('cursor', 'pointer')
      .on('click', this.nodeDetailsPopup.bind(this))
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

    svg
      .append('text')
      // .attr('x',this.cloudRect.x + (this.width * 0.2))
      .attr('x', this.cloudRect.x + this.width * 0.4) //for more DU'S
      .attr('y', this.cloudRect.y + (this.height * 0.05) / 4)
      .text('CLOUD')
      .style('fill', '#FC004B')
      .attr('font-size', '24px')
      .attr('font-weight', '500')
      .attr('text-decoration', 'underline');

    // if (this.duArr.length > 5)
    // .attr('height', function () {
    //   if (this.getBoundingClientRect().width > tooltipWidth) {
    //     tooltipWidth = this.getBoundingClientRect().width;
    //   }
    //   return tooltipWidth;
    // })

    // if (maxLenghtDevices > 3) {
    //   if (window.innerHeight >= 100 * maxLenghtDevices) {
    //     this.height = 100 * maxLenghtDevices;
    //   } else {
    //     this.height = window.innerHeight;
    //   }
    // }
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
}
