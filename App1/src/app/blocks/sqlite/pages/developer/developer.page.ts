import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Developer } from '../../providers/developer/model';
import { DeveloperProvider } from '../../providers/developer/provider';

@Component({
	selector: 'app-developer',
	templateUrl: './developer.page.html',
	styleUrls: ['./developer.page.scss'],
})
export class DeveloperPage implements OnInit {
	developer: Developer = null;
	skills = '';

	constructor(private route: ActivatedRoute, private db: DeveloperProvider, private router: Router, private toast: ToastController) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			const id = params.get('id');

			this.db.getDeveloper(id).then(data => {
				this.developer = data;
				this.skills = this.developer.skills.join(',');
			});
		});
	}

	delete() {
		this.db.deleteDeveloper(this.developer.id).then(() => {
			this.router.navigateByUrl('/');
		});
	}

	updateDeveloper() {
		let skills = this.skills.split(',');
		skills = skills.map(skill => skill.trim());
		this.developer.skills = skills;

		this.db.updateDeveloper(this.developer).then(async (res) => {
			const toast = await this.toast.create({
				message: 'Developer updated',
				duration: 3000
			});
			toast.present();
		});
	}
}