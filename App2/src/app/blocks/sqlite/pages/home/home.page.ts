import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Developer } from '../../providers/developer/model';
import { DeveloperProvider } from '../../providers/developer/provider';

import { Toolbox } from 'src/app/helpers/toolbox';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	toolbox = new Toolbox('HomePage');

	public developer: Developer;
	public items = [];

	public name: string;
	public skill: string;
	public yearsOfExperience: number;

	constructor(
		public router: Router,
		private db: DeveloperProvider,
	) {
		this.toolbox.log('constructor');

		this.db.getDatabaseState().subscribe(ready => {
			if (ready) {
				this.loadData();
			}
		});
	}

	loadData() {
		this.toolbox.log('loadData');

		this.db.getAllData().then(data => {
			this.toolbox.log('loadData add developer = ' + data);

			data.forEach(item => {
				this.toolbox.log('loadData add developer = ' + item.asString());
			});

			this.items = data;
		});
	}

	addData(event) {
		this.toolbox.log('constructor');

		this.router.navigateByUrl('/sqlite/add');
	}

	deleteData(event, item) {
		this.toolbox.log('deleteData item=' + this.toolbox.display_object(item));

		item.close();
	}

	showData(event, item) {
		this.toolbox.log('showData item=' + this.toolbox.display_object(item));

		item.close();
	}

	archiveData(event, item) {
		this.toolbox.log('archiveData item=' + this.toolbox.display_object(item));

		item.close();
	}

	itemTapped(event, item) {
		this.toolbox.log('itemTapped');

		this.router.navigate(['HomePage', item]);
	}
}
