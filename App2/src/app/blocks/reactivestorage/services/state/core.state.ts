export class CoreState {
	public readonly authToken: string;
	public readonly trackNumber: string;
	public readonly deviceId: string;

	constructor() {
		// set initial state
		this.authToken = undefined;
		this.trackNumber = undefined;
		this.deviceId = undefined;
	}
}
