import { Component } from '@angular/core';

import { Toolbox } from 'src/app/helpers/toolbox';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	toolbox = new Toolbox('HomePage');

	constructor() {
		this.toolbox.log({ func: 'constructor' });
	}
}
