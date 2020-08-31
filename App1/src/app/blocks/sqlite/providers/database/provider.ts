import { Injectable } from '@angular/core';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

import { Toolbox } from 'src/app/helpers/toolbox';

@Injectable()
export class DatabaseProvider {
	SQL_CREATE_TABLE_CLIENT = 'CREATE TABLE IF NOT EXISTS clients (id integer primary key AUTOINCREMENT NOT NULL, email TEXT, password TEXT, height REAL(3,2))';

	//
	toolbox = new Toolbox('DatabaseProvider');

	constructor(private sqlite: SQLite) {
		this.toolbox.log('constructor');
	}

	public getDB() {
		this.toolbox.log('getDB');

		return this.sqlite.create({
			name: 'infocli.db',
			location: 'default'
		});
	}

	public createDatabase() {
		this.toolbox.log('createDatabase');

		return this.getDB()
			.then((db: SQLiteObject) => {
				this.createTables(db);
				this.insertDefaultItems(db);
			})
			.catch(e => this.toolbox.log(e));
	}

	private createTables(db: SQLiteObject) {
		this.toolbox.log('createTables');

		db.sqlBatch([
			['CREATE TABLE IF NOT EXISTS clients (id integer primary key AUTOINCREMENT NOT NULL, email TEXT, password TEXT, height REAL(3,2))'],
			['CREATE TABLE IF NOT EXISTS weights (id integer primary key AUTOINCREMENT NOT NULL, nowaday REAL(5,2), date TEXT, goal REAL(5,2), idclient integer, FOREIGN KEY(idclient) REFERENCES clients(id))'],
		])
			.then(() => this.toolbox.log('Tabelas criadas'))
			.catch(e => console.error('Erro ao criar as tabelas', e));
	}

	private insertDefaultItems(db: SQLiteObject) {
		this.toolbox.log('insertDefaultItems');

		db.executeSql('select COUNT(id) as qtd from clients', [])
			.then((data: any) => {
				if (data.rows.item(0).qtd === 0) {

					// insert data
					db.sqlBatch([
						['insert into clients (email, password, height) values (?,?,?)',
							['teste@mail.com', '12345', '1.60']]
					])
						.then(() => this.toolbox.log('clients data included'))
						.catch(e => console.error('Error adding data 1', e));

				}
			})
			.catch(e => console.error('Error verifying qtd of clients', e));

		db.executeSql('select COUNT(id) as qtd from weights', [])
			.then((data: any) => {
				if (data.rows.item(0).qtd === 0) {

					// insert data
					db.sqlBatch([
						['insert into weights (nowaday, date, goal, cliente_id) values (?,?,?,?)', [54, '01/04/2018', 60, 1]],
						['insert into weights (nowaday, date, goal, cliente_id) values (?,?,?,?)', [56, '01/05/2018', 60, 1]]
					])
						.then(() => this.toolbox.log('weights data included'))
						.catch(e => console.error('Error adding data 2', e));

				}
			})
			.catch(e => console.error('Error verifying qtd of weights', e));
	}
}
