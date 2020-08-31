import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CoreFacade } from '../facades/core.facade';

@Component({
	selector: 'app-identify-device',
	templateUrl: 'identify-device.page.html',
	styleUrls: ['identify-device.page.scss']
})
export class IdentifyDevicePage implements OnInit {
	public formGroup: FormGroup;

	private mh: any;

	constructor(private fb: FormBuilder, private facade: CoreFacade, private router: Router) {
		this.formGroup = this.fb.group({
			trackNumber: ['', [Validators.required]]
		});
	}

	public ngOnInit(): void {
		this.formGroup.controls.trackNumber.patchValue(
			this.facade.getTrackNumber()
		);
	}

	public identifyDevice(): void {
		this.facade
			.identifyDevice(this.mh.fcValue('trackNumber'))
			.subscribe(
				success =>
					success && this.router.navigateByUrl('device-identified')
			);
	}
}
