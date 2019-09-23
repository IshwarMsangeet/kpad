import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-linechart-timeline',
  templateUrl: './linechart-timeline.component.html',
  styleUrls: ['./linechart-timeline.component.css']
})
export class LinechartTimelineComponent implements OnInit {

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Color Value';
  timeline = false;
  autoscale = false;
  showRefLines = true;
  showRefLabels = true;
  referenceLines: any[];
  graphTitle:string;

  @Input() graphData: any;
  multi: any[] = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() { }

  ngOnInit() {
    this.plotTheChart('availability_last24hrs', 'Availability');
  }

  plotTheChart(selectedGraph, onHoverTitle) {
    let graphObj = this.graphData[selectedGraph];
    this.xAxisLabel = graphObj.units.x;
    this.yAxisLabel = graphObj.units.y;
    this.graphTitle = graphObj.title;
    this.referenceLines= [];
    if(graphObj.thresholds.max && graphObj.thresholds.min) {
      this.referenceLines.push({'name': 'Max', 'value': graphObj.thresholds.max});
      this.referenceLines.push({'name': 'Min', 'value': graphObj.thresholds.min});
    }
    let prepareArray = new Array()
    graphObj.values.forEach(data =>{
      let obj = {
        name: data[0],
        value: data[1]
      }
      prepareArray.push(obj);
    })
    this.multi = [{
        name: onHoverTitle,
        series: prepareArray
      }]
  }

  onSelect(event) {
    console.log(event);
  }
}
