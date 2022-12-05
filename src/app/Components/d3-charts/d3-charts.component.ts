import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-charts',
  templateUrl: './d3-charts.component.html',
  styleUrls: ['./d3-charts.component.scss'],
})
export class D3ChartsComponent implements OnInit {
  data: any = [];
  pdata: any;
  link: any;
  node: any;
  margin = { top: 10, right: 30, bottom: 30, left: 40 };
  width = 400 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;

  constructor() {
    this.data = d3.json('../../../assets/SampleJson/Nodes1.json');
  }

  ngOnInit(): void {
    Promise.all([this.data]).then((d) => {
      console.log(d);
      // debugger;
      this.pdata = d;
      // Let's list the force we wanna apply on the network

      var svg = d3
        .select('#my_dataviz')
        .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr(
          'transform',
          'translate(' + this.margin.left + ',' + this.margin.top + ')'
        );

      this.link = svg
        .selectAll('line')
        .data(d[0].links)
        .enter()
        .append('line')
        .style('stroke', 'red');

      this.node = svg
        .selectAll('circle')
        .data(d[0].nodes)
        .enter()
        .append('circle')
        .attr('r', 20)
        .style('fill', '#69b3a2');

      var simulation = d3
        .forceSimulation(d[0].nodes) // Force algorithm is applied to data.nodes
        .force(
          'link',
          d3
            .forceLink() // This force provides links between nodes
            .id((e: any) => e.id) // This provide  the id of a node
            .links(d[0].links) // and this the list of links
        )
        .force('charge', d3.forceManyBody().strength(-450)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force('center', d3.forceCenter(this.width / 2, this.height / 2)) // This force attracts nodes to the center of the svg area
        .on('end', ticked);
    });

    const ticked = () => {
      this.link
        .attr('x1', function (dd: any) {
          return dd.source.x;
        })
        .attr('y1', function (dd: any) {
          return dd.source.y;
        })
        .attr('x2', function (dd: any) {
          return dd.target.x;
        })
        .attr('y2', function (dd: any) {
          return dd.target.y;
        });

      this.node
        .attr('cx', function (dd: any) {
          return dd.x + 6;
        })
        .attr('cy', function (dd: any) {
          return dd.y - 6;
        });
    };
  }
}
