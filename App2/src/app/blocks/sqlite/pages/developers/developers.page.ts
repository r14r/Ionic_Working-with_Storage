import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../providers/product/model';
import { Developer } from '../../providers/developer/model';
import { DeveloperProvider } from '../../providers/developer/provider';


@Component({
	selector: 'app-developers',
	templateUrl: './developers.page.html',
	styleUrls: ['./developers.page.scss'],
})
export class DevelopersPage implements OnInit {

	developers: Developer[] = [];
	products: Observable<Product[]>;

	developer: Developer;
	product: Product;

	selectedView = 'devs';

	constructor(private db: DeveloperProvider) { }

	ngOnInit() {
		this.db
			.getDatabaseState()
			.subscribe(ready => {
				if (ready) {
					this.db
						.getDevs()
						.subscribe(developers => {
							this.developers = developers;
						});

					this.products = this.db.getProducts();
				}
			});
	}

	addDeveloper() {
		let skills = this.developer.skills;
		skills = skills.map(skill => skill.trim());

		this.db
			.addDeveloper(this.developer.name, skills, this.developer.img)
			.then(_ => {
				this.developer = null;
			});
	}

	addProduct() {
		this.db
			.addProduct(this.product.name, this.product.creator)
			.then(_ => {
				this.product = null;
			});
	}

}
