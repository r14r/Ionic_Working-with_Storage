import { Component, OnInit } from '@angular/core';

import { Toolbox } from 'src/app//helpers/toolbox';

@Component({
	selector: 'app-add',
	templateUrl: './add.page.html',
	styleUrls: ['./add.page.scss']
})
export class AddPage implements OnInit {
	toolbox = new Toolbox('AddPage');

	constructor() {
		this.toolbox.log('constructor');
	}

	ngOnInit() {
		this.toolbox.log('ngOnInit');
	}
}
