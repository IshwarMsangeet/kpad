import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SitesStatus {
  up: number;
  down: number;
  pause: number;
}

export interface StatusObject {
  data: SitesStatus;
  error: string;
}

@Injectable()
export class OverallStatusService {

  overallSiteStatusUrl = "http://35.244.59.144/spgdash/api/basic";

  constructor(private http: HttpClient) { }

  getStatus(){
    return this.http
                .get<StatusObject>(this.overallSiteStatusUrl);
  }

}
