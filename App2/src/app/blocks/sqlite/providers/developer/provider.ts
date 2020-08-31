import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { Developer } from './model';

import { Toolbox } from 'src/app/helpers/toolbox';

@Injectable()
export class DeveloperProvider {
	toolbox = new Toolbox('DeveloperProvider');

	private database: SQLiteObject;
	private dbInstance: any;
	private dbReady: BehaviorSubject<boolean>;

	developers = new BehaviorSubject([]);
	products = new BehaviorSubject([]);

	private data;

	constructor(
		private storage: Storage,
		private platform: Platform,
		private http: HttpClient,
		public sqlitePorter: SQLitePorter,
		public sqlite: SQLite
	) {
		this.toolbox.log('constructor');

		this.dbReady = new BehaviorSubject(false);
		this.platform.ready().then(() => {
			this.toolbox.log('platform ready');

			this.sqlite
				.create({ name: 'developers.db', location: 'default' })
				.then((db: SQLiteObject) => {
					this.toolbox.log('database created');

					this.database = db;
					this.storage.get('database_filled').then(val => {
						if (val) {
							this.dbReady.next(true);
						} else {
							this.toolbox.log('fill database');

							this.fillDatabase();
						}
					});
				});
		});
	}

	seedDatabase() {
		this.http.get('assets/seed.sql', { responseType: 'text' })
			.subscribe(sql => {
				this.sqlitePorter.importSqlToDb(this.database, sql)
					.then(_ => {
						this.loadDevelopers();
						this.loadProducts();
						this.dbReady.next(true);
					})
					.catch(e => console.error(e));
			});
	}

	getDatabaseState() {
		this.toolbox.log('getDatabaseState');

		return this.dbReady.asObservable();
	}

	getDevs(): Observable<Developer[]> {
		return this.developers.asObservable();
	}

	getProducts(): Observable<any[]> {
		return this.products.asObservable();
	}

	fillDatabase() {
		this.toolbox.log('fillDatabase');

		this.http
			.get('assets/sql/populatedb.sql')
			.pipe(map(this.importSql, this));
	}

	importSql(sql) {
		this.sqlitePorter.importSqlToDb(this.database, sql)
			.then(data => {
				this.dbReady.next(true);
				this.storage.set('database_filled', true);
			})
			.catch(e => console.error(e));
	}

	loadDevelopers() {
		return this.database.executeSql('SELECT * FROM developer', []).then(data => {
			const developers: Developer[] = [];

			if (data.rows.length > 0) {
				for (let i = 0; i < data.rows.length; i++) {
					let skills = [];
					if (data.rows.item(i).skills === '') {
						skills = JSON.parse(data.rows.item(i).skills);
					}

					developers.push(new Developer(
						data.rows.item(i).id,
						data.rows.item(i).name,
						skills,
						-1,
						data.rows.item(i).img,
						''
					));
				}
			}
			this.developers.next(developers);
		});
	}

	addDeveloper(name, skills, img) {
		const data = [name, JSON.stringify(skills), img];
		return this.database
			.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)', data)
			.then(result => {
				this.loadDevelopers();
			});
	}

	getDeveloper(id): Promise<Developer> {
		return this.database
			.executeSql('SELECT * FROM developer WHERE id = ?', [id])
			.then(data => {
				let skills = [];
				if (data.rows.item(0).skills !== '') {
					skills = JSON.parse(data.rows.item(0).skills);
				}

				return new Developer(
					data.rows.item(0).id,
					data.rows.item(0).name,
					skills,
					-1,
					data.rows.item(0).img,
					''
				);
			});
	}

	deleteDeveloper(id) {
		return this.database
			.executeSql('DELETE FROM developer WHERE id = ?', [id])
			.then(_ => {
				this.loadDevelopers();
				this.loadProducts();
			});
	}

	updateDeveloper(dev: Developer) {
		const data = [dev.name, JSON.stringify(dev.skills), dev.img];
		return this.database
			.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data)
			.then(_ => {
				this.loadDevelopers();
			});
	}

	loadProducts() {
		const query = 'SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId';
		return this.database.executeSql(query, []).then(data => {
			const products = [];
			if (data.rows.length > 0) {
				for (let i = 0; i < data.rows.length; i++) {
					products.push({
						name: data.rows.item(i).name,
						id: data.rows.item(i).id,
						creator: data.rows.item(i).creator,
					});
				}
			}
			this.products.next(products);
		});
	}

	addProduct(name, creator) {
		const data = [name, creator];
		return this.database.executeSql('INSERT INTO product (name, creatorId) VALUES (?, ?)', data).then(result => {
			this.loadProducts();
		});
	}

	// ------------------------------------------------------------------------
	addData(developer) {
		this.toolbox.log('addData');

		const data = [developer.name, developer.skill, developer.yearsOfExperience, 'wifi'];

		this.toolbox.log('addData = ' + this.toolbox.display_object(data));

		return this.database
			.executeSql('INSERT INTO developer (name, skill, yearsOfExperience, icon) VALUES (?, ?, ?, ?)', data)
			.then(result => {
				return result;
			}, err => {
				this.toolbox.log('Error: ', err);

				return err;
			});
	}

	getAllData() {
		this.toolbox.log('getAllData');

		return this.database.executeSql('select * from DEVELOPER', []).then((data) => {
			const developers = [];

			if (data.rows.length > 0) {
				this.toolbox.log('getAllData found ' + data.rows.length + ' items');
				for (let i = 0; i < data.rows.length; i++) {
					const item = data.rows.item(i);

					this.toolbox.log('getAllData item = ' + this.toolbox.display_object(item));

					const developer = new Developer(
						-1,
						item.name,
						item.skill,
						item.yearsOfExperience,
						'<missing image>',
						item.icon
					);

					this.toolbox.log('getAllData developer = ' + developer.asString());

					developers.push(developer);
				}
			}

			this.toolbox.log('getAllData found ' + developers.length + ' developers');

			return developers;
		}, err => {
			this.toolbox.log('Error: ', err);
			return [];
		});
	}


	importData() {
		/*
		const db = window.openDatabase('Test', '1.0', 'TestDB', 1 * 1024);
		this.sqlite.create({
			name: 'data.db',
			location: 'default'
		})
			.then((db: any) => {
				this.dbInstance = db._objectInstance;
			});

		const sql = 'CREATE TABLE Artist ([Id] PRIMARY KEY, [Title]); INSERT INTO Artist(Id,Title) VALUES ("1","Fred");';

		this.sqlitePorter
			.importSqlToDb(db, sql)
			.then(() => this.toolbox.log('Imported'))
			.catch(e => console.error(e));
		*/
	}
}
