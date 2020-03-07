import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment }  from '../../environments/environment';

@Injectable()
export class StatusRetrieverService {

  public statusInfo: any;

  statusInfoUrl = `${environment.BASE_URL}/spgdash/api/target/result`;
  statusDetailsUrl = `${environment.BASE_URL}/spgdash/api/target/resultdetails?target=`;

  constructor(private http: HttpClient) {

    this.statusInfo = {
      "error": "<STRING>",
      "data": [
        {
          "title": "Sakal", // display target title in UI
          "target_type": "<STRING>", // search parameter to get result details
          "target": "<STRING>", // search parameter to get result details
          "status": "green", // current status, last execution status
          "agent_count": "INT", // no. of agents monitoring the target
          "agent_list": "<LIST>", // list of agents
          "metric_list": "<LIST>", // list of metrics
            "metrics":{
              "availability_last24hrs": 230.08,
              "availability_last7days": "<FLOAT>",
              "availability_last30days": "<FLOAT>",
              "avg_responsetime_last24hrs": 100.00,
              "avg_responsetime_last7days": "<FLOAT>",
              "avg_responsetime_last30days": "<FLOAT>",
              "errors_last24hrs": 340,
              "errors_last7days": "<INT>",
              "errors_last30days": "<INT>",
              "hits_last24hrs": "<INT>",
              "hits_last7days": "<INT>",
              "hits_last30days": "<INT>"
            },
          "datapoints":{
                    "last24hrs":{
                        "title":"Last 24 Hrs Trend - Hourly Average Response Time",
                        "units":{"x":"Hr" ,"y":"seconds"},
                        "values":[[]],
                        "thresholds":{},
                    },
                    "last7days":{
                        "title":"Last 7 days - Daily Average Response Time",
                        "units":{"x":"Date" ,"y":"seconds"},
                        "values":[[]],
                        "thresholds":{},
                    },
                    "last30days":{
                        "title":"Last 30 days - Daily Average Response Time",
                        "units":{"x":"Date" ,"y":"seconds"},
                        "values":[[]],
                        "thresholds":{},
                    }
            }
          },
          {
            "title": "Seva Sindhu", // display target title in UI
            "target_type": "<STRING>", // search parameter to get result details
            "target": "<STRING>", // search parameter to get result details
            "status": "amber", // current status, last execution status
            "agent_count": "INT", // no. of agents monitoring the target
            "agent_list": "<LIST>", // list of agents
            "metric_list": "<LIST>", // list of metrics
              "metrics":{
                "availability_last24hrs": 103.90,
                "availability_last7days": "<FLOAT>",
                "availability_last30days": "<FLOAT>",
                "avg_responsetime_last24hrs": 90.89,
                "avg_responsetime_last7days": "<FLOAT>",
                "avg_responsetime_last30days": "<FLOAT>",
                "errors_last24hrs": 401,
                "errors_last7days": "<INT>",
                "errors_last30days": "<INT>",
                "hits_last24hrs": "<INT>",
                "hits_last7days": "<INT>",
                "hits_last30days": "<INT>"
              },
              "datapoints":{
                        "last24hrs":{
                            "title":"Last 24 Hrs Trend - Hourly Average Response Time",
                            "units":{"x":"Hr" ,"y":"seconds"},
                            "values":[[]],
                            "thresholds":{},
                        },
                        "last7days":{
                            "title":"Last 7 days - Daily Average Response Time",
                            "units":{"x":"Date" ,"y":"seconds"},
                            "values":[[]],
                            "thresholds":{},
                        },
                        "last30days":{
                            "title":"Last 30 days - Daily Average Response Time",
                            "units":{"x":"Date" ,"y":"seconds"},
                            "values":[[]],
                            "thresholds":{},
                        }
                }
            },
            {
              "title": "Karnataka One", // display target title in UI
              "target_type": "<STRING>", // search parameter to get result details
              "target": "<STRING>", // search parameter to get result details
              "status": "red", // current status, last execution status
              "agent_count": "INT", // no. of agents monitoring the target
              "agent_list": "<LIST>", // list of agents
              "metric_list": "<LIST>", // list of metrics
                "metrics":{
                  "availability_last24hrs": 31,
                  "availability_last7days": "<FLOAT>",
                  "availability_last30days": "<FLOAT>",
                  "avg_responsetime_last24hrs": 70,
                  "avg_responsetime_last7days": "<FLOAT>",
                  "avg_responsetime_last30days": "<FLOAT>",
                  "errors_last24hrs": 554,
                  "errors_last7days": "<INT>",
                  "errors_last30days": "<INT>",
                  "hits_last24hrs": "<INT>",
                  "hits_last7days": "<INT>",
                  "hits_last30days": "<INT>"
                },
                "datapoints":{
                          "last24hrs":{
                              "title":"Last 24 Hrs Trend - Hourly Average Response Time",
                              "units":{"x":"Hr" ,"y":"seconds"},
                              "values":[[]],
                              "thresholds":{},
                          },
                          "last7days":{
                              "title":"Last 7 days - Daily Average Response Time",
                              "units":{"x":"Date" ,"y":"seconds"},
                              "values":[[]],
                              "thresholds":{},
                          },
                          "last30days":{
                              "title":"Last 30 days - Daily Average Response Time",
                              "units":{"x":"Date" ,"y":"seconds"},
                              "values":[[]],
                              "thresholds":{},
                          }
                  }
              }
            ]
          }
        }
  getStatus() {
    return this.http.get<any>(this.statusInfoUrl);
  }

  getStatusDetail(target, targetType){
    let finalUrl = this.statusDetailsUrl + target + '&target_type='+ targetType;
    return this.http.get<any>(finalUrl);
  }
}
