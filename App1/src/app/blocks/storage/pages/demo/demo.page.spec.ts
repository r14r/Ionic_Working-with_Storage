import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StorageDemoPage } from './demo.page';

describe('ListPage', () => {
	let component: StorageDemoPage;
	let fixture: ComponentFixture<StorageDemoPage>;
	let demoPage: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StorageDemoPage],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(StorageDemoPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a list of 10 elements', () => {
		demoPage = fixture.nativeElement;
		const items = demoPage.querySelectorAll('ion-item');
		expect(items.length).toEqual(10);
	});

});
