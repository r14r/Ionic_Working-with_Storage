import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseProvider } from '../database/provider';
import { Weights } from './model';
import { WeightInterface } from './interface.ts';

@Injectable()
export class WeightProvider {

	constructor(private dbProvider: DatabaseProvider) { }

	public insert(p: Weights) {
		return this.dbProvider.getDB()
			.then((db: SQLiteObject) => {
				const data = [p.nowaday, p.date, p.goal, p.idclient];

				return db.executeSql(WeightInterface.SQL_TABLE_INSERT, data)
					.then((_) => true)
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

	public getAll() {
		return this.dbProvider.getDB()
			.then((db: SQLiteObject) => {
				const sql = 'SELECT nowaday, date, goal FROM Weights';
				const data: any[] = [];

				return db.executeSql(sql, data)
					.then((result: any) => {
						if (result.rows.length > 0) {
							const w: any[] = [];
							for (let i = 0; i < result.rows.length; i++) {
								const Weight = result.rows.item(i);
								w.push(Weight);
							}

							return w;
						} else {
							return [];
						}
					})
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

	public remove(id: number) {
		return this.dbProvider.getDB()
			.then((db: SQLiteObject) => {
				return db.executeSql(WeightInterface.SQL_TABLE_DELETE, [id])
					.then((_) => true)
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

}
