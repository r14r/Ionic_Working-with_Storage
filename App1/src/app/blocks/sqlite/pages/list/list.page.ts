import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Toolbox } from 'src/app/helpers/toolbox';

@Component({
	selector: 'page-list',
	templateUrl: 'list.page.html',
	styleUrls: ['list.page.scss']
})
export class ListPage {
	toolbox = new Toolbox('ListPage');

	selectedItem: any;
	icons: string[];
	items: Array<{ title: string, note: string, icon: string }>;

	constructor(public router: Router, private route: ActivatedRoute) {
		this.selectedItem = this.route.snapshot.paramMap.get('item') || '';

		this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane', 'american-football', 'boat', 'bluetooth', 'build'];

		this.items = [];
		for (let i = 1; i < 11; i++) {
			this.items.push({
				title: 'Item ' + i,
				note: 'This is item #' + i,
				icon: this.icons[Math.floor(Math.random() * this.icons.length)]
			});
		}

		this.toolbox.log('fill items with ' + this.items.length + ' values');
	}

	itemTapped(event, item) {
		this.router.navigate([ListPage, item]);
	}
}
