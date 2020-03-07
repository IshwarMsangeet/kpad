import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment }  from '../../environments/environment';
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

  overallSiteStatusUrl = `${environment.BASE_URL}/spgdash/api/basic`;

  constructor(private http: HttpClient) { }

  getStatus(){
    return this.http
                .get<StatusObject>(this.overallSiteStatusUrl);
  }

}
