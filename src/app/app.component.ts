import { Component, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { ROOT, flatROOT } from './mock.data';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';
  private treeData;
  private marginVertical = {
    top: 40,
    right: 30,
    bottom: 50,
    left: 30
  };
  private marginHorizontal = {
    top: 20,
    right: 90,
    bottom: 30,
    left: 90
  };
  private width;
  private height;
  private treeMap;
  private nodes;
  private svg;
  private g;
  private i=0;

  ngOnInit() {  
    this.width = 660 - this.marginHorizontal.left - this.marginHorizontal.right;
    this.height = 500 - this.marginHorizontal.top - this.marginHorizontal.bottom;

    this.treeMap = d3.tree()
      .size([this.width, this.height]);
    
    this.loadData();

    this.svg = d3.select('body')
      .append('svg')
      .attr('width', this.width + this.marginHorizontal.left + this.marginHorizontal.right)
      .attr('height', this.height + this.marginHorizontal.top + this.marginHorizontal.bottom);
    
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.marginHorizontal.left + ',' + this.marginHorizontal.top + ')');

    this.update();
  }   

  //Data Loading Functions ------------------------------------------------------------------------------------------------------------------------------------------------

  loadData() {
    this.treeData = ROOT;
    this.nodes = d3.hierarchy(this.treeData, (d): any => d.children);
    this.nodes = this.treeMap(this.nodes);
  }

  loadFlatData() {
    this.treeData = d3.stratify()
      .id( (d: any) => d.name )
      .parentId( (d: any) => d.parent )
      (flatROOT);
    
    this.treeData.each( d => { 
      d.name = d.id;
      d.value = d.data.value;
      d.type = d.data.type;
      d.level = d.data.level;
      d.icon = d.data.icon;
    });

    this.nodes = d3.hierarchy(this.treeData, (d): any => d.children);
    this.nodes = this.treeMap(this.nodes);
  }

  //Data Loading Functions ------------------------------------------------------------------------------------------------------------------------------------------------  

  update() {
    const links = this.g.selectAll('link')
      .data(this.nodes.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .transition()
      .duration(1500)
      .style('stroke', d => d.data.level)
      .attr('d', d => this.drawLinksBezierHorizontal(d));

    const nodes = this.g.selectAll('g.node')
      .data(this.nodes.descendants(), (d) => {
        return d.id || (d.id = ++this.i);
      });

    const nodesEnter = nodes.enter()
      .append('g')
      .attr('class', d => {
        return 'node ' + (d.children ? 'node--internal' : 'node--leaf')
      })
      .attr('transform', d => this.nodesHorizontal(d));

    this.nodesCircles(nodesEnter);

    this.nodesTextDiplayHorizontal(nodesEnter);
  }

  //Nodes Styles Functions ------------------------------------------------------------------------------------------------------------------------------------------------
  
  nodesCircles(nodes) {
    nodes.append('circle')
      .transition()
      .duration(1500)
      .attr('r', d => d.data.value)
      .style('stroke', d => d.data.type)
      .style('fill', d => d.data.level);
  }

  nodesSymbols(nodes) {
    nodes.append('path')
      .style('stroke', d => d.data.type)
      .style('fill', d => d.data.level)
      .attr('d', d3.symbol()
        .size( d => d.data.value * 30)
        .type( d => {
          if( d.data.value >= 9 ) return d3.symbolCross
          else if ( d.data.value <= 9 ) return d3.symbolDiamond
        })
      );
  }

  nodesImages(nodes) {
    nodes.append("image")
      .attr("xlink:href", d => d.data.icon)
      .attr("x", "-12px")
      .attr("y", "-12px")
      .attr("width", "24px")
      .attr("height", "24px");
  }

  //Nodes Styles Functions ------------------------------------------------------------------------------------------------------------------------------------------------

  //Nodes Directions Functions --------------------------------------------------------------------------------------------------------------------------------------------

  nodesTextDiplayVertical(nodes) {
    nodes.append('text')
      .attr('dy', '.35em')
      .attr('y', d => { 
        return d.children ? (d.data.value + 8 ) * -1 : d.data.value + 8
      })
      .style('text-anchor', 'middle')
      .text( d => d.data.name );
  }

  nodesTextDiplayHorizontal(nodes) {    
    nodes.append('text')
      .attr('dy', '.35em')
      .attr('x', d => {
        return d.children ? (d.data.value + 4 ) * -1 : d.data.value + 4
      })
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text( d => d.data.name );
  }

  //Nodes Directions Functions --------------------------------------------------------------------------------------------------------------------------------------------

  //Nodes Translation Functions -------------------------------------------------------------------------------------------------------------------------------------------

  nodesVertical(d){
    return 'translate(' + d.x + ',' + d.y + ')';
  }
  nodesHorizontal(d) {
    return 'translate(' + d.y + ',' + d.x + ')';
  }

  //Nodes Translation Functions -------------------------------------------------------------------------------------------------------------------------------------------

  //Line Drawing Functions ------------------------------------------------------------------------------------------------------------------------------------------------

  drawLinksBezierVertical(d) {
    return 'M' + d.x + ',' + d.y
      + 'C' + d.x + ',' + (d.y + d.parent.y)/2
      + ' ' + d.parent.x + ',' + (d.y + d.parent.y)/2
      + ' ' + d.parent.x + ',' + d.parent.y;
  }

  drawLinksLineVertical(d) {
    return 'M' + d.x + ',' + d.y
    + 'L' + d.parent.x + ',' + d.parent.y;
  }

  drawLinksBezierHorizontal(d) {
    return 'M' + d.y + ',' + d.x
      + 'C' + (d.y + d.parent.y)/2 + ',' + d.x
      + ' ' + (d.y + d.parent.y)/2 + ',' + d.parent.x
      + ' ' + d.parent.y + ',' + d.parent.x;
  }

  drawLinksLineHorizontal(d) {
    return 'M' + d.y + ',' + d.x
    + 'L' + d.parent.y + ',' + d.parent.x;
  }

  //Line Drawing Functions ------------------------------------------------------------------------------------------------------------------------------------------------
}
