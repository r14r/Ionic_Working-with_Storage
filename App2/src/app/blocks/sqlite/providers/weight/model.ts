export class Weights {

	constructor(
		public id: number,
		public nowaday: number,
		public date: string,
		public goal: number,
		public idclient: number
	) {

	}

	asString() {
		return this.id + '/' + this.nowaday + '/' + this.date + '/' + this.goal + '/' + this.idclient;
	}
}
