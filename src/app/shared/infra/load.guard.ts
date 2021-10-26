import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoadGuard implements CanLoad {

    constructor(
        private authService: AuthService
    ) {}

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        
        return false;
    } 
}