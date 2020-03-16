import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { faArrowUp, faArrowDown, faDownload, faUpload, faBars } from 
        '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { ActivatedRoute } from '@angular/router';
import { StatusRetrieverService } from '../common-services/status-retriever.service';
import { LinechartTimelineComponent } from '../linechart-timeline/linechart-timeline.component';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit, OnDestroy , AfterViewInit {
  up = faArrowUp;
  down = faArrowDown;
  download = faDownload;
  upload = faUpload;
  barsIcon = faBars;
  faCloseIcon = faWindowClose;
  target: any;
  targetType: any;
  statusDetails: any = {};
  selectedGraph: string = 'availability_last24hrs';
  backupStatusDetails: any = {};
  agentList = [];
  selectedAgent='SPG-ALL-AGENT';
  errorList: any[];
  fetchingData:boolean= false;
  title:string ='...';
  siteList: any[]= [];
  chartDataObj = {};
  mobileQuery: MediaQueryList;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild(LinechartTimelineComponent)
  private linechart: LinechartTimelineComponent;

  private _mobileQueryListener: () => void;

  constructor(private route: ActivatedRoute,
    private statusRetService: StatusRetrieverService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
    this.route.queryParams.
    subscribe(params =>{
      console.log("params=> ", params.target);
      this.target =  params.target;
      this.targetType = params.target_type;
      this.title = params.title;
      this.getStatusDetail();
      if(this.mobileQuery.matches){
        this.sidenav.close();
      }
    });

    let sitesInfo= localStorage.getItem('sitesInfo');
    if(this.statusRetService.sitesInfo){
      this.siteList = this.statusRetService.sitesInfo;
      localStorage.setItem('sitesInfo', JSON.stringify(this.siteList));
    } else if(localStorage.getItem('sitesInfo')){
      this.siteList = this.statusRetService.sitesInfo = JSON.parse(sitesInfo);
    }
  }

  ngAfterViewInit(){
  }

  private getStatusDetail() {
    this.fetchingData = true;
    this.statusRetService.getStatusDetail(this.target, this.targetType).subscribe(
      res => {
        console.log("forkJon Res =>", res);
        this.statusDetails = res[0].data[0];
        if(this.statusDetails){
          this.backupStatusDetails = this.statusDetails;
          this.agentList = this.statusDetails.agent_list;
          this.title = this.statusDetails.title;
          this.agentList.unshift('SPG-ALL-AGENT');
          this.errorList = this.statusDetails.metrics.errorlist_last24hrs;
          this.chartDataObj = {
            siteData: this.statusDetails,
            systemData: res[1].data
          }
        }
        this.fetchingData = false;
      },
      error => {
        this.fetchingData = false;
      });
  }

  plotTheChart(selectedGraph, errorDuration, onHoverTitle) {
    this.selectedGraph = selectedGraph;
    this.linechart.plotTheChart(selectedGraph, onHoverTitle);
    this.errorList = this.statusDetails.metrics[errorDuration];
  }

  selectTheAgent(agent) {
    let isAgentChanged = false;
    if (agent == 'SPG-ALL-AGENT') {
      this.statusDetails = this.backupStatusDetails;
      isAgentChanged = true;
    } else {
      for (var i = 0; i < this.backupStatusDetails.agents.length; i++) {
        if (this.backupStatusDetails.agents[i].agentname == agent) {
          this.statusDetails = this.backupStatusDetails.agents[i];
          isAgentChanged = true;
          break;
        }
      }
    }

    if(isAgentChanged){
      setTimeout(()=>{//need to correct it
        //this.plotTheChart('availability_last24hrs','errorlist_last24hrs','Availability');
      }, 100)
    }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
