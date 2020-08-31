export class WeightInterface {
	public static SQL_TABLE_CREATE = 'create table if not exists WEIGHTS (id integer primary key AUTOINCREMENT NOT NULL, nowaday REAL(5,2), date TEXT, goal REAL(5,2), idclient integer, FOREIGN KEY(idclient) REFERENCES clients(id))';
	public static SQL_TABLE_DELETE = 'delete from WEIGHTS where id = ?';

	public static SQL_TABLE_INSERT = 'insert into Weights (nowaday, date, goal, idclient) values (?, ?, ?, ?)';
}
