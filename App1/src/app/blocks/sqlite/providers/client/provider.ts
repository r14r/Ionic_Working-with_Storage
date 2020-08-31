import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { SQLiteObject } from '@ionic-native/sqlite/ngx';

import { DatabaseProvider } from '../database/provider';
import { Client } from './model';

@Injectable()
export class ClientProvider {

	constructor(private dbProvider: DatabaseProvider) {
		console.log('ClientProvider::constructor');
	}

	public updateData(cli: Client) {
		console.log('ClientProvider::updateData');

		return this.dbProvider.getDB()
			.then((db: SQLiteObject) => {

				const sql = 'update Clients set height = ? where id = ?';
				const data = [cli.height, cli.id];

				return db.executeSql(sql, data)
					.then((res: any) => {
						return true;
					})
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

	public get(id: number) {
		console.log('ClientProvider::get');

		return this.dbProvider
			.getDB()
			.then((db: SQLiteObject) => {
				const sql = 'select * from Clients where id = ?';
				const data = [id];

				return db.executeSql(sql, data)
					.then((result: any) => {
						if (result.rows.length > 0) {
							const clients: any[] = [];
							for (let i = 0; i < result.rows.length; i++) {
								const client = result.rows.item(i);
								clients.push(client);
							}
							return clients;
						} else {
							return [];
						}
					})
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

}
