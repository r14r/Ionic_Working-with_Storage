import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Client } from '../../providers/client/model';
import { ClientProvider } from '../../providers/client/provider';

import { Weights } from '../../providers/weight/model';
import { WeightProvider } from '../../providers/weight/provider';

import * as moment from 'moment';
import { Toolbox } from 'src/app/helpers/toolbox';

@Component({
	selector: 'app-data-statistic',
	templateUrl: './data-statistics.page.html',
	styleUrls: ['./data-statiscics.page.scss']
})
export class DataStatisticsPage {

	title = 'Dtatistics';

	cli: Client[];
	data: string;
	selectedDay = new Date();
	Weights: Weights[];

	constructor(
		public router: Router,
		public clip: ClientProvider,
		public wp: WeightProvider,
		public toolbox: Toolbox) {
		moment.locale('de-de');

		this.get();
	}

	public lineChartData: Array<any> = [{ data: [0], label: 'Weight' }, { data: [0], label: 'Goal' }];
	public lineChartLabels: Array<any> = ['Start'];
	public lineChartOptions: any = { responsive: true };
	public lineChartLegend = true;
	public lineChartType = 'line';

	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	get() {
		const id = 1;
		this.clip
			.get(id)
			.then((data: any[]) => {
				this.cli = data;
				this.wp
					.getAll()
					.then((dataw: Weights[]) => {
						if (dataw != null) {
							const Weight: Array<any> = [];
							this.Weights = dataw;
							for (const item of dataw) {
								this.lineChartData[0].data.push(item.nowaday);
								this.lineChartData[1].data.push(item.goal);
								this.lineChartLabels.push(item.date);

								Weight.push(item.nowaday);
							}

							const im = parseFloat(Weight[Weight.length - 1]) / (parseFloat(data[0].height) * parseFloat(data[0].height));
							this.data = im.toFixed(2);
						} else {
							this.data = '0';
						}

					})
					.catch((e) => {
						console.error(e);
					});
			})
			.catch((e) => {
				console.error(e);
			});
	}

	openPage() {
		console.log(this.cli);

		this.router.navigate(['DataAddPage', { cient: this.cli[0], weights: this.Weights }]);
	}
}
