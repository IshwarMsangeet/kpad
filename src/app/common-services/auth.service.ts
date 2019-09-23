import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
authCredential: string = 'ish@gmail.com_spog123';
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token == null)   {
        this.router.navigate(['login']);
        return false;
    }
    return true;
  }
  login(username: string, password: string) {
    if(username+'_'+password === this.authCredential){
      localStorage.setItem('token', username+'_'+password);
      return true
    } else{
      return false;
    }
  }
}
