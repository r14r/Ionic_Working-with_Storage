import { Toolbox } from 'src/app/helpers/toolbox';

export class Developer {

	toolbox = new Toolbox('Developer');

	constructor(
		public id: number,
		public name: string,
		public skills: string[],
		public yearsOfExperience: number,
		public img: string,
		public icon: string
	) {
		this.toolbox.log('constructor');

		this.id = id;
		this.name = name;
		this.skills = skills;
		this.yearsOfExperience = yearsOfExperience;
		this.img = img,
			this.icon = icon;

		this.toolbox.log('constructor return ' + this.asString());
	}

	asString() {
		return this.id + '/' + this.name + '/' + this.skills + '/' + this.yearsOfExperience + '/' + this.icon;
	}
}
