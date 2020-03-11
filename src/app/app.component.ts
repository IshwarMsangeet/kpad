import { Component, ViewEncapsulation } from '@angular/core';
import { faUser as farUser, faBell as farBell } 
    from '@fortawesome/free-regular-svg-icons';

import { faCog } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
  name = 'Angular';
  faUser = farUser;
  faCog = faCog;
  faBell = farBell;
}
