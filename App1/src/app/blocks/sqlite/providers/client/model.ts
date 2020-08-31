export class Client {

	constructor(
		public id: number,
		public email: string,
		public password: string,
		public height: number
	) {

	}

	SQL_CREATE_TABLE_CLIENT = 'CREATE TABLE IF NOT EXISTS clients (' +
		'id integer primary key AUTOINCREMENT NOT NULL, email TEXT, password TEXT, height REAL(3,2)' +
		')';

	asString() {
		return this.id + '/' + this.email + '/' + this.password + '/' + this.height;
	}
}
