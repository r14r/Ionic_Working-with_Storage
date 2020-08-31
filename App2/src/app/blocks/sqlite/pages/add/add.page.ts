import { Component } from '@angular/core';

import { Router } from '@angular/router';


import { Toolbox } from 'src/app/helpers/toolbox';
import { Developer } from '../../providers/developer/model';
import { DeveloperProvider } from '../../providers/developer/provider';

@Component({
	selector: 'app-add',
	templateUrl: 'add.page.html',
	styleUrls: ['add.page.scss'],
})
export class AddPage {
	toolbox = new Toolbox('AddPage');

	public developer: Developer;
	public items = [];

	public name: string;
	public skills: string[];
	public yearsOfExperience: number;

	constructor(
		public router: Router,
		private db: DeveloperProvider
	) {
		this.toolbox.log('constructor');

		this.db.getDatabaseState().subscribe(ready => {
			if (ready) {
				this.loadData();
			}
		});
	}

	loadData() {
		this.toolbox.log('AddPage::loadData');

		this.db.getAllData().then(data => {
			this.toolbox.log('loadData add developer = ' + data);

			data.forEach(item => {
				this.toolbox.log('loadData add developer = ' + item.asString());
			});

			this.items = data;
		});
	}

	addData() {
		const developer = new Developer(-1, this.name, this.skills, this.yearsOfExperience, '', 'wifi');
		this.toolbox.log('addData developer=' + developer);

		this.toolbox.log('addData developer=' + developer.asString());

		this.db
			.addData(developer)
			.then(data => { this.loadData(); });

		this.name = '';
		this.skills = [];
		this.yearsOfExperience = null;
	}

	itemTapped(event, item) {
		this.router.navigate(['HomePage', item]);
	}
}
