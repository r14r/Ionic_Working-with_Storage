import { Toolbox } from 'src/app/helpers/toolbox';

export class Product {

	toolbox = new Toolbox('Product');

	constructor(
		public id: number,
		public name: string,
		public creator: string,
		public img: string,
		public icon: string
	) {
		this.toolbox.log('constructor');

		this.id = id;
		this.name = name;
		this.creator = creator;
		this.img = img;
		this.icon = icon;

		this.toolbox.log('constructor return ' + this.asString());
	}

	asString() {
		return this.id + '/' + this.name + '/' + this.creator + '/' + this.img + '/' + this.icon;
	}
}
