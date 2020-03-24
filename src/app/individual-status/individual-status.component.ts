import { Component, OnInit } from '@angular/core';
import { StatusRetrieverService } from '../common-services/status-retriever.service';
import { Router } from '@angular/router';
// import { trigger, state, style, animate, transition } from '@angular/animations';
import { faArrowCircleUp, faArrowCircleDown, faQuestionCircle, faInfoCircle,
  faGlobe, faLocationArrow, faExclamationTriangle, faLaptop } 
    from '@fortawesome/free-solid-svg-icons';
import { faClock, faCheckCircle, faUser } from '@fortawesome/free-regular-svg-icons';


// function myInlineMatcherFn(fromState: string, toState: string, element: any, params: {[key:
//   string]: any}): boolean {
//    return true;
//  }
@Component({
  selector: 'app-individual-status',
  templateUrl: './individual-status.component.html',
  styleUrls: ['./individual-status.component.css'],
  /* animations: [
    trigger("animateWhenValueChange", [
      state('active', style({
        'background-color': 'red',
        fontSize: '.8rem'
       })),
      state('inactive', style({
        backgroundColor: 'green',
        fontSize: '2rem'
       })),
      transition(myInlineMatcherFn, animate('600ms ease-in'))
    ])
  ] */
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
  userIcon = faUser;
  checkICon = faCheckCircle;
  laptopIcon = faLaptop;
  infoIcon = faInfoCircle;

  selectAgent: string = 'Overall';
  status: any = {
    selectedAgent : "Overall",
  };
  
  backupStatusDetails;
  fetchingData: boolean = false;
  isSelectFunClicked: boolean = false;
  isLoading:boolean = false;

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

  gotoDetailPage(target: string, target_type: string, index: number) {
    if (!this.isSelectFunClicked) {
      let siteStatusList: any[] = this.siteStatuses.slice();
      let status: any = siteStatusList[index];
      siteStatusList.splice(index, 1);
      siteStatusList.unshift(status);
      this.service.sitesInfo = siteStatusList;
      this.router.navigate(['/status-details'],
        { queryParams: { 'target': target, 'target_type': target_type , 'title': status.title} });
    } else {
      this.isSelectFunClicked = false;
    }
  }

  selectTheAgent(status: any) {
    this.isSelectFunClicked = true;
    this.isLoading = true;
      this.service.getStatusDetailV2(status).subscribe(res => {
        status.metrics = res.data[0].metrics;
        this.isLoading = false;
        this.fetchingData = false;
        this.isSelectFunClicked = false;
      },
        error => {
          this.fetchingData = false;
          this.isLoading = false;
          this.isSelectFunClicked = false;
        });
  }

  onSelect(event: any) {
    this.isSelectFunClicked = true;
  }
}
