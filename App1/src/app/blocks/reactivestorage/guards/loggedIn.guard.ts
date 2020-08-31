import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import {
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    UrlSegment,
    UrlTree
} from '@angular/router';

import { Observable } from 'rxjs';

import { CoreStore } from '../services/store/core.store';
import { Toolbox } from 'src/app/helpers/toolbox';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild, CanLoad {
    toolbox = new Toolbox('LoggedInGuard');

    constructor(public router: Router, public store: CoreStore) {
        this.toolbox.log('constructor');
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.store.ready$.then(
            () => this.toResult(),
            () => this.toResult()
        );
    }

    XcanActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return true;
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return true;
    }
    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    private toResult(): boolean {
        const isLoggedIn = !!this.store.state.authToken;

        if (!isLoggedIn) {
            this.router.navigate(['/login']);
        }

        return isLoggedIn;
    }
}
