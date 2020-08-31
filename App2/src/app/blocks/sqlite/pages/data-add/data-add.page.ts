import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { Client } from '../../providers/client/model';
import { ClientProvider } from '../../providers/client/provider';

import { Weights } from '../../providers/weight/model';
import { WeightProvider } from '../../providers/weight/provider';

import { Toolbox } from 'src/app/helpers/toolbox';

@Component({
	selector: 'app-add-data',
	templateUrl: 'data-add.page.html',
	styleUrls: ['data-add.page.scss'],
})
export class DataAddPage implements OnInit {
	title = 'Add Data';

	height: number;
	weights: number;
	goal: number;

	constructor(
		public router: Router,
		public route: ActivatedRoute,
		public clientprovider: ClientProvider,
		public weightprovider: WeightProvider,
		public toolbox: Toolbox
	) {
		console.log('DataAddPage::constructor');

		const paramClient = this.route.snapshot.paramMap.get('client') || { client: '' };
		const paramWeights = this.route.snapshot.paramMap.get('weights') || { weights: '' };

		console.log('ImPage::constructor parameter client  = ' + toolbox.display_object(paramClient));
		console.log('ImPage::constructor parameter weights = ' + toolbox.display_object(paramWeights));

		// this.height = paramClient.height;
	}

	ngOnInit() {
		this.toolbox.log('ngOnInit');
	}

	getUser() {
		console.log('DataAddPage::getUser');

		const cli = new Client(
			1,
			null,
			null,
			this.height
		);

		this.clientprovider
			.updateData(cli)
			.then((data: any) => {
				if (data === true) {
					const p = new Weights(
						null,
						this.weights,
						moment(new Date()).format('L'),
						this.goal,
						1
					);
					this.weightprovider.insert(p)
						.then((datap: any) => {
							if (datap === true) {
								this.router.navigateByUrl('StatisticsPage');
							}
						})
						.catch((e) => { console.error(e); });
				}
			})
			.catch((e) => {
				this.router.navigateByUrl('StatisticsPage');
				console.error(e);
			});
	}
}
