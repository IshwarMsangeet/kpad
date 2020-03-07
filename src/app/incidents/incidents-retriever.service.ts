import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment }  from '../../environments/environment';

// export interface Incidents {
//   status: string;
//   message: string;
// }
//
// export interface StatusObject {
//   data: Array<Incidents>;
//   error: string;
// }

@Injectable()
export class IncidentsRetrieverService {

  incidents: any;
  eventsStatusUrl = `${environment.BASE_URL}/spgdash/api/events`;


  constructor(private http: HttpClient) { }

  getIncidents(){
    return this.http
                .get<any>(this.eventsStatusUrl);
  }

}
