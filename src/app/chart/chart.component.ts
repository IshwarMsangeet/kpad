import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }
  @Input() chartDatas: any;

  ngOnInit() {
    let prapredData = this.prepareData(this.chartDatas);
    prapredData && this.draTheChart(prapredData);
  }

  private prepareData(rawData: any) {
    console.log("rawData ==>>", rawData);
    let datasets = rawData.datapoints;

    let firstAvailDatasets = {
      name: "Availability",
      type: 'spline',
      data: datasets.availability_last7days.values.map(
        // (val:string[]) => [val[0], parseFloat(val[1])] )
        (val:string[]) => parseFloat(val[1]) ),
      color: Highcharts.getOptions().colors[0],
      fillOpacity: 0.3,
      tooltip: {
        valueSuffix: ' ' + '%'
      }
    };

    let secondAvailDatasets = {
      name: "Availability",
      type: 'spline',
      data: [10.03, 91.68, 99.29, 89.21, 98.6, 98.22, 97.47, 97.5, 97.85, 68.93, 100, 90],
      color: Highcharts.getOptions().colors[0],
      fillOpacity: 0.3,
      tooltip: {
        valueSuffix: ' ' + '%'
      }
    };

    let firstRespDatasets = {
      name: "Average response time",
      unit: "Second(s)",
      type: 'spline',
      data: datasets.avg_responsetime_last7days.values.map(
        // (val:string[]) => [val[0], parseFloat(val[1])] )
        (val:string[]) => parseFloat(val[1]) ),
      color: Highcharts.getOptions().colors[1],
      fillOpacity: 0.3,
      tooltip: {
        valueSuffix: ' ' + 'Sec(s)'
      }
    };
    return [[firstAvailDatasets, secondAvailDatasets], [firstRespDatasets]];
  }

  private draTheChart(datasets: any) {
    function syncExtremes(e) {
      var thisChart = this.chart;

      if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
          if (chart !== thisChart) {
            if (chart.xAxis[0].setExtremes) { // It is null while updating
              chart.xAxis[0].setExtremes(
                e.min,
                e.max,
                undefined,
                false,
                { trigger: 'syncExtremes' }
              );
            }
          }
        });
      }
    }

    datasets.forEach(function (dataset: any, i: string) {
      let chartDiv = document.createElement('div');
      chartDiv.className = 'chart';
      document.getElementById('container').appendChild(chartDiv);

      Highcharts.chart(chartDiv, {
        plotOptions:{
          areaspline: {
            allAreas:false
          },
          
        },
        chart: {
          marginLeft: 40, // Keep all charts left aligned
          spacingTop: 20,
          spacingBottom: 20,
          height:'250px'
        },
        title: {
          text: dataset[0].name,
          align: 'left',
          margin: 0,
          x: 30
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        xAxis: {
          crosshair: {
            dashStyle: 'Solid',
          },
          type:'category',
          events: {
            setExtremes: syncExtremes
          },
          labels: {
            format: '{value}'
          },
          categories:["4th Mar", "5th Mar","6th Mar","7th Mar",
          "8th Mar","9th Mar", "10th Mar", "11th Mar", "12th Mar", "13th Mar", "14th Mar"]
        },
        yAxis: {
          title: {
            text: null 
        },
        labels: {
          format: '{value}'
      }
        },
        tooltip: {
          positioner: function () {
            return {
              // right aligned
              x: this.chart.chartWidth - this.label.width,
              y: 10 // align to title
            };
          },
          borderWidth: 0,
          backgroundColor: 'none',
          pointFormat: '{point.y}',
          headerFormat: '',
          shadow: false,
          style: {
            fontSize: '15px'
          },
          // valueDecimals: dataset.valueDecimals
        },
        series: dataset
      });
      console.debug("Highcharts " + i + ": ", Highcharts);
    });
  }

}
