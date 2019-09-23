import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { LinechartTimelineComponent } from './linechart-timeline/linechart-timeline.component';
import { OverallStatusComponent } from './overall-status/overall-status.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { IndividualStatusComponent } from './individual-status/individual-status.component';
import { IncidentsRetrieverService } from './incidents/incidents-retriever.service';
import { StatusRetrieverService } from './common-services/status-retriever.service';
import { OverallStatusService } from './overall-status/overall-status.service';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './common-services/auth.service';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent,  canActivate: [AuthService] },
  { path: 'login', component: LoginComponent },
  { path: 'status-details', component: StatusDetailComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports:      [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  declarations: [ AppComponent, LinechartTimelineComponent, OverallStatusComponent, IncidentsComponent, IndividualStatusComponent, StatusDetailComponent, SpinnerComponent, DashboardComponent, LoginComponent ],
  bootstrap:    [ AppComponent ],
  providers: [IncidentsRetrieverService, StatusRetrieverService, OverallStatusService]
})
export class AppModule { }
