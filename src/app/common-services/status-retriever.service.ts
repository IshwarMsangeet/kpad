import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment }  from '../../environments/environment';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable()
export class StatusRetrieverService {

  public statusInfo: any;
  public sitesInfo: any[];

  statusInfoUrl = `${environment.BASE_URL}/spgdash/api/target/result`;
  statusDetailsUrl = `${environment.BASE_URL}/spgdash/api/target/resultdetails?target=`;
  statusDetailsV2Url = `${environment.BASE_URL}/spgdash/api/target/resultdetailsV2?target=`;
  hostDetailUrl = `${environment.BASE_URL}/spgdash/api/target/hosts?target=`;
  systemMetricsDetailUrl = `${environment.BASE_URL}/spgdash/api/target/systemmetrics?target=`

  constructor(private http: HttpClient) {}

  getStatus(): Observable<any> {
    return this.http.get<any>(this.statusInfoUrl);
  }

  getStatusDetail(target: string, targetType: string): Observable<any> {
    let finalUrl = this.statusDetailsUrl + target + '&target_type='+ targetType;
    return forkJoin(this.http.get<any>(finalUrl), this.getSystemMetricsDetail(target));
  }

  getStatusDetailV2(val: any): Observable<any> {
    let statusDetailUrl: string;
    if(val.selectedAgent && val.selectedAgent != "undefined" && val.selectedAgent != "null"){
      statusDetailUrl = `${this.statusDetailsV2Url}${val.target}&target_type=url&agent=${val.selectedAgent}`;
    } else {
      statusDetailUrl = `${this.statusDetailsV2Url}${val.target}&target_type=url`;
    }
     
    return this.http.get<any>(statusDetailUrl);
  }

  getHostDetails(url: string): Observable<any> {
    return this.http.get<any>(this.hostDetailUrl+url);
  }

  getSystemMetricsDetail(url: string): Observable<any> {
    return this.http.get<any>(this.systemMetricsDetailUrl+url);
  }
}
