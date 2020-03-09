import { Component, ViewEncapsulation } from '@angular/core';
import { faUser, faCog, faBell } 
    from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
  name = 'Angular';
  faUser = faUser;
  faCog = faCog;
  faBell = faBell;
}
