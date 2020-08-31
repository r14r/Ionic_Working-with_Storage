import { Injectable } from '@angular/core';
import { Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return true;
	}
	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return true;
	}
	canLoad(
		route: Route,
		segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		return true;
	}
}