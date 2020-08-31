import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Toolbox } from 'src/app/helpers/toolbox';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	toolbox = new Toolbox('StorageService');

	constructor(private storage: Storage) {
		this.toolbox.log('constructor');
	}

}
