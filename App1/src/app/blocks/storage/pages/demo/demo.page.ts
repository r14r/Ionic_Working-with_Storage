import { Component, OnInit, ViewChild } from '@angular/core';

import { Toolbox } from 'src/app/helpers/toolbox';

import { StorageService } from 'src/app/blocks/storage/services/storage.service';
import { Item } from 'src/app/blocks/storage/models/item.model';
import { IonList } from '@ionic/angular';

@Component({
	selector: 'app-storage-demo',
	templateUrl: 'demo.page.html',
	styleUrls: ['demo.page.scss']
})
export class StorageDemoPage implements OnInit {
	toolbox = new Toolbox('ListPage');

	icons = [
		'flask',
		'wifi',
		'beer',
		'football',
		'basketball',
		'paper-plane',
		'american-football',
		'boat',
		'bluetooth',
		'build'
	];

	items: Item[] = [];

	selectedItem: any;
	newItem = {} as Item;

	@ViewChild('itemlist', { static: false }) itemList: IonList;

	constructor(private storage: StorageService) {
		this.toolbox.log('constructor');

		this.init();
	}

	async init() {
		this.toolbox.log('init');

		await this.storage.clear();

		for (let i = 1; i < 6; i++) {
			const item: Item = {
				title: 'Item ' + i,
				note: 'This is item #' + i,
				value: '',
				icon: this.icons[i],
				modified: Date.now(),
				id: Date.now()
			};

			await this.storage.add(item);
			this.toolbox.log('constructor', 'add item ' + item.note);
		}

		this.readall();
	}

	async add(item: Item) {
		this.toolbox.log('add', 'item=' + JSON.stringify(item));

		await this.storage.add(item);
		this.readall();
	}

	async update(item: Item) {
		this.toolbox.log('update', 'id=' + item.id + ' note=' + item.note);

		await this.storage.update(item);

		this.itemList.closeSlidingItems();
		this.readall();
	}

	async delete(item: Item) {
		this.toolbox.log('delete', 'id=' + item.id + ' note=' + item.note);

		await this.storage.delete(item.id);

		this.itemList.closeSlidingItems();
		this.readall();
	}

	readall() {
		this.toolbox.log('readall');

		this.storage.readall().then(items => {
			this.items = items;

			this.toolbox.log('readall', 'got ' + this.items.length + ' items');
		});
	}

	clear() {
		this.toolbox.log('clear');
		this.storage.clear();

		this.readall();
	}

	ngOnInit() {
		this.toolbox.log('ngOnInit');
	}
}
