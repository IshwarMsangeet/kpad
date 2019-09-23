import { Component, OnInit } from '@angular/core';
import { IncidentsRetrieverService } from './incidents-retriever.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {

  public incidents: any[];
  gotError:boolean =false;
  fetchingData: boolean= false;

  constructor(private service: IncidentsRetrieverService) { }

  ngOnInit() {
    this.fetchingData = true;
    this.service.getIncidents()
    .subscribe(res =>{
      this.incidents = res.data.incidents;
      this.gotError = false;
      this.fetchingData = false;
    }, error =>{
      this.gotError = true;
      this.fetchingData = false;
    });
  }

}
