import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowUp, faArrowDown, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StatusRetrieverService } from '../common-services/status-retriever.service';
import { LinechartTimelineComponent } from '../linechart-timeline/linechart-timeline.component';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit {
  up = faArrowUp;
  down = faArrowDown;
  download = faDownload;
  upload = faUpload;
  target: any;
  targetType: any;
  statusDetails: any = {};
  selectedGraph: string = 'availability_last24hrs';
  backupStatusDetails: any = {};
  agentList = [];
  selectedAgent='SPG-ALL-AGENT';
  errorList: any[];
  fetchingData:boolean= false;
  title:string;

  @ViewChild(LinechartTimelineComponent)
  private linechart: LinechartTimelineComponent


  constructor(private route: ActivatedRoute,
    private location: Location,
    private statusRetService: StatusRetrieverService) { }

  ngOnInit() {
    let snapshot = this.route.snapshot;
    this.target =  snapshot.queryParams.target;
    this.targetType = snapshot.queryParams.target_type;
    this.getStatusDetail();
  }

  private getStatusDetail() {
    this.fetchingData = true;

    this.statusRetService.getStatusDetail(this.target, this.targetType).subscribe(
      res => {
        this.statusDetails = res.data[0];
        this.backupStatusDetails = this.statusDetails;
        this.agentList = this.statusDetails.agent_list;
        this.title = this.statusDetails.title;
        this.agentList.unshift('SPG-ALL-AGENT');
        this.errorList = this.statusDetails.metrics.errorlist_last24hrs;
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
      setTimeout(()=>{
        this.plotTheChart('availability_last24hrs','errorlist_last24hrs','Availability');
      }, 100)
    }
  }
}
