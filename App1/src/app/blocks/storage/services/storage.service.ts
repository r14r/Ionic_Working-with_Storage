import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Item } from 'src/app/blocks/storage/models/item.model';

import { Toolbox } from 'src/app/helpers/toolbox';

const ITEMS_KEY = 'my-items';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	toolbox = new Toolbox('StorageService');

	constructor(private storage: Storage) {
		this.toolbox.log('constructor');
	}

	add(item: Item): Promise<Item[]> {
		this.toolbox.log('add', 'item=' + item.note);

		item.id = Date.now();

		return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
			if (items) {
				items.push(item);
			} else {
				items = [item];
			}

			this.toolbox.log('add', 'number of items=' + items.length);

			return this.storage.set(ITEMS_KEY, items);
		});
	}

	readall(): Promise<Item[]> {
		this.toolbox.log('readall');

		return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
			items = items || [];

			this.toolbox.log('readall', 'number of items=' + items.length);
			this.toolbox.log('readall', JSON.stringify(items));

			return items;
		});
	}

	update(item: Item): Promise<Item> {
		return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
			if (!items || items.length === 0) {
				return null;
			}

			const newItems: Item[] = [];

			for (let i of items) {
				if (i.id === item.id) {
					newItems.push(item);
				} else {
					newItems.push(i);
				}
			}

			return this.storage.set(ITEMS_KEY, newItems);
		});
	}

	delete(id: number): Promise<Item> {
		return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
			if (!items || items.length === 0) {
				return null;
			}

			const toKeep: Item[] = [];

			for (const i of items) {
				if (i.id !== id) {
					toKeep.push(i);
				}
			}
			return this.storage.set(ITEMS_KEY, toKeep);
		});
	}

	clear() {
		this.storage.clear();
	}
}
