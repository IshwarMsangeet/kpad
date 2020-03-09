import { Component, OnInit } from '@angular/core';
import { StatusRetrieverService } from '../common-services/status-retriever.service';
import { Router } from '@angular/router';

import { faArrowCircleUp, faArrowCircleDown, faQuestionCircle , faCheckCircle,
  faGlobe, faLocationArrow, faExclamationTriangle, faClock, faUserFriends, faLaptop } 
    from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-individual-status',
  templateUrl: './individual-status.component.html',
  styleUrls: ['./individual-status.component.css']
})
export class IndividualStatusComponent implements OnInit {

  siteStatuses: any;
  up = faArrowCircleUp;
  down = faArrowCircleDown;
  question = faQuestionCircle;
  glob = faGlobe;
  location = faLocationArrow;
  errorIcon = faExclamationTriangle;
  clockIcon = faClock;
  userIcon = faUserFriends;
  checkICon = faCheckCircle;
  laptopIcon = faLaptop;

  selectAgent: string = 'Overall';
  status: any = {
    selectedAgent : "Overall"
  };
  
  backupStatusDetails;
  fetchingData: boolean = false;
  isSelectFunClicked: boolean = false;

  constructor(private service: StatusRetrieverService, private router: Router) { }

  ngOnInit() {
    this.fetchingData = true;
    this.service.getStatus().subscribe(res => {
      this.siteStatuses = res.data;
      this.fetchingData = false;
    },
  error=>{
    this.fetchingData = false;
  });
  }

  gotoDetailPage(target, target_type, ev: any) {
    if(!this.isSelectFunClicked){
    this.router.navigate(['/status-details'], {queryParams: {'target': target, 'target_type': target_type}});
  }else{
    this.isSelectFunClicked = false;
  }
  }

  selectTheAgent(status: any) {
    this.isSelectFunClicked = true;
      this.service.getStatusDetailV2(status).subscribe(res => {
        status.metrics = res.data[0].metrics;
        this.fetchingData = false;
        this.isSelectFunClicked = false;
      },
        error => {
          this.fetchingData = false;
          this.isSelectFunClicked = false;
        });
  }
}
