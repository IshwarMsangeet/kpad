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
  xData: string[];

  ngOnInit() {
    if (this.chartDatas && this.chartDatas.siteData) {
      let prapredData = this.prepareData(this.chartDatas);
      prapredData && this.draTheChart(prapredData);
    } else {
      let ref = document.getElementById('container');
      ref.innerHTML = "No data found to draw the chart";
      ref.style.color = 'red';
      ref.style.fontSize = '1.8rem';
    }

  }


  private prepareData(chartDatas: any) {
    console.log("rawData ==>>", chartDatas);
    let datasets = chartDatas.siteData.datapoints;
    let systemData = chartDatas.systemData;
    let hostDataList: any[] = [];
    this.xData = datasets.availability_last24hrs.values
      .map((val: string[]) => val[0])
    let AvailabilityObj = {
      name: "Availability",
      type: 'spline',
      data: datasets.availability_last24hrs.values.map(
        // (val:string[]) => [val[0], parseFloat(val[1])] )
        (val: string[]) => parseFloat(val[1])),
      color: Highcharts.getOptions().colors[0],
      fillOpacity: 0.3,
      tooltip: {
        valueSuffix: ' ' + '%'
      }
    };

    let responseTimeObj = {
      name: "responsetime",
      unit: "Second(s)",
      type: 'spline',
      data: datasets.avg_responsetime_last24hrs.values.map(
        // (val:string[]) => [val[0], parseFloat(val[1])] )
        (val: string[]) => parseFloat(val[1])),
      color: Highcharts.getOptions().colors[1],
      fillOpacity: 0.3,
      tooltip: {
        valueSuffix: ' ' + 'Sec(s)'
      },
      yAxis: 1
    };


    if (systemData && Object.keys(systemData).length > 0) {
      hostDataList = this.prapareForSystemMetrics(systemData);
      console.log("hostDataList=>", hostDataList);
      hostDataList.forEach(hostData => {
        hostData.push(responseTimeObj);
        hostData.push(AvailabilityObj);
      })
    } else {
      hostDataList.push([responseTimeObj, AvailabilityObj]);
    }
    return hostDataList;
  }

  private prapareForSystemMetrics(systemData): any[] {
    let hostList = Object.keys(systemData);
    let colorCount: number = 4;
    let hostDataList: any[] = [];
    hostList.forEach((host, i) => {
      console.log("systemData.host => ", systemData[host]);
      let subHosts = Object.keys(systemData[host]);
      if (subHosts && subHosts.length > 0) {
        let subDataList: any[] = [];
        subHosts.forEach((k, j) => {
          console.log("preparing systeme Metric chart Data => ", k);
          let arr = systemData[host][k];
          let nArr = arr.map(val => val[1]);
          let generate = {
            name: k,
            type: 'spline',
            data: nArr,
            color: Highcharts.getOptions().colors[colorCount++],
            fillOpacity: 0.3,
            tooltip: {
              valueSuffix: ' ' + '%'
            }
          }
          subDataList.push(generate);
        })
        hostDataList.push(subDataList);
      }
    })
    return hostDataList;
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

    datasets.forEach((dataset: any, i: string) => {
      let chartDiv = document.createElement('div');
      chartDiv.className = 'chart';
      document.getElementById('container').appendChild(chartDiv);

      Highcharts.chart(chartDiv, {
        plotOptions: {
          areaspline: {
            allAreas: false
          },

        },
        chart: {
          // marginLeft: 50, // Keep all charts left aligned
          // spacingTop: 20,
          // spacingBottom: 20,
          // height:'250px'
        },
        title: {
          text: `Host: ${i+1}` ,
          // align: 'left',
          // margin: 0,
          // x: 30,

        },
        subtitle: {
          text: 'Co- relation between given values'
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
          type: 'category',
          events: {
            setExtremes: syncExtremes
          },
          labels: {
            format: '{value}'
          },
          categories: this.xData
        },
        yAxis: [{
          title: {
            text: "Percentage"
          },
          labels: {
            format: '{value}%'
          }
        },
        { // Secondary yAxis
          title: {
            text: 'Responsetime',
            style: {
              color: Highcharts.getOptions().colors[4]
            }
          },
          labels: {
            format: '{value}Sec(s)',
            style: {
              color: Highcharts.getOptions().colors[4]
            }
          },
          opposite: true
        }],
        tooltip: {
          /* positioner: function () {
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
          }, */
          shared: true
        },
        series: dataset
      });
      console.debug("Highcharts " + i + ": ", Highcharts);
    });
  }

}
