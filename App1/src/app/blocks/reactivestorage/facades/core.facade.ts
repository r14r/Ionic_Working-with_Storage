import { LoginService } from '../services/login/login.service';
import { Injectable } from '@angular/core';
import { CoreStore } from '../services/store/core.store';
import { CoreState } from '../services/state/core.state';
import { Observable } from 'rxjs';

// import { forkJoin } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

import * as UUID from 'uuid';

@Injectable({
	providedIn: 'root'
})
export class CoreFacade {

	constructor(
		private coreStore: CoreStore,
		private loginService: LoginService
	) { }

	public isLoggedIn$ = this.coreStore.select(
		(state: CoreState) => !!state.authToken
	);

	public getTrackNumber(): string {
		return this.coreStore.state.trackNumber;
	}

	public generateDeviceId(): void {
		// generate Device-Id just once
		this.coreStore.readDeviceId().then(deviceId => {
			if (!deviceId) {
				this.coreStore
					.setDeviceId(UUID.next().value)
					.finally(() => console.log('Device-Id has been generated'));
			}
		});
	}

	public identifyDevice(trackNumber: string): Observable<boolean> {
		/* @TODO
		const stream = forkJoin([
			...this.coreStore.setTrackNumber(trackNumber)
		]).pipe(switchMap(_ => this.loginService.identifyDevice(trackNumber)));

		return stream;
		*/

		return null;
	}

}
