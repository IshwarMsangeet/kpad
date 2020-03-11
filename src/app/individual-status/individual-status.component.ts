import { Component, OnInit } from '@angular/core';
import { StatusRetrieverService } from '../common-services/status-retriever.service';
import { Router } from '@angular/router';
// import { trigger, state, style, animate, transition } from '@angular/animations';
import { faArrowCircleUp, faArrowCircleDown, faQuestionCircle,
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

  gotoDetailPage(target, target_type, ev: any) {
    if(!this.isSelectFunClicked){
    this.router.navigate(['/status-details'], {queryParams: {'target': target, 'target_type': target_type}});
  }else{
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
        this.status.state =  this.status.state === 'active' ? 'inactive' : 'active';
        console.log("this.status.state =>", this.status.state );
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
