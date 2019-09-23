import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  eventsStatusUrl = "http://35.244.59.144/spgdash/api/events";


  constructor(private http: HttpClient) { }

  getIncidents(){
    return this.http
                .get<any>(this.eventsStatusUrl);
  }

}
