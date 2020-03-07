import { Component, OnInit } from '@angular/core';

import { OverallStatusService, SitesStatus, StatusObject } from './overall-status.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-overall-status',
  templateUrl: './overall-status.component.html',
  styleUrls: ['./overall-status.component.css']
})
export class OverallStatusComponent implements OnInit {

  sitesStatus: any;
  up: number;
  down: number;
  pause: number;
  fetchingData: boolean = false;
  clockIcon = faClock;

  constructor(private service: OverallStatusService) {

  }

  ngOnInit() {
    this.fetchingData = true;
    this.service.getStatus().subscribe((data: any) =>{
      console.log("RETURNED - DATA => ", data);
      this.sitesStatus = data.data.sites;
      this.up = this.sitesStatus.up;
      this.down = this.sitesStatus.down;
      this.pause = this.sitesStatus.pause;
      this.fetchingData = false;
    },
    error => {
      this.fetchingData = false;
      console.error("RETURNED ERROR: ", error)
    });
}
}
