import {
  Component, OnInit, Input, OnDestroy
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  constructor() { }
  @Input() data: Observable<any>;
  dataSubs: Subscription;
  xData: string[];
  hostNameList: string[]=[];
  colors: string[] = ['#b300b3', '#569651', '#006600', '#0000e6',
      '#666600', '#339933', '#666699', '#3973ac', '#006658', '#ff5500',
      '#001a00', '#4d2600', '#c7c617', '#ff66b3', '#dedbdb'];
  ngOnInit() {
    console.log("Chat component called")
    this.dataSubs = this.data.subscribe(data => {
      this.hostNameList = [''];
      if (data && data.siteData) {
        let prapredData = this.prepareData(data);
        prapredData && this.draTheChart(prapredData);
      } else {
        let ref = document.getElementById('container');
        ref.innerHTML = "No data found to draw the chart";
        ref.style.color = 'red';
        ref.style.fontSize = '1.8rem';
      }
    })
  }

  ngOnDestroy(){
    this.dataSubs.unsubscribe();
  }


  private prepareData(chartDatas: any) {
    console.log("rawData ==>>", chartDatas);
    let datasets = chartDatas.siteData;
    let systemData = chartDatas.systemData;
    let hostDataList: any[] = [];
    // this.xData = datasets.availability_last24hrs.values
    //   .map((val: string[]) => val[0])
    let AvailabilityObj = {
      name: "Availability",
      type: 'spline',
      data: datasets.availabilityList.map(
        (val: string[]) => [val[0], parseFloat(val[1])]),
      color: this.colors[1],
      fillOpacity: .9,
      tooltip: {
        valueSuffix: ' ' + '%'
      }
    };

    let responseTimeObj = {
      name: "responsetime",
      unit: "Second(s)",
      type: 'spline',
      data: datasets.responsetimeList.map(
        (val: string[]) => [val[0], parseFloat(val[1])]),
      color: this.colors[0],
      fillOpacity: 0.9,
      tooltip: {
        valueSuffix: ' ' + 'Sec(s)'
      },
      yAxis: 1
    };


    if (systemData && Object.keys(systemData).length > 0) {
      this.hostNameList = Object.keys(systemData);
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
    let hostDataList: any[] = [];
    hostList.forEach((host, i) => {
      let colorCount: number = 2;
      // console.log("systemData.host => ", systemData[host]);
      let subHosts = Object.keys(systemData[host]);
      if (subHosts && subHosts.length > 0) {
        let subDataList: any[] = [];
        subHosts.forEach((k, j) => {
          let arr = systemData[host][k];
          let nArr: [] = arr.map(val =>[val[0], val[1]]);

          let generate = {
            name: k,
            type: 'spline',
            data: nArr,
            color: this.colors[colorCount++],
            fillOpacity: .9,
            tooltip: {
              valueSuffix: ' ' + '%'
            }
          }
          console.log("nArr ===---->", nArr);
          subDataList.push(generate);
        })
        hostDataList.push(subDataList);
      }
    })
    return hostDataList;
  }

  private draTheChart(datasets: any) {
    let existId = document.getElementById('container');
    if(existId) {
      existId.innerHTML = '';
    }
    datasets.forEach((dataset: any, i: string) => {
      let chartDiv = document.createElement('div');
      chartDiv.className = 'chart';
      document.getElementById('container').appendChild(chartDiv);
      
      Highcharts.chart(chartDiv, {
        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1.5
              }
            }
          },
          areaspline: {
            allAreas: false
          },
        },
        chart: {
          // marginLeft: 50, // Keep all charts left aligned
          // spacingTop: 20,
          spacingBottom: 10,
          // height:'250px'
          borderColor: '#547d05',
          borderWidth: 1.2,
        },
        title: {
          text: this.hostNameList[i],
          style: {
            color: '#0835a9',
          }
          // align: 'left',
          // margin: 0,
          // x: 30,

        },
        subtitle: {
          text: null
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

          labels: {
            format: '{value}'
          },
          // categories: this.xData
        },
        yAxis: [{
          title: {
            text: "Percentage"
          },
          labels: {
            format: '{value}%'
          },
          max: 100,
          alignTicks: false,
        },
        { // Secondary yAxis
          title: {
            text: 'Responsetime',
            // style: {
            //   color: Highcharts.getOptions().colors[0]
            // }
          },
          labels: {
            format: '{value}Sec(s)',
            // style: {
            //   color: Highcharts.getOptions().colors[0]
            // }
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
        series: dataset,
        responsive: {
          rules: [{
            condition: {
              maxWidth: 600
            },
            chartOptions: {
              yAxis: [{
                title: {
                  text: null
                },
                labels: {
                  format: '{value}'
                }
              },
              { // Secondary yAxis
                title: {
                  text: null
                },
                labels: {
                  format: '{value}'
                },
                opposite: true
              }],
              subtitle: {
                text: null
              },
              credits: {
                enabled: false
              }
            }
          }]
        }
      });
      console.debug("Highcharts " + i + ": ", Highcharts);
    });
  }

}
