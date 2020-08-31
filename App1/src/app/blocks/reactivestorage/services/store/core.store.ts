import { CoreState } from '../state/core.state';
import { Store } from './abstract.store';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class CoreStore extends Store<CoreState> {
	private readonly prefix: string;
	private readonly AUTH_TOKEN = 'authToken';
	private readonly TRACK_NUMBER = 'trackNumber';
	private readonly DEVICE_ID = 'deviceId';

	public ready$: Promise<any[]>;

	constructor(private storage: Storage) {
		super(new CoreState());
		this.prefix = 'shuntassistant';

		// read initial values from storage
		this.ready$ = Promise.all([
			this.initValue(this.AUTH_TOKEN),
			this.initValue(this.TRACK_NUMBER),
			this.initValue(this.DEVICE_ID)
		]);
	}

	public setAuthToken(value: string): Promise<any> {
		return this.setValue(this.AUTH_TOKEN, value);
	}

	public removeAuthToken(): Promise<any> {
		return this.removeValue(this.AUTH_TOKEN);
	}

	public setTrackNumber(value: string): Promise<any> {
		return this.setValue(this.TRACK_NUMBER, value);
	}

	public removeTrackNumber(): Promise<any> {
		return this.removeValue(this.TRACK_NUMBER);
	}

	public setDeviceId(value: string): Promise<any> {
		return this.setValue(this.DEVICE_ID, value);
	}

	public readDeviceId(): Promise<string> {
		return this.readValue(this.DEVICE_ID);
	}

	public removeDeviceId(): Promise<any> {
		return this.removeValue(this.DEVICE_ID);
	}

	private initValue(prop: keyof CoreState): Promise<any> {
		const key = `${this.prefix}-${prop}`;
		return this.storage
			.get(key)
			.then(value => {
				this.setStateValue(prop, value);
				return value;
			})
			.catch(_ => {
				this.setStateValue(prop, undefined);
				return undefined;
			});
	}

	private setValue(prop: keyof CoreState, value: any): Promise<any> {
		this.setStateValue(prop, value);
		const key = `${this.prefix}-${prop}`;
		return this.storage.set(key, value);
	}

	private readValue(prop: keyof CoreState): Promise<any> {
		const key = `${this.prefix}-${prop}`;
		return this.storage.get(key);
	}

	private removeValue(prop: keyof CoreState): Promise<any> {
		this.setStateValue(prop, undefined);
		const key = `${this.prefix}-${prop}`;
		return this.storage.remove(key);
	}

	private setStateValue(prop: keyof CoreState, value: any): void {
		this.state = {
			...this.state,
			[prop]: value
		};
	}
}
